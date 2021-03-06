import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Ingredient, Recipe } from '../interfaces/food.interface';

@Injectable()
export class SearchProvider {

  private apiUrl:string = 'http://hedgehog.freedom-vrn.ru/food';

  public searchType: 'ingredients' | 'recipes' = 'ingredients';

  constructor(public http: Http) {
    console.log('Hello SearchProvider');
  }

  getSearchItems(val: string):  Observable<Ingredient[] | Recipe[]> {
    return (this.searchType === 'ingredients') ? this.getIngredientList(val) : this.getRecipeListByName(val);
  }

  private getIngredientList(val: string): Observable<Ingredient[]> {
    const url: string = this.apiUrl + '/ingredient?limit=5&key=' + val;
    return this.http.get(url)
      .map((res: Response) => res.json())
  }

  private getRecipeListByName(val: string): Observable<Recipe[]> {
    const url: string = this.apiUrl + '/listrecipe?search=' + val;
    return this.http.get(url)
      .map((res: Response) => res.json())
  }

  //food/searsh?ingredient={"яйцо":"2", "молоко": "100"}",
  getRecipeByIngredient(ingredients: Ingredient[]) {
    const query = {};

    ingredients.forEach(item => {
      query[item.ingredient_group] = 1;
    })

    const url: string = this.apiUrl + '/searsh?ingredient=' + JSON.stringify(query);
    
    return this.http.get(url)
      .map((res: Response) => res.json())
  }

}
