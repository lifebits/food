import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchProvider {

  private apiUrl:string = 'http://hedgehog.freedom-vrn.ru/food';

  public searchType: 'ingredients' | 'recipes' = 'ingredients';

  constructor(public http: Http) {
    console.log('Hello SearchProvider');
  }

  getSearchItems(val: string) {
    return (this.searchType === 'ingredients') ? this.getIngredientList(val) : this.getRecipeListByName(val);
  }

  getIngredientList(val: string) {
    let url: string = this.apiUrl + '/ingredient?key=' + val;
    return this.http.get(url)
      .map((res: Response) => res.json())
  }

  getRecipeListByName(val: string) {
    let url: string = this.apiUrl + '/listrecipe?search=' + val;
    return this.http.get(url)
      .map((res: Response) => res.json())
  }

  getRecipeByIngredient() {

  }

}
