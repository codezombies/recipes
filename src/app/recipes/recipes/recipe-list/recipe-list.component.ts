import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipe';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }

}
