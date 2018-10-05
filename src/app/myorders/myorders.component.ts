import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import * as global from '../global';
declare var $;
import { BaseResponseOptions } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  index:any;
  myorderdetailes: any;
  penddingdata: any;
  userid: string;
  sessionid: string;
  Process: any;
  Processdata:Array<any> = [];
  temp: any[];
  cancledata: Array<any> = [];
  delivereddata: Array<any> = [];
  template: string =`<img src="/assets/Images/assets/loading_icon.gif" />`

  constructor(private spinnerService:Ng4LoadingSpinnerService,private activatedRoute:ActivatedRoute,private router:Router, private appService : AppService,private httpclient:HttpClient) { }

  ngOnInit() {
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
   // console.log(this.index=this.activatedRoute.snapshot.params['id']);
    let orderdetaile:any;
    orderdetaile= {
      StoreId:10002,
      UserId:this.userid,
      SessionId:this.sessionid,
      AppId:10002,
      PageNumber:1,
      PageSize:10
   }

   this.spinnerService.show();

   this.appService.postdetails(global.baseUrl+'Order/OrderGetList',orderdetaile)
   .subscribe(Response => {
     if(Response)
     {
      console.log(Response);
        this.myorderdetailes= Response.ListOrder;
        this.spinnerService.hide();
        console.log(this.myorderdetailes);
      } 
     
  
    else{
     alert("something went wrong at server");
    }

  });

  }
  
 toggle(e) {
    e.preventDefault();
  
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('.inner').removeClass('show');
        $this.parent().parent().find('.inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
  }


  myOrder =[
    {
      image:'assets/Images/Product Page_1.png',
    }
  ];

  gotoaccount() {
    this.router.navigate(['/myaccount']);
  }

  gotoHome() {
    this.router.navigate(['/']);
  }
}
