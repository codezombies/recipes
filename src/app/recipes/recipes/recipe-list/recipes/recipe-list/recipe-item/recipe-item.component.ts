import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../../../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Output() selectRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  @Input() recipe: Recipe;

  constructor() {
  }

  ngOnInit() {
  }

  onSelectDetail() {
    this.selectRecipe.emit(this.recipe);
  }
}
