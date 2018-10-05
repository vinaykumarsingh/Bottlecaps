import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import{Router,ActivatedRoute,NavigationEnd} from '@angular/router';
import * as global from '../global';
declare var $;
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  pagesize: any;
  selected: any;
  searchvalue: any;
  CategoryId: any;
  regionid: any;
  typeid: any;
  varietalid: any;
  countryid: any;
  sizeid: any;
  sessionid: any;
  userid: any;
  favlist: any;
  template: string =`<img src="/assets/Images/assets/loading_icon.gif" />`
  constructor(private spinnerService:Ng4LoadingSpinnerService,private activatedRoute:ActivatedRoute,private fb: FormBuilder,private router:Router, private appService : AppService,private httpclient:HttpClient) { }

  ngOnInit() {
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
    this.favoritelist();
  }


  favoritelist(){
    let ReqObject:any;
    ReqObject = {
      StoreId:10002,
       
      PageSize:10,
     
      PageNumber:1,
     
      IsClub : 0,
     
      KeyWord:"",
     
      CategoryId:"1,2,3,4",
     
      RegionId:"",
     
      TypeId:"",
     
      VaritalId:"",
     
      CountryId:"",
      
      SizeId:"",
  
      SessionId:this.sessionid,
     
      UserId: this.userid,
     
      AppId:10002,
     
      IsFavorite:1,
      
      IsFeatured:1
     
     }
  
     console.log(ReqObject);
     this.spinnerService.show(); 
    this.appService.postdetails(global.baseUrl+'Product/ProductGetList',ReqObject).subscribe(Response => {
  
      if(Response)
      {
       console.log(Response);
       
        this.favlist =Response.ListProduct;
        this.spinnerService.hide();
        console.log(this.favlist);
      
   
     }else{
      alert("something went wrong at server");
     }
  
  });
  }

}
