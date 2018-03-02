import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../recipe';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe.service';
import {Ingredient} from '../../../shared/ingredient';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] !== undefined;
    });
    this.route.data.subscribe((data: { recipe: Recipe }) => {
      this.recipe = data.recipe;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      console.log('updating recipe with id of ' + this.id);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      console.log('adding new recipe');
      this.id = this.recipeService.addRecipe(this.recipeForm.value);
      this.editMode = true;
    }

  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
    }));
  }

  private initForm() {
    const recipeName = this.editMode ? this.recipe.name : '';
    const recipeImagePath = this.editMode ? this.recipe.imagePath : '';
    const recipeDescription = this.editMode ? this.recipe.description : '';

    const ingredients = new FormArray([]);
    if (this.editMode) {
      this.recipe.ingredients.forEach(ingredient => {
        ingredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
        }));
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required, this.validImage),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': ingredients
    });
  }

  private validImage(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve(null);
      };
      image.onerror = () => {
        resolve({'invalidimagePath': true});
      };
      image.src = control.value;
    });
    return promise;
  }

}
