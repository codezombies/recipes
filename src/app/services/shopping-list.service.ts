import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    { name: 'Pasta', amount: 1},
    { name: 'Tomatoes', amount: 5}
  ];

  getIngredients() {
    return [ ...this.ingredients ];
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.getIngredients());
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

}
