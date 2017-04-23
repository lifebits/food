import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { Ingredient } from '../interfaces/food.interface';

@Injectable()
export class UserFoodProvider {

  private activeIngredientsSource = new Subject(); // текущий список продуктов для поиска
  public activeIngredients$ = this.activeIngredientsSource.asObservable();
  public activeIngredients: Ingredient[] = [];

  private fridgeSource = new Subject(); // какие продукты имеются дома
  public fridge$ = this.fridgeSource.asObservable();

  constructor(public http: Http) {
    console.log('Hello UserIngredientsProvider');
  }

  addActiveIngredients(newItem) {
    let duplicateFound = this.activeIngredients.find(p => p.id === newItem.id);
    if (!duplicateFound) {
      this.activeIngredients.push(newItem);
      this.activeIngredientsSource.next(this.activeIngredients);
    }
  }

}
