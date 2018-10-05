import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css']
})

export class RecipedetailsComponent implements OnInit {

  index:any;
  recipesdetails: any;
  RecipeId: any;
  userid: string;
  sessionid: string;
  template: string =`<img src="/assets/Images/assets/loading_icon.gif" />`
  constructor(private spinnerService:Ng4LoadingSpinnerService,private activatedRoute:ActivatedRoute,private router:Router, private appService : AppService,private httpclient:HttpClient) { }

  ngOnInit() {
    
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
   
    let RecipesDetailsObject:any;
     RecipesDetailsObject= {
      StoreId:10002,
      RecipeId:this.activatedRoute.snapshot.params['id'],
      UserId:this.userid,	
      SessionId: this.sessionid,	
      AppId:10002
     
   }

  // console.log(this.RecipeId);
   this.spinnerService.show();
   this.appService.postdetails(global.baseUrl+'Recipe/RecipeGetDetail',RecipesDetailsObject).subscribe(Response => {
     if(Response)
     {
       this.recipesdetails =Response.RecipeDetail;
       this.spinnerService.hide();
      // console.log(this.recipesdetails)
  
    }
    else{
     alert("something went wrong at server");
    }

  });
   

  }
   
  gottoHome() {
    this.router.navigate(['']);
  }
  gotorecipes() {
    this.router.navigate(['/recipes']);
  }

  // myaccountclick(){
  //   this.router.navigate(['/myaccount'])
  // }
}



