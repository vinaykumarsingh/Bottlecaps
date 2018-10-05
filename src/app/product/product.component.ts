import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl,FormGroup} from '@angular/forms';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
import * as $ from 'jquery';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  index:any;
  counter : number = 1;
  productdetaile: any;
  PID: any;
  pagesize=4;
  listreview: any;
  CategoryId:any;
  relatedproductsList:any;
  selected:any;
  productdescription: any;
  userid: string;
  sessionid: string;
  val: any;
  userreview: FormGroup;
  review: {
  StoreId: number; UserId: string; SessionId: string; AppId: number;
    // PID:145670
  PID: any;
  };
  reviewdata: any;
  favorite: any;
  totalcount: any;
  ratingaverage: any;
  region: any;
  country: any;
  productget: any;
  template: string =`<img src="/assets/Images/assets/loading_icon.gif" />`

  constructor(private spinnerService:Ng4LoadingSpinnerService,private activatedRoute:ActivatedRoute,private router:Router, private appService : AppService,private httpclient:HttpClient) { }

  ngOnInit() {

    this.userreview= new FormGroup({
      review: new FormControl(''),
      name: new FormControl(''),
      password: new FormControl('')
    })
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
    
this.selected=this.activatedRoute.snapshot.params['ids'];
this.CategoryId=this.activatedRoute.snapshot.params['cid'];

this.GetrelatedProductDetailsByPost();
    // JS
    $(".favourite_icon").click(function(){
      $(this).css({"color": "yellow"}).removeClass('fa-star-o').addClass('fa-star');
     });

    //console.log(this.index=this.activatedRoute.snapshot.params['id']);
    // cartclick(){
    //   this.router.navigate(['/cart']);
    // }
   
    let productDetaile:any;
    productDetaile= {
      StoreId:10002,
      UserId:this.userid ,
      SessionId:this.sessionid,
      AppId:10002,
      // PID:145670
       PID:this.activatedRoute.snapshot.params['id']
     
   }
   this.appService.postdetails(global.baseUrl+'Product/ProductGetDetail',productDetaile).subscribe(Response => {
     if(Response)
     {
       this.productget=Response;
     
       this.productdetaile =Response.Product;
       this.listreview =Response.ListReview;
       this.productdescription =Response.ProductDescription;
      console.log(this.listreview);
  
    }
    else{
     alert("something went wrong at server");
    }

  });
   

}


custemorereview(desc,rating,title){

let review:any;
review = {
  StoreId:10002,
  UserId:this.userid ,
  SessionId:this.sessionid,
  AppId:10002,
  PID:this.activatedRoute.snapshot.params['id'],
  ReviewDescription :desc,
  ReviewRating :rating,
  ReviewTitle : title,  
 
}
console.log(review);
this.appService.postdetails(global.baseUrl+'Review/ReviewRatingInsert',review).subscribe(Response => {
 if(Response)
 {
   this.reviewdata=Response;
  console.log(this.reviewdata);
}
else{
 alert("something went wrong at server");
}

});
}



changeStarCount(starCount){
  if(starCount==this.val){
    this.val--
    console.log( this.val);

  }else{
    this.val=starCount;
    console.log( this.val);
  }

}

  GetrelatedProductDetailsByPost(){
    let ReqObject:any;
    ReqObject = {
      StoreId:10002,
       
      PageSize:this.pagesize,
     
      PageNumber:this.selected,
     
      IsClub : 0,
     
      KeyWord:"",
     
      CategoryId:this.CategoryId,
     
      RegionId:"",
     
      TypeId:"",
     
      VaritalId:"",
     
      CountryId:"",
     
      UserId:this.userid ,
      SessionId:this.sessionid,
     
      AppId:10002,
     
      IsFavorite:false
     
     }

     this.spinnerService.show();
    this.appService.postdetails(global.baseUrl+'Product/ProductGetList',ReqObject).subscribe(Response => {
      if(Response)
      {
     // this.totalcount=Response.TotalCount
        this.relatedproductsList =Response.ListProduct;
        console.log(this.relatedproductsList);
     this.spinnerService.hide();
     }else{
      alert("something went wrong at server");
     }
  
  });
  }

  addtocart(pid){
    console.log(pid);
    let body2:any;
  body2= {
      StoreId:10002,
      UserId:this.userid,
      SessionId:this.sessionid,
      AppId:10002,
      PID:pid,
      CartId:0,
      Quantity:this.counter
      }

      console.log(body2); 
  this.appService.postdetails(global.baseUrl+'Cart/CartAddItem',body2)
  .subscribe(Response => {
   if(Response)
   { 
    console.log(Response);
    this.GetrelatedProductDetailsByPost()
  //this.router.navigate(['/cart']);
  }
  else{
   alert("something went wrong at server");
  }

});

 }


 favoriteadd(pid,favorite){
    let addfavorite:any;
    addfavorite = {	
      StoreId: 10002,	
      UserId:this.userid,	
      SessionId:this.sessionid,	
      AppId:10002,
      PID:pid,
       FavoriteStatus:favorite 
      }	
  
      console.log(addfavorite);
       this.appService.postdetails(global.baseUrl+'Product/FavoriteProductUpdate',addfavorite)
       .subscribe(Response => {
         if(Response)
         {
           this.favorite = Response;
           this.GetrelatedProductDetailsByPost();
          console.log( this.favorite);
         // alert("sucess");
        }
        else{
         alert("something went wrong at server");
        }
  
      });

  }



  decrement() {
    if( this.counter>0){
      this.counter--;
    }
   else{
    this.counter;
   }
  }

  increment() {
    this.counter++;
  }

  viewmore(page){
   this.pagesize=page;
   this.GetrelatedProductDetailsByPost();
  }

}
