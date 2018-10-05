import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  index: any;
  recipes: any;
  userid: string;
  sessionid: string;
  template: string =`<img src="/assets/Images/assets/loading_icon.gif" />`

  constructor(private spinnerService:Ng4LoadingSpinnerService,private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService, private httpclient: HttpClient) { }
  ngOnInit() {

    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
    console.log(this.index = this.activatedRoute.snapshot.params['id']);

    let RecipesObject: any;
    RecipesObject = {
      PageSize: 10,
      PageNumber: 1,
      StoreId: 10002,
      UserId:this.userid,	
      SessionId:this.sessionid,	
      AppId:10002
    }

    console.log(RecipesObject);
    this.spinnerService.show();
    this.appService.postdetails(global.baseUrl + 'Recipe/RecipeGetList', RecipesObject).subscribe(Response => {
      if (Response) {
        this.recipes = Response.ListRecipe;
        this.spinnerService.hide();
        console.log(Response);
        // alert("sucess");
      }
      else {
        alert("something went wrong at server");
      }

    });


  }

  recipedetailclick(id) {
    console.log(id);
    this.router.navigate(['/recipedetails', id]);

  }

 

}
