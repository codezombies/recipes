import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    { name: 'Pasta', amount: 1},
    { name: 'Tomatoes', amount: 5}
  ];

  getIngredients() {
    return [ ...this.ingredients ];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
