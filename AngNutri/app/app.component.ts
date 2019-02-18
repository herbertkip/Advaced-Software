import { Component, Input, Output, OnInit } from '@angular/core';
import { NutritionixServiceService } from './nutritionix-service.service';
import { FoodData } from './FoodData';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NutritionixServiceService]
})
export class AppComponent implements OnInit {
  recipeInput: string;
  foods = [];
  foodSubscription;

  constructor(private nutrixService: NutritionixServiceService) {}

  ngOnInit() {
    this.foods = this.nutrixService.getFoods();
    this.foodSubscription = this.nutrixService.foodsChanged.subscribe(() => {
      this.foods = this.nutrixService.getFoods();
    });
  }

  onSubmitForm($event) {
    event.preventDefault();
    const recipe = this.recipeInput;
    this.recipeInput = '';
    this.nutrixService.getParsedRecipe(recipe);
  }
}
