import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchProvider } from '../../providers/search.service';
import { UserFoodProvider } from '../../providers/user-food.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public searchType = this.search.searchType;
  public searchPlaceholder: string = this.getSearchPlaceholder();

  public foundIngredients = [];
  public foundRecipe = [];

  constructor(
    private navCtrl: NavController,
    private search: SearchProvider,
    private userFood: UserFoodProvider) {
  }

  toggleSearchMode(searchType): void {
    this.searchType = searchType;
    this.search.searchType = searchType;
    this.searchPlaceholder = this.getSearchPlaceholder();
    console.log(searchType);
  }

  getSearchPlaceholder(): string {
    let placeholderList = {
      ingredients: 'Искать ингредиенты для блюд',
      recipes: 'Искать блюда'
    };
    return placeholderList[this.search.searchType];
  }

  getSearchItems(ev): void {
    let val:string = ev.target.value;
    this.search.getSearchItems(val)
      .subscribe(result => {
        (this.searchType === 'ingredients') ? this.foundIngredients = result : this.foundRecipe = result;
      });
  }

  

}
