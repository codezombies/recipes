import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from '../services/shopping-list.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged
        .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        });
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
