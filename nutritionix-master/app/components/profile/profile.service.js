'use strict';

angular.module('nutritionix.profile', [ 'ngStorage' ]).factory('ProfileService', ProfileService);

ProfileService.$inject = [ '$localStorage', '$rootScope' ];

function ProfileService($localStorage, $rootScope) {
    
    /**
     * Well, i store data here, like the profile data
     *
     * @type {{gender: boolean, age: number, sportive: boolean}}
     */
    var data = {
        gender   : true, // true = male
        age      : 19,
        sportive : true
    };
    
    /**
     * I sexually Identify as an Attack Helicopter.
     * Ever since I was a boy I dreamed of soaring over the oilfields dropping hot sticky loads on disgusting foreigners.
     * People say to me that a person being a helicopter is Impossible and I’m fucking retarded but I don’t care, I’m beautiful.
     * I’m having a plastic surgeon install rotary blades, 30 mm cannons and AMG-114 Hellfire missiles on my body.
     * From now on I want you guys to call me “Apache” and respect my right to kill from above and kill needlessly.
     * If you can’t accept me you’re a heliphobe and need to check your vehicle privilege.
     * Thank you for being so understanding.
     *
     * @param gender
     */
    ProfileService.setGender = function (gender) {
        data.gender = gender === 'male';
        this.sync();
    };
    
    /**
     * I'll not create the doc for the get/set, the only thing you need to know is the when i use a set method, i sync with the local storage.
     */
    
    
    ProfileService.getGender = function () {
        return data.gender ? 'male' : 'female';
    };
    
    ProfileService.setAge = function (age) {
        data.age = age;
        this.sync();
    };
    
    ProfileService.getAge = function () {
        return data.age;
    };
    
    ProfileService.setSportive = function (sportive) {
        data.sportive = sportive;
        this.sync();
    };
    
    ProfileService.getSportive = function () {
        return data.sportive;
    };
    
    /**
     * This one is tricky, it's only if the WHO start to explain that a kid need less sodium than adult.
     *
     * @return {number}
     */
    ProfileService.getMaxSodium = function () {
        return 5;
    };
    
    /**
     *
     * @return {number}
     */
    ProfileService.getMaxCalories = function () {
        var base = data.sportive ? 500 : 0;
        
        if (data.age <= 10) {
            return base + 1600;
        }
        if (data.age <= 20) {
            return base + (data.gender ? 2900 : 2400);
        }
        if (data.age <= 65) {
            return base + (data.gender ? 2800 : 2200);
        }
        return base + (data.gender ? 2000 : 1800);
    };
    
    /**
     * Sync with the local storage and emit an event.
     */
    ProfileService.sync = function () {
        $rootScope.$broadcast('profile:updated');
        $localStorage.profile = data;
    };
    
    /**
     * fetch from local storage if needed
     */
    if ($localStorage.profile) {
        data = $localStorage.profile;
    }
    
    
    return ProfileService;
}