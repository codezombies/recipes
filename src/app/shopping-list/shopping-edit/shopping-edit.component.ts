import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient';
import {NgForm} from '@angular/forms';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;

  subscription: Subscription;
  edit = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.edit = true;
      this.editItemIndex = index;
      this.editItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({...this.editItem});
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const { name, amount } = form.value;
    if (!this.edit) {
      this.shoppingListService.addIngredient(new Ingredient(name, amount))
    } else {
      this.shoppingListService.updateIngredient(this.editItemIndex, new Ingredient(name, amount));
    }
    this.edit = false;
    form.reset();
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.removeIngredient(this.editItemIndex);
  }

  onClear() {
    this.edit = false;
    this.form.reset();
  }
}
