import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class UserFoodProvider {

  private activeIngredientsSource = new Subject(); // текущий список продуктов для поиска
  public activeIngredients$ = this.activeIngredientsSource.asObservable();

  private fridgeSource = new Subject(); // какие продукты имеются дома
  public fridge$ = this.fridgeSource.asObservable();

  constructor(public http: Http) {
    console.log('Hello UserIngredientsProvider');
  }

  setActiveIngredients(newValue) {
    this.activeIngredientsSource.next(newValue);
  }

}
