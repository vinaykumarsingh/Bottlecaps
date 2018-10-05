import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import * as global from '../global';
import {Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm:FormGroup;
  sessionid: any;
  userid: any;
  email: string;
  constructor(private appService:AppService,private router:Router) { }

  ngOnInit() {

    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
     this.email=localStorage.getItem('EmailId');
    this.forgotForm= new FormGroup({
      email: new FormControl('')
   
    })
  }
  onforgot(){
    let body:any;
    body={
      EmailId:this.forgotForm.get('email').value,
      StoreId: 10002, 
      SessionId:this.sessionid,
      UserId:this.userid, 
      AppId:10002,
        }
        console.log(body);
        this.appService.postdetails(global.baseUrl+'Login/ForgotPassword',body).subscribe(Response => {
          if(Response)
          {
            console.log(Response);
            alert(Response.Mesaage);
     this.router.navigate(['/']);
         }
         else{
      alert(Response.ErrorDetail);
      this.router.navigate(['/login']);
         }
     
       });
    }
  }

