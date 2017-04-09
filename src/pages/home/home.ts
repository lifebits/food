import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public searchMode: 'ingredients' | 'recipe' = 'ingredients';

  public searchPlaceholder: string = this.getSearchPlaceholder();

  constructor(public navCtrl: NavController) {

  }

  toggleSearchMode(searchMode): void {
    this.searchMode = searchMode;
    this.searchPlaceholder = this.getSearchPlaceholder();
    console.log(searchMode);
  }

  getSearchPlaceholder(): string {
    let placeholderList = {
      ingredients: 'Искать ингредиенты для блюд',
      recipe: 'Искать блюда'
    };
    return placeholderList[this.searchMode];
  }

}
