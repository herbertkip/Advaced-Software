import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NutritionixServiceService } from './nutritionix-service.service';
import { FoodComponent } from './food/food.component';

@NgModule({
  declarations: [AppComponent, FoodComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [NutritionixServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
