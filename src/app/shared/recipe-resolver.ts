import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../recipes/recipe';
import {Observable} from 'rxjs/Observable';
import {RecipeService} from '../services/recipe.service';

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipeService.getRecipe(+route.params['id']);
  }
}
