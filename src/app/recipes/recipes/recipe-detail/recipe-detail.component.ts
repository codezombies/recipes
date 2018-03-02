import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Data, Route, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  show = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe'];
    });
  }

  toggleDropdown() {
    this.show = !this.show;
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
