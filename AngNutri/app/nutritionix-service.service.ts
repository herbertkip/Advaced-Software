import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodData } from './FoodData';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NutritionixServiceService {
  private foods = [];
  foodsChanged = new Subject<void>();
  appID = '861a7f2e';
  appKey = 'ae4fbd8b8305137d0b3851b38100356e';
  headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'x-app-id': this.appID,
      'x-app-key': this.appKey,
      'x-remote-user-id': '0'
    });
  }
  getParsedRecipe(recipeString) {
    return this.http
      .post<any>(
        'https://trackapi.nutritionix.com/v2/natural/nutrients/',
        { query: recipeString },
        { headers: this.headers }
      )
      .pipe(
        map(response => {
          const extracted_ingredients = response.foods;
          const ingredients = extracted_ingredients.map(ingredient => {
            return {
              name:
                ingredient.food_name.charAt(0).toUpperCase() +
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
        })
      )
      .subscribe(data => {
        this.foods = data;
        this.foodsChanged.next();
      });
  }

  getFoods() {
    return this.foods.slice();
  }
}
