import {Injectable, OnDestroy} from '@angular/core';
import {Recipe} from '../recipes/recipe';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RecipeService implements OnDestroy {

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>()
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService, private authService: AuthService, private http: HttpClient) {
    this.recipesChanged.
      subscribe((data: Recipe[]) => {
        this.recipes = data;
        this.saveRecipes();
      });
  }

  ngOnDestroy() {
    this.recipesChanged.unsubscribe();
  }

  loadRecipes() {
    this.http.get(`${environment.firebaseApiUrl}/recipes.json?auth=${this.authService.getToken()}`)
      .subscribe((data: Recipe[]) => {
        this.recipesChanged.next(data);
        this.recipes = data;
      });
  }

  getRecipe(id: number) {
    console.log('resolver.id', id)
    return this.recipes.find(recipe => recipe.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.recipes.map(it => +it.id).sort().reverse()[0] + 1 || 1;
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
    return recipe.id;
  }

  updateRecipe(id: number, recipe: Recipe) {
    const find = this.recipes.findIndex(it => it.id === id);
    this.recipes[find] = { ...recipe, id };
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(id: number) {
    const find = this.recipes.findIndex(it => it.id === id);
    this.recipes.splice(find, 1);
    this.recipesChanged.next([...this.recipes]);
  }

  private saveRecipes() {
    this.http.put(`${environment.firebaseApiUrl}/recipes.json?auth=${this.authService.getToken()}`, this.recipes)
      .subscribe((data: Response) => {
        console.log(data);
      });
  }
}
