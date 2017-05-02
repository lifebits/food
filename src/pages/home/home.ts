import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchProvider } from '../../providers/search.service';
import { UserFoodProvider } from '../../providers/user-food.service';

import { Ingredient, Recipe } from '../../interfaces/food.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public searchType = this.search.searchType;
  public searchPlaceholder: string = this.getSearchPlaceholder();

  public foundIngredients = [];
  public foundRecipes = [];
  public activeIngredients;

  constructor(
    private navCtrl: NavController,
    private search: SearchProvider,
    private userFood: UserFoodProvider) {
  }

  ngOnInit() {
    this.userFood.activeIngredients$
      .do(val => console.log('DO', val))
      .switchMap(
        (ingredients: Ingredient[]) => {
          console.log('activeIngredients: ', ingredients);
          this.activeIngredients = ingredients;
          return this.search.getRecipeByIngredient(ingredients);
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          console.log(recipes);
          this.foundRecipes = recipes;
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
    const placeholderList = {
      ingredients: 'Искать ингредиенты для блюд',
      recipes: 'Искать блюда'
    };
    return placeholderList[this.search.searchType];
  }

  //todo надо переписывать
  getSearchItems(ev): void {
    const val:string = ev.target.value;
    if (!val) return;
    this.search.getSearchItems(val)
      .subscribe(result => {
        (this.searchType === 'ingredients') ? this.foundIngredients = result : this.foundRecipes = result;
      });
  }

  addIngredient(item) {
    this.userFood.addActiveIngredients(item);
  }

  openRecipeDetailPage() {
    console.log('test');
  }

}
