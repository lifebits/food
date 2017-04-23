import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchProvider } from '../../providers/search.service';
import { UserFoodProvider } from '../../providers/user-food.service';

//import { Ingredient, Recipe } from '../../interfaces/food.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public searchType = this.search.searchType;
  public searchPlaceholder: string = this.getSearchPlaceholder();

  public foundIngredients = [];
  public foundRecipe = [];
  public activeIngredients;

  constructor(
    private navCtrl: NavController,
    private search: SearchProvider,
    private userFood: UserFoodProvider) {
  }

  ngOnInit() {
    this.userFood.activeIngredients$.subscribe(
      result => {
        console.log('activeIngredients: ', result);
        this.activeIngredients = result;
      }
    )
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

  getSearchItems(ev): void {//5454
    let val:string = ev.target.value;
    if (!val) { return; }
    this.search.getSearchItems(val)
      .subscribe(result => {
        console.log();
        (this.searchType === 'ingredients') ? this.foundIngredients = result : this.foundRecipe = result;
      });
  }

  addIngredient(item) {
    this.userFood.addActiveIngredients(item);
  }

}
