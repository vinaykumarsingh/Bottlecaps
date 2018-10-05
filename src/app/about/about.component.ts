import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import{Router} from '@angular/router';
import *as global from '../global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  storegetList: any;
  storegetpicktime: any;
  storegetdeliverytime: any;
  userid: string;
  sessionid: string;
  template: string =`<img src="/assets/Images/assets/loading_icon.gif" />`

  constructor(private spinnerService:Ng4LoadingSpinnerService,private router:Router, private appService : AppService,private httpclient:HttpClient) { }
 
  ngOnInit() {

    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');

  let StoreGetDeatile:any;
  StoreGetDeatile = {	
    StoreId:10002,
    UserId:this.userid,
    SessionId:this.sessionid,
    AppId:10002
    }	
    this.spinnerService.show(); 
    //console.log(StoreGetDeatile);
     this.appService.postdetails(global.baseUrl+'Store/StoreGetDetail',StoreGetDeatile)
     .subscribe(Response => {
       if(Response)
       {
         this.storegetList =Response.GetStoredetails;
         this.storegetpicktime =Response.GetStoredetails.ListStoreTime;
         this.storegetdeliverytime =Response.GetStoredetails.ListStoreTimeDelivery;
         this.spinnerService.hide(); 
        console.log(Response);
       // alert("sucess");
      }
      else{
       alert("something went wrong at server");
      }

    });

  }

  gottoHome() {
    this.router.navigate(['']);
  }

}
