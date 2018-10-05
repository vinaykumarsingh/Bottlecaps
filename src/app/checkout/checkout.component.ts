import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import * as global from '../global';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  template: string = `<img src="/assets/Images/assets/loading_icon.gif" />`
  userid: string;
  sessionid: string;
  cartdetails: any;
  cartitem: any;
  cartdata: any;
  addressgetlist: any;
  charges: any;
  deliver: boolean;
  displayAddPaymentModal: boolean = false;

  rForm: FormGroup;
  post:any;                     
  description:string = '';
  name:string = '';
  
  @ViewChild('ptype') ptype: ElementRef;
  @ViewChild('dtype') dtype: ElementRef;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute,
    private appservice: AppService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    this.rForm = this.fb.group({
      'cardNumber' : [null, Validators.required],
      'expiryDate1' : [null, Validators.required],
      'expiryDate2' : [null, Validators.required],
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'Address' : [null, Validators.required],
      'city' : [null, Validators.required],
      'state' : [null, Validators.required],
      'ZipCode' : [null, Validators.required],
      'PhoneNumber' : [null, Validators.required],
      'markDefault' : [null, Validators.required]

    });


    this.CustomerAddressGetList();
    if (this.activatedRoute.snapshot.queryParams['deliverytype'] == 'd') {
      this.dtype.nativeElement.style.display = 'block';
    }
    if (this.activatedRoute.snapshot.queryParams['deliverytype'] == 'p') {
      this.ptype.nativeElement.style.display = 'block';
    }

    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
    this.Getcartdetails();
   // this.GetDefaultAddress();


    $(function () {
      $("#datepicker").datepicker();
    });

  }

  showAddPaymentModalDialog() {
    this.displayAddPaymentModal = true;
  }
  AddPaymentCard(event) {
    console.log("payment modal click ebent", this.rForm.value)
    let AddPaymentCardPayload :any;

    AddPaymentCardPayload = {
      // EmailId: this.user.email,
      // Password: "", SourceId: this.user.id,
      // LoginType: "F",
      // AppVersion: "8.5",
      // DeviceId: "D71E718C-D9DE-4450-B8D8-E5A28633E9F555",
      // DeviceType: "A",
      // AppId: 10002,
      // StoreId: 10002
    }
    // console.log(AddPaymentCardPayload);
    // this.appService.postdetails(global.baseUrl + 'Login/LoginCustomer', AddPaymentCardPayload).subscribe(Response => {
    //   if (Response.IsAccess == true) {
    //     console.log(Response);
    //     //this.ses= localStorage.setItem('SessionId',Response.SessionId);
    //     // this.ses= localStorage.setItem('UserId',Response.UserId);

    //     //console.log(this.ses);
    //     localStorage.setItem('EmailId', this.user.email);
    //     localStorage.setItem('Password', "");
    //     localStorage.setItem('DeviceId', Response.DeviceId);
    //     localStorage.setItem('AppId', Response.AppId);
    //     localStorage.setItem('DeviceType', Response.DeviceType);
    //     localStorage.setItem('IsAccess', Response.IsAccess);
    //     localStorage.setItem('SessionId', Response.SessionId);
    //     localStorage.setItem('UserId', Response.UserId);
    //     //  console.log( this.ses);
    //     this.router.navigate(['/']);
    //   }
    //   else {
    //     alert(Response.ErrorDetail);
    //     this.router.navigate(['/login']);
    //   }

    // });
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }

  // GetDefaultAddress() {
  //   let getDefaultAddPayload = {
  //     StoreId: 10002,
  //     UserId: this.userid,
  //     SessionId: this.sessionid,
  //     AppId: 10002,
  //     Address1: "400 East Royal Ln",
  //     Address2: "ad",
  //     ity: "Irving",
  //     State: "TX",
  //     Zip: "75039",
  //     Country: "UnitedStates",
  //     IsDefault: 1
  //   }

  //   this.spinnerService.show();
  //   this.appservice.postdetails(global.baseUrl + 'Customer/AddressInsert', getDefaultAddPayload).subscribe(Response => {
  //     if(Response) {
  //       this.defaultAddObj = Response        
  //     }else {
  //       console.log("Problem in fetchig default address");
  //     }

  //     console.log("defaultAddObj===>", this.defaultAddObj)
  //   });
  // }


  Getcartdetails() {
    let CartDetails: any;
    CartDetails = {
      StoreId: 10002,
      UserId: localStorage.getItem('SessionId'),
      SessionId: localStorage.getItem('SessionId'),
      AppId: 10002,
      // CartId:0,
    }
    // console.log(CartDetails);
    this.spinnerService.show();
    this.appservice.postdetails(global.baseUrl + 'Cart/CartGetDetail', CartDetails).subscribe(Response => {

      if (Response) {
        this.cartdetails = Response.ListCartItem;
        this.charges = Response.ListCharge;
        this.spinnerService.hide();
        // this.cartitem =Response;

        this.cartdata = Response;
        console.log(this.cartdata);

      }

      else {
        alert("something went wrong at server");
      }
    });

  }


  CustomerAddressGetList() {
    let CartDetails: any;
    CartDetails = {
      StoreId: 10002,
      UserId: localStorage.getItem('UserId'),
      SessionId: localStorage.getItem('SessionId'),
      AppId: 10002,
      DeviceType: "W",
      DeviceId: "W"
    }

    this.spinnerService.show();
    this.appservice.postdetails(global.baseUrl + 'Customer/CustomerAddressGetList', CartDetails).subscribe(Response => {

      if (Response) {
        this.addressgetlist = Response.ListAddress;
        this.spinnerService.hide();
      }
      else {
        alert("something went wrong at server");
      }
    });

  }



  addnewaddress() {
    this.router.navigate(['/addaddress']);
  }

  gotoaddress(id) {
    this.router.navigate(['/myaccount'], { queryParams: { id: 2 } });
  }





}
