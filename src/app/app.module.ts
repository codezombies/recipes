import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipes/recipe-list/recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {RecipeService} from './services/recipe.service';
import {ShoppingListService} from './services/shopping-list.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {RecipeResolver} from './shared/recipe-resolver';
import {RecipeEditComponent} from './recipes/recipes/recipe-edit/recipe-edit.component';
import {RecipeStartComponent} from './recipes/recipes/recipe-start/recipe-start.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeStartComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService, ShoppingListService, RecipeResolver, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
