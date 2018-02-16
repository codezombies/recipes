import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelect: EventEmitter<Recipe> = new EventEmitter<Recipe>()

  recipes: Recipe[] = [
    new Recipe('Beef Stew',
      'Slow-cooked beef stew. Perfect for every occasion.',
      'https://upload.wikimedia.org/wikipedia/commons/f/f9/Beef_stew_%2815707525894%29.jpg'),
    new Recipe('Spaghetti',
      'Homemade Spaghetti. Yummy!',
      'https://cdn2.tmbi.com/TOH/Images/Photos/37/300x300/Stamp-of-Approval-Spaghetti-Sauce_EXPS_MTCBBZ17_39564_D02_24_2b.jpg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelect(recipe) {
    this.recipeSelect.emit(recipe)
  }
}
