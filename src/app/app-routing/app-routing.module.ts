import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {RecipesComponent} from '../recipes/recipes.component';
import {RecipeDetailComponent} from '../recipes/recipes/recipe-detail/recipe-detail.component';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {ShoppingEditComponent} from '../shopping-list/shopping-edit/shopping-edit.component';
import {RecipeResolver} from '../shared/recipe-resolver';
import {RecipeEditComponent} from '../recipes/recipes/recipe-edit/recipe-edit.component';
import {RecipeStartComponent} from '../recipes/recipes/recipe-start/recipe-start.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {
          recipe: RecipeResolver
        }
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {
          recipe: RecipeResolver
        }
      }
  ]},
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
