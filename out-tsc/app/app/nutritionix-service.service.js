"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var NutritionixServiceService = /** @class */ (function () {
    function NutritionixServiceService(http) {
        this.http = http;
        this.foods = [];
        this.foodsChanged = new rxjs_1.Subject();
        this.appID = '861a7f2e';
        this.appKey = 'ae4fbd8b8305137d0b3851b38100356e';
        this.headers = new http_1.HttpHeaders({
            'x-app-id': this.appID,
            'x-app-key': this.appKey,
            'x-remote-user-id': '0'
        });
    }
    NutritionixServiceService.prototype.getParsedRecipe = function (recipeString) {
        var _this = this;
        return this.http
            .post('https://trackapi.nutritionix.com/v2/natural/nutrients/', { query: recipeString }, { headers: this.headers })
            .pipe(operators_1.map(function (response) {
            var extracted_ingredients = response.foods;
            var ingredients = extracted_ingredients.map(function (ingredient) {
                return {
                    name: ingredient.food_name.charAt(0).toUpperCase() +
                        ingredient.food_name.slice(1),
                    calories: ingredient.nf_calories,
                    protein: ingredient.nf_protein,
                    carbs: ingredient.nf_total_carbohydrate,
                    fat: ingredient.nf_total_fat,
                    unit: ingredient.serving_unit,
                    quantity: ingredient.serving_qty,
                    photo: ingredient.photo.highres
                };
            });
            return ingredients;
            return extracted_ingredients;
        }))
            .subscribe(function (data) {
            _this.foods = data;
            _this.foodsChanged.next();
        });
    };
    NutritionixServiceService.prototype.getFoods = function () {
        return this.foods.slice();
    };
    NutritionixServiceService = __decorate([
        core_1.Injectable()
    ], NutritionixServiceService);
    return NutritionixServiceService;
}());
exports.NutritionixServiceService = NutritionixServiceService;
