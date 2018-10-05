import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as global from '../global';
import { AppService } from '../app.service';
@Component({
  selector: 'app-addnewaddress',
  templateUrl: './addnewaddress.component.html',
  styleUrls: ['./addnewaddress.component.css']
})
export class AddnewaddressComponent implements OnInit {
  addaddress: FormGroup;
  newaddress: any;
  userid: string;
  sessionid: string;
  constructor(private activatedRoute: ActivatedRoute, private appservice: AppService, private router: Router) { }

  ngOnInit() {
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');

    this.addaddress = new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      Add1: new FormControl(''),
      Add2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipcode: new FormControl('')
    })

  }

  addressinsert() {
    let address: any;
    address = {
      StoreId: 10002,
      UserId: this.userid,
      SessionId: this.sessionid,
      AppId: 10002,
      "FirstName": this.addaddress.get('fname').value,
      "LastName": this.addaddress.get('lname').value,
      "Address1": this.addaddress.get('Add1').value,
      "Address2": this.addaddress.get('Add2').value,
      "City": this.addaddress.get('city').value,
      "State": this.addaddress.get('state').value,
      "Zip": this.addaddress.get('zipcode').value
      // "Zip":this.addaddress.get('zipcode').value,
    }
    this.appservice.postdetails(global.baseUrl + 'Customer/AddressInsert', address)
      .subscribe(Response => {

        if (Response) {
          this.newaddress = Response;
          console.log(this.newaddress);
        }
        else {
          alert("something went wrong at server");
        }

      });

  }

}