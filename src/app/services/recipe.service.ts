import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe('Beef Stew',
      'Slow-cooked beef stew. Perfect for every occasion.',
      'https://upload.wikimedia.org/wikipedia/commons/f/f9/Beef_stew_%2815707525894%29.jpg',
      [
        new Ingredient('Beef', 2),
        new Ingredient('Potatoes', 3),
        new Ingredient('Carrots', 3),
        new Ingredient('Salt and Pepper', 1),
      ]),
    new Recipe('Spaghetti',
      'Homemade Spaghetti. Yummy!',
      'https://cdn2.tmbi.com/TOH/Images/Photos/37/300x300/Stamp-of-Approval-Spaghetti-Sauce_EXPS_MTCBBZ17_39564_D02_24_2b.jpg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Meat', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Salt and Pepper', 1),
      ])
  ];

  getRecipes(): Recipe[] {
    return [ ...this.recipes ];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
