import { Component, OnInit, EventEmitter, Output, Inject, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import *as global from '../global';
declare var $;
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login/loginservice';
// import {CheckboxModule} from 'primeng/checkbox';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchform: FormGroup;
  @ViewChild('logout') logout: ElementRef;
  logo1 = "assets/Images/assets/logo.png";
  id = [];
  selected = 1;
  categoryid: any
  @Output() CategoryEmitter = new EventEmitter<number>();
  username: any;
  userid: any;
  sessionid: any;
  login = "Login/Register";
  hithere: "Hi There";
  // hithere="Hi There"
  custermerinfo = 0;
  productsList: any;
  hiuser: any;
  email: any;
  ids: any;
  EmailIdd: any;
  storeGetHomeData: any;
  beerSelectedType: any[] = []
  beerSelectedTypeAll: any[] = []

  // @Input() childMessage: any;
  constructor(private loginservice: LoginService, private appService: AppService, private activatedRoute: ActivatedRoute, private router: Router) {

  }
  userprofilename() {
    if (localStorage.getItem('EmailId') == null) {
      this.hiuser = this.hithere;
      this.username = this.login;

    }
    else {

      this.username = (localStorage.getItem('EmailId'));
      //this.logout.nativeElement.style.display='block'
    }
  }
  private subscription: Subscription;
  ngOnInit() {
    this.subscription = this.loginservice.notifyObservable$.subscribe((res) => {
      if (res == "Sign In") {
        this.hiuser = this.hithere;
        this.username = this.login;

      }
    });
    this.subscription = this.loginservice.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('EmailId')) {
        console.log(res.EmailId);

        // perform your other action from here
        if (res.EmailId == null) {
          this.hiuser = this.hithere;
          this.username = this.login;

        }
        else {

          this.username = res.EmailId;
          //this.logout.nativeElement.style.display='block'
        }
      }
    });
    $('.main_ul li').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');
    });

    // $('nav ul li a').click(function(){
    //   $('li a').removeClass("active");
    //   $(this).addClass("active");
    // });

    this.searchform = new FormGroup({
      search: new FormControl('')
    })
    // this.custermerinfo=localStorage.getItem('custermerinfo');

    //   this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //     return false;
    // };

    this.userprofilename();

    /* Header Change*/
    var menu = $('#menu'),
      pos = menu.offset();

    $(window).scroll(function () {
      if ($(this).scrollTop() > pos.top + menu.height() && menu.hasClass('default')) {
        menu.fadeOut('fast', function () {
          $(this).removeClass('default').addClass('fixed').fadeIn('fast');
        });
      } else if ($(this).scrollTop() <= pos.top && menu.hasClass('fixed')) {
        menu.fadeOut('fast', function () {
          $(this).removeClass('fixed').addClass('default').fadeIn('fast');
        });
      }
    });



    $('nav ul li a').click(function () {
      $('li a').removeClass("active");
      $(this).addClass("active");
    });

    this.carttotal();
  }

  onbeerSelectedTypeAllClick(event) {
    console.log(event);
    if (event.length) {
      console.log("beerSelectedTypeAll====>", this.beerSelectedTypeAll);
    // storeGetHomeData?.StoreFilters[0].ListType      
    for(let i=0; i< this.storeGetHomeData.StoreFilters[0].ListType.length; i++) {
      this.beerSelectedType.push(this.storeGetHomeData.StoreFilters[0].ListType[i].TypeName)
    }
    console.log("selected beer option are ==>", this.beerSelectedType)
    } else {
      this.beerSelectedType = [];
    }
    

  }

  onExtendedMenuClick(event) {
    event.preventDefault();
  }

  gotocart() {
    this.router.navigate(['/cart']);
  }

  carttotal() {
    let StoreObject: any;
    StoreObject = {
      StoreId: 10002,
      SessionId: this.sessionid,
      UserId: this.userid,
      AppId: 10002,
      IsFeatureProduct: true
    }

    this.appService.postdetails(global.baseUrl + 'Store/StoreGetHome', StoreObject)
      .subscribe(Response => {
        if (Response) {
          // console.log(Response);
          this.storeGetHomeData = Response;
           console.log(this.storeGetHomeData);
          this.custermerinfo = Response.CustomerInfo.CartItemCount;
        }

      });

  }

  UserLogout() {
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


  userlogin() {
    if (localStorage.getItem('UserId') == "0") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/myaccount']);
    }

  }
  /* Header Change End*/

  onclick(id) {

    this.CategoryEmitter.emit(id);
    this.router.navigate(['home/'], { queryParams: { id: id, value: "" } });
    console.log(id);
  }

  searchcproduct() {
    // if(this.searchform.get('search').value==""){

    // }
    this.router.navigate(['/home'], { queryParams: { id: "1,2,3,4", value: this.searchform.get('search').value } })
  }

}




