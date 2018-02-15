import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Beef Stew',
      'Awesome Beef Stew',
      'https://upload.wikimedia.org/wikipedia/commons/f/f9/Beef_stew_%2815707525894%29.jpg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
