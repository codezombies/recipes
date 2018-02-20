import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe';
import {RecipeService} from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  show = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.show = !this.show;
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
