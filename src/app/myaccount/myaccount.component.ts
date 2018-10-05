import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import *as global from '../global';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoginService } from '../login/loginservice';
declare var $;
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  myaccountdetailes: any;
  updatedetailes: any;
  userid: string;
  sessionid: string;
  @ViewChild('profile') profile: ElementRef;
  @ViewChild('payment') payment: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('favorite') favorite: ElementRef;
  getaddresslist: any;
  myorderdetailes: any;
  constructor(private loginservice:LoginService,private actvatedRoute: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private router: Router, private appService: AppService, private httpclient: HttpClient) { }
  editForm: FormGroup;
  ngOnInit() {

    this.myaccount();
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        window.scroll(0, 0);
      });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');

    this.editForm = new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      email: new FormControl(''),
      phnumber: new FormControl(''),
      gender: new FormControl('')
    })

    $.sidebarMenu($('.sidebar-menu'));

    this.ProfileGetDetail();
    this.customeraddress();

  }

  onAddressSelect(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.Address1);

    let addressChangepayload: any;
    addressChangepayload = {
      AppId: 10002,
      DeviceId: "W",
      DeviceType: "W",
      StoreId: 10002,
      UserId: this.userid,
      SessionId: this.sessionid,
      AddressId: selectedItem.AddressId,
      Address1: selectedItem.Address1,
      Address2: selectedItem.Address2,
      City: selectedItem.City,
      State: selectedItem.State,
      Zip: selectedItem.Zip,
      Country: selectedItem.Country,
      IsDefault : 1
    }
    this.spinnerService.show();
    this.appService.postdetails(global.baseUrl + 'Customer/AddressUpdate', addressChangepayload)
      .subscribe(Response => {
        if (Response) {
          console.log(Response);
          // alert("sucess");
        }
        else {
          alert("something went wrong at server");
        }
      });

      this.router.navigateByUrl('checkout?deliverytype=d');
  }

  
  onAddressDelete(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.Address1);

    let addressDeletePayload: any;
    addressDeletePayload = {
      StoreId: 10002,
      UserId: localStorage.getItem("UserId"),
      SessionId: localStorage.getItem("SessionId"),      
      AppId: 10002,
      AddressId: selectedItem.AddressId
    }
    this.spinnerService.show();
    this.appService.postdetails(global.baseUrl + 'Customer/AddressDelete', addressDeletePayload)
      .subscribe(Response => {
        if (Response) {
          console.log("addressDeletePayload result===>",Response);
          if(Response.MessageTitle == "Customer Address Delete") {
            this.customeraddress();
          }
        }
        else {
          alert("something went wrong at server");
        }
      });
  }

  onchange(id) {
    if (id == 0) {
      this.profile.nativeElement.style.display = 'block';
    }
    else {
      this.profile.nativeElement.style.display = 'none';
    }
    if (id == 2) {
      this.payment.nativeElement.style.display = 'block';
    }
    else {
      this.payment.nativeElement.style.display = 'none';
    }
    if (id == 1) {
      this.address.nativeElement.style.display = 'block';
    }
    else {
      this.address.nativeElement.style.display = 'none';
    }
  }

  myaccount() {
    var accountid = this.actvatedRoute.snapshot.queryParams['id'];
    if (accountid == 3) {
      this.profile.nativeElement.style.display = 'block';
    }
    else {
      this.profile.nativeElement.style.display = 'none';
    }
    if (accountid == 1) {
      this.payment.nativeElement.style.display = 'block';
    }
    else {
      this.payment.nativeElement.style.display = 'none';
    }
    if (accountid == 2) {
      this.address.nativeElement.style.display = 'block';
    }
    else {
      this.address.nativeElement.style.display = 'none';
    }
  }


  addnewaddress() {
    this.router.navigate(['/addaddress']);
  }
  // favoriteclik()
  // {
  //   this.router.navigate(['/myaccount/favorite']);
  // }

  ProfileGetDetail() {
    let ReqObject: any;
    ReqObject = {
      StoreId: 10002,
      UserId: this.userid,
      SessionId: this.sessionid,
      AppId: 10002
    }
    this.spinnerService.show();
    this.appService.postdetails(global.baseUrl + 'Customer/ProfileGetDetail', ReqObject)
      .subscribe(Response => {

        if (Response) {
          this.myaccountdetailes = Response;
          this.spinnerService.hide();
          this.editForm.controls['email'].setValue(this.myaccountdetailes.EmailId);
          this.editForm.controls['fname'].setValue(this.myaccountdetailes.FirstName);
          this.editForm.controls['lname'].setValue(this.myaccountdetailes.LastName);
          this.editForm.controls['phnumber'].setValue(this.myaccountdetailes.ContactNo);
          this.editForm.setValue['gender'].setValue(this.myaccountdetailes.Gender);

          console.log(Response);
          // alert("sucess");
        }
        else {
          alert("something went wrong at server");
        }

      });
  }

  updatecustormerdetails() {

    let accountupdate: any;

    accountupdate = {
      "FirstName": this.editForm.get('fname').value,
      "LastName": this.editForm.get('lname').value,
      "EmailId": this.editForm.get('email').value,
      "ContactNo": this.editForm.get('phnumber').value,
      "Gender": this.editForm.get('gender').value,
      StoreId: 10002,
      UserId: this.userid,
      SessionId: this.sessionid,
      AppId: 10002

    }
    //let SendingObject=JSON.stringify(accountupdate); 
    console.log(accountupdate);

    this.appService.postdetails(global.baseUrl + 'Customer/CustomerProfileUpdate', accountupdate)
      .subscribe(Response => {

        if (Response) {
          // console.log(Response);
          this.updatedetailes = Response;
          this.ProfileGetDetail();
          //alert("sucess");
        }
        else {
          alert("something went wrong at server");
        }

      });

  }


  customeraddress() {
    let ReqObject: any;
    ReqObject = {
      StoreId: 10002,
      UserId: this.userid,
      SessionId: this.sessionid,
      AppId: 10002,
      DeviceType: "W",
      DeviceId: "W"
    }
    this.spinnerService.show();
    this.appService.postdetails(global.baseUrl + 'Customer/CustomerAddressGetList', ReqObject)
      .subscribe(Response => {

        if (Response) {
          this.getaddresslist = Response.ListAddress;

          console.log(this.getaddresslist);
        }
        else {
          alert("something went wrong at server");
        }

      });
  }

  favoritelist() {
    let favorite: any;
    favorite = {

      //PId: 491671,
      FavoriteStatus: true,
      StoreId: 10002,
      UserId: this.userid,
      SessionId: this.sessionid,
      AppId: 10002
    }

    this.appService.postdetails(global.baseUrl + 'Product/FavoriteProductUpdate', favorite)
      .subscribe(Response => {

        if (Response) {
          this.favoritelist = Response;
          console.log(this.favoritelist)
        }
        else {
          alert("something went wrong at server");
        }
      });

  }

  //   gotomyorders()
  //   {
  //         this.router.navigate(['/myaccount/myorders']);
  //  }

  userlogout() {
    this.loginservice.logout();
    localStorage.removeItem('EmailId');
       localStorage.removeItem('Password');
       localStorage.removeItem('DeviceId');
       localStorage.removeItem('AppId');
       localStorage.removeItem('DeviceType');
       localStorage.removeItem('IsAccess');
       localStorage.removeItem('SessionId');
       localStorage.removeItem('UserId');
    this.router.navigate(['/']);

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }

  logout() {
    let ReqObject: any;
    ReqObject = {
      StoreId: 10002,
      UserId: this.userid,
      SessionId: this.sessionid,
      AppId: 10002
    }
    this.appService.postdetails(global.baseUrl + 'Login/LogOutCustomer', ReqObject)
      .subscribe(Response => {

        if (Response) {
          // console.log(Response);
          this.router.navigate(['/']);
        }
        else {
          alert("something went wrong at server");
        }
      });

  }

}
