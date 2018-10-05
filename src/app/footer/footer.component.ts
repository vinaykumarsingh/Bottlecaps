import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import{Router, ActivatedRoute} from '@angular/router';
import *as global from '../global';
declare var $;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Accountname:any;
  Information:any;
  About:any;
  userid: any;
  sessionid: any;
  storegetList: any;
  storefilters: any;
  productsList: any;
  CategoryId: any;
  StoreEmail: any;
  Phone: any;
  State: any;
  City: any;
  Location: any;
  Address1: any;
  storename: any;
  footerdata: any;

  constructor(private activatedRoute:ActivatedRoute,private router:Router, private appService : AppService,private httpclient:HttpClient) {
   
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
   
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
 
    this.Accountname=[
      {name:'My Orders'},
      {name:'My Payment method'},
      {name:'My Address'},
      {name:'My Personal Info'}
    
    ];
    this.Information =[
      {name:'Beer'},
      {name:'Liquor'},
      {name:'Wine'},
      {name:' Mixers & More'},
      {name:'Deals'},
      {name:'New Products'},
      {name:'Best Sellers'},
      {name:'Our Stores'}
    ];
    
    this.About=[
      {name:'About'},
      {name:'Contact Us'}
    ];
  

   }
    

  ngOnInit() {
   
     this.footercontent();

     $('.clear-margins li').click(function() {
      $(this).addClass('active').siblings().removeClass('active');
    });

  // Place Holder
$('#myid').data('holder',$('#myid').attr('placeholder'));

$('#myid').focusin(function(){
    $(this).attr('placeholder','');
});
$('#myid').focusout(function(){
    $(this).attr('placeholder',$(this).data('holder'));
});


$('.clear-margins li').click(function () {
  $('.clear-margins li a.active').removeClass('active');
  $(this).find("a").addClass('active');
});
  
  }
      Gotoproduct(id){
       this.router.navigate(['home/'], { queryParams: { id: id,value:""} });  
      }
      
footercontent(){

  let StoreObject:any;
  StoreObject = {	
  StoreId: 10002,	
  SessionId:localStorage.getItem('SessionId'),
  UserId:localStorage.getItem('UserId'),	
  AppId:10002,	
  IsFeatureProduct:false	
  }	

 // console.log(StoreObject);
   this.appService.postdetails(global.baseUrl+'Store/StoreGetHome',StoreObject)
   .subscribe(Response => {
    console.log(Response);
     if(Response)
     {
      this.Address1=Response.Address1;
      this.Location=Response.Location;
       this.City=Response.City;
       this.State=Response.State;
       this.Phone=Response.Phone;
       this.StoreEmail=Response.StoreEmail;
       this.storename=Response.StoreName;
       this.footerdata=Response
       console.log(this.storename);
    }
    else{
     alert("something went wrong at server");
    }

  });
}
myorders(){
  if(this.userid==0){
  this.router.navigate(['/login']);
}
else
{
this.router.navigate(['/myorders']);
}
}
}