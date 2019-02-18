"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var nutritionix_service_service_1 = require("./nutritionix-service.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(nutrixService) {
        this.nutrixService = nutrixService;
        this.foods = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.foods = this.nutrixService.getFoods();
        this.foodSubscription = this.nutrixService.foodsChanged.subscribe(function () {
            _this.foods = _this.nutrixService.getFoods();
        });
    };
    AppComponent.prototype.onSubmitForm = function ($event) {
        event.preventDefault();
        var recipe = this.recipeInput;
        this.recipeInput = '';
        this.nutrixService.getParsedRecipe(recipe);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            providers: [nutritionix_service_service_1.NutritionixServiceService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
