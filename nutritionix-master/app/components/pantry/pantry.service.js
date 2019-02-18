'use strict';

angular.module('nutritionix.pantry', [ 'ngStorage', 'nutritionix.profile' ]).factory('PantryService', PantryService);

PantryService.$inject = [ '$localStorage', '$rootScope', 'ProfileService' ];

function PantryService($localStorage, $rootScope, ProfileService) {
    
    /**
     * It's my pantry, where I stock my meat !
     *
     * PS : it use the aliment's id as key for the object. ne need to parse an array ;)
     * PS2 : i don't even know if it's faster than parsing an array, and at this point i'm too afraid to ask
     *
     * @type {object}
     */
    var aliments = {};
    
    /**
     * Add an aliment with the quantity to the pantry,
     * if the aliment is already in the pantry, it'll add the quantity.
     * If the quantity isn't a number it'll add 1 quantity
     *
     * @param {object} aliment Aliment to add to the pantry
     * @param {number} [quantity] Quantity to add
     * @return {object} aliment
     */
    PantryService.add = function (aliment, quantity) {
        if (quantity <= 0) { // basic test
            throw Error('quantity cannot be <= 0');
        }
        if (typeof aliment !== 'object') { // basic test
            throw Error('aliment must be an object');
        }
        if (!aliment._id || typeof aliment._id !== 'string') { // need the id
            throw Error('aliment must have a _id');
        }
        if (aliments[ aliment._id ]) { // already exist in the pantry
            aliments[ aliment._id ].quantity += quantity || 1;
        } else { // add and set quantity
            aliments[ aliment._id ]          = aliment;
            aliments[ aliment._id ].quantity = quantity || 1;
        }
        this.sync();
        return aliments[ aliment._id ];
    };
    
    /**
     * Remove some quantity of a specified aliment,
     * if the quantity is undefined, it'll remove the aliment from the pantry
     *
     * @param {object} aliment Aliment to remove to the pantry
     * @param {number} [quantity] Quantity to remove
     * @return {object} aliment
     */
    PantryService.remove = function (aliment, quantity) {
        if (typeof aliment !== 'object') { // basic test
            throw Error('aliment must be an object');
        }
        if (!aliment._id || typeof aliment._id !== 'string') { // need the id of the aliment
            throw Error('aliment must have a _id');
        }
        if (aliments[ aliment._id ]) { // already exist in the pantry
            if (!quantity) {
                delete aliments[ aliment._id ];
            } else {
                if (quantity <= 0) { // basic test
                    throw Error('Quantity cannot be <= 0');
                }
                if (aliments[ aliment._id ].quantity - quantity <= 0) { // delete if the quantity is <= 0
                    delete aliments[ aliment._id ];
                } else {
                    aliments[ aliment._id ].quantity -= quantity;
                }
            }
        }
        this.sync();
        return aliments[ aliment._id ];
    };
    
    /**
     * Test if an aliment is already in the pantry
     *
     * @param {string} id ID of the aliment
     * @return {boolean}
     */
    PantryService.isInPantry = function (id) {
        return aliments.hasOwnProperty(id);
    };
    
    /**
     * Get an aliment from the ID
     *
     * @param {string} id ID of the aliment
     * @return {object}
     */
    PantryService.getFromID = function (id) {
        if (aliments[ id ]) {
            return aliments[ id ];
        }
    };
    
    /**
     * Change the quantity of an aliment in the pantry
     * @param {string} id ID of the aliment
     * @param {number} quantity Quantity to set
     */
    PantryService.setQuantity = function (id, quantity) {
        if (aliments[ id ] && quantity >= 0) {
            aliments[ id ].quantity = quantity;
            if (quantity === 0) {
                this.remove(aliments[ id ]);
            }
            this.sync();
        }
    };
    
    /**
     * Get all aliment
     * @return {object[]} aliments
     */
    PantryService.getAll = function () {
        return _.values(aliments);
    };
    
    /**
     * calculate the number of calories in the pantry.
     *
     * @return {number}
     */
    PantryService.calories = function () {
        return this.getAll().reduce(function (calories, item) {
            return calories + item.fields.nf_calories * item.quantity;
        }, 0);
    };
    
    /**
     * calculate the number of sodium in the pantry.
     *
     * @return {number}
     */
    PantryService.sodium = function () {
        return this.getAll().reduce(function (calories, item) {
                return calories + item.fields.nf_sodium * item.quantity;
            }, 0) / 1000;
    };
    
    /**
     * calculate the number of saturated Fat in the pantry.
     *
     * @return {number}
     */
    PantryService.saturatedFat = function () {
        return this.getAll().reduce(function (calories, item) {
            return calories + item.fields.nf_saturated_fat * item.quantity;
        }, 0);
    };
    
    /**
     * Ask for the profile and determine if the current pantry exceed the limit of the profile.
     *
     * @return {boolean}
     */
    PantryService.isWarning = function () {
        return this.sodium() > ProfileService.getMaxSodium() || this.calories() > ProfileService.getMaxCalories();
    };
    
    
    
    /**
     * Sync with the local storage and emit an event.
     */
    PantryService.sync = function () {
        $rootScope.$broadcast('pantry:updated');
        $localStorage.pantry = aliments;
    };
    
    /**
     * fetch from local storage if needed
     */
    if ($localStorage.pantry) {
        aliments = $localStorage.pantry;
    }
    
    return PantryService;
}
