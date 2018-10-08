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

  beerFilterTypes: any[] = []
  selectedAllBeerFilterTypes: any;
  beerFilterSizes: any[] = []
  selectedAllBeerFilterSizes: any;
  beerFilterPrices: any[] = []
  selectedAllBeerFilterPrices: any;

  liquorFilterTypes: any[] = []
  selectedAllLiquorFilterTypes: any;
  liquorFilterSizes: any[] = []
  selectedAllLiquorFilterSizes: any;
  liquorFilterPrices: any[] = []
  selectedAllLiquorFilterPrices: any;

  wineFilterTypes: any[] = []
  selectedAllWineFilterTypes: any;
  wineFilterSizes: any[] = []
  selectedAllWineFilterSizes: any;
  wineFilterPrices: any[] = []
  selectedAllWineFilterPrices: any;

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

    this.searchform = new FormGroup({
      search: new FormControl('')
    })

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

          this.createBeerFilterType(Response);
          this.createBeerFilterSizes(Response);
          // this.createBeerFilterPrices(Response);

          this.createLiquorFilterType(Response);
          this.createLiquorFilterSizes(Response);
          // this.createLiquorFilterPrices(Response);

          this.createWineFilterType(Response);
          this.createWineFilterSizes(Response);
          // this.createWineFilterPrices(Response);


        }

      });

  }

  /**
   * Code for Beer Filter Type
   */

  createBeerFilterType(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[0].ListType.length; i++) {
      this.beerFilterTypes.push({
        name: storeGetHomeResponce.StoreFilters[0].ListType[i].TypeName,
        selected: false,
        id: storeGetHomeResponce.StoreFilters[0].ListType[i].TypeId
      });
    }
    console.log("beerFilterTypes list is ==>", this.beerFilterTypes)
  }

  selectAllbeerFilterTypes() {
    for (var i = 0; i < this.beerFilterTypes.length; i++) {
      this.beerFilterTypes[i].selected = this.selectedAllBeerFilterTypes;
    }
  }

  checkIfAllBeerFilterTypesSelected() {
    this.selectedAllBeerFilterTypes = this.beerFilterTypes.every(function (item: any) {
      return item.selected == true;
    })
  }

  /**
   * Code for Beer Filter Size
   */

  createBeerFilterSizes(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[0].ListSize.length; i++) {
      this.beerFilterSizes.push({
        name: storeGetHomeResponce.StoreFilters[0].ListSize[i].UnitSize,
        selected: false,
        id: storeGetHomeResponce.StoreFilters[0].ListSize[i].SizeId
      });
    }
    console.log("beerFilterSizes list is ==>", this.beerFilterSizes)
  }

  selectAllbeerFilterSizes() {
    for (var i = 0; i < this.beerFilterSizes.length; i++) {
      this.beerFilterSizes[i].selected = this.selectedAllBeerFilterSizes;
    }
  }

  checkIfAllBeerFilterSizesSelected() {
    this.selectedAllBeerFilterSizes = this.beerFilterSizes.every(function (item: any) {
      return item.selected == true;
    })
  }

  /**
   * Code for Beer Filter Price
   */

  createBeerFilterPrices(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[0].ListPrice.length; i++) {
      this.beerFilterPrices.push({
        name: storeGetHomeResponce.StoreFilters[0].ListPrice[i].TypeName,
        selected: false,
        id: storeGetHomeResponce.StoreFilters[0].ListType[i].SizeId

      });
    }
    console.log("beerFilterPrices list is ==>", this.beerFilterPrices)
  }

  selectAllbeerFilterPrices() {
    for (var i = 0; i < this.beerFilterPrices.length; i++) {
      this.beerFilterPrices[i].selected = this.selectedAllBeerFilterPrices;
    }
  }

  checkIfAllBeerFilterPricesSelected() {
    this.selectedAllBeerFilterPrices = this.beerFilterPrices.every(function (item: any) {
      return item.selected == true;
    })
  }


  /**
   * Code for Liquor Filter Type
   */

  createLiquorFilterType(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[1].ListType.length; i++) {
      this.liquorFilterTypes.push({
        name: storeGetHomeResponce.StoreFilters[1].ListType[i].TypeName,
        selected: false
      });
    }
    console.log("LiquorFilterTypes list is ==>", this.liquorFilterTypes)
  }

  selectAllLiquorFilterTypes() {
    for (var i = 0; i < this.liquorFilterTypes.length; i++) {
      this.liquorFilterTypes[i].selected = this.selectedAllLiquorFilterTypes;
    }
  }

  checkIfAllLiquorFilterTypesSelected() {
    this.selectedAllLiquorFilterTypes = this.liquorFilterTypes.every(function (item: any) {
      return item.selected == true;
    })
  }

  /**
   * Code for Liquor Filter Size
   */

  createLiquorFilterSizes(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[2].ListSize.length; i++) {
      this.liquorFilterSizes.push({
        name: storeGetHomeResponce.StoreFilters[2].ListSize[i].UnitSize,
        selected: false
      });
    }
    console.log("liquorFilterSizes list is ==>", this.liquorFilterSizes)
  }

  selectAllLiquorFilterSizes() {
    for (var i = 0; i < this.liquorFilterSizes.length; i++) {
      this.liquorFilterSizes[i].selected = this.selectedAllLiquorFilterSizes;
    }
  }

  checkIfAllLiquorFilterSizesSelected() {
    this.selectedAllLiquorFilterSizes = this.liquorFilterSizes.every(function (item: any) {
      return item.selected == true;
    })
  }

  /**
   * Code for liquor Filter Price
   */

  createLiquorFilterPrices(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[0].ListPrice.length; i++) {
      this.liquorFilterPrices.push({
        name: storeGetHomeResponce.StoreFilters[0].ListPrice[i].TypeName,
        selected: false
      });
    }
    console.log("liquorFilterPrices list is ==>", this.liquorFilterPrices)
  }

  selectAllLiquorFilterPrices() {
    for (var i = 0; i < this.liquorFilterPrices.length; i++) {
      this.liquorFilterPrices[i].selected = this.selectedAllLiquorFilterPrices;
    }
  }

  checkIfAllLiquorFilterPricesSelected() {
    this.selectedAllLiquorFilterPrices = this.liquorFilterPrices.every(function (item: any) {
      return item.selected == true;
    })
  }


  /**
   * Code for Wine Filter Type
   */

  createWineFilterType(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[0].ListType.length; i++) {
      this.wineFilterTypes.push({
        name: storeGetHomeResponce.StoreFilters[0].ListType[i].TypeName,
        selected: false
      });
    }
    console.log("wineFilterTypes list is ==>", this.wineFilterTypes)
  }

  selectAllWineFilterTypes() {
    for (var i = 0; i < this.wineFilterTypes.length; i++) {
      this.wineFilterTypes[i].selected = this.selectedAllWineFilterTypes;
    }
  }

  checkIfAllWineFilterTypesSelected() {
    this.selectedAllWineFilterTypes = this.wineFilterTypes.every(function (item: any) {
      return item.selected == true;
    })
  }

  /**
   * Code for Wine Filter Size
   */

  createWineFilterSizes(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[0].ListSize.length; i++) {
      this.wineFilterSizes.push({
        name: storeGetHomeResponce.StoreFilters[0].ListSize[i].UnitSize,
        selected: false
      });
    }
    console.log("wineFilterSizes list is ==>", this.wineFilterSizes)
  }

  selectAllWineFilterSizes() {
    for (var i = 0; i < this.wineFilterSizes.length; i++) {
      this.wineFilterSizes[i].selected = this.selectedAllWineFilterSizes;
    }
  }

  checkIfAllWineFilterSizesSelected() {
    this.selectedAllWineFilterSizes = this.wineFilterSizes.every(function (item: any) {
      return item.selected == true;
    })
  }

  /**
   * Code for Beer Filter Price
   */

  createWineFilterPrices(storeGetHomeResponce) {
    for (let i = 0; i < storeGetHomeResponce.StoreFilters[0].ListPrice.length; i++) {
      this.wineFilterPrices.push({
        name: storeGetHomeResponce.StoreFilters[0].ListPrice[i].TypeName,
        selected: false
      });
    }
    console.log("wineFilterPrices list is ==>", this.wineFilterPrices)
  }

  selectAllwineFilterPrices() {
    for (var i = 0; i < this.wineFilterPrices.length; i++) {
      this.wineFilterPrices[i].selected = this.selectedAllWineFilterPrices;
    }
  }

  checkIfAllWineFilterPricesSelected() {
    this.selectedAllWineFilterPrices = this.wineFilterPrices.every(function (item: any) {
      return item.selected == true;
    })
  }

  /**
   * Filter beer Function call
   */

  filterBeer() {
    console.log("filterBeer function call==>");
    // filter selected Type Ids
    let selectedTypeIds = [];
    for (var key in this.beerFilterTypes) {
      var obj = this.beerFilterTypes[key];
      if (obj.selected == true) {
        selectedTypeIds.push(obj.id)
      }

    }

    // filter selected Type Ids
    let selectedSizeIds = [];
    for (var key in this.beerFilterSizes) {
      var obj = this.beerFilterSizes[key];
      if (obj.selected == true) {
        selectedSizeIds.push(obj.id)
      }

    }

    // filter selected Type Ids
    let selectedPriceIds = [];
    for (var key in this.beerFilterPrices) {
      var obj = this.beerFilterPrices[key];
      if (obj.selected == true) {
        selectedPriceIds.push(obj.id)
      }

    }

    this.router.navigate(['/home', { typeIds: selectedTypeIds, sizeIds: selectedSizeIds, priceIds: selectedPriceIds  }])

  }

  /**
   * Filter beer Function call
   */

  filterLiquor() {
    console.log("filterLiquor function call==>")
  }

  /**
   * Filter beer Function call
   */

  filterWine() {
    console.log("filterWine function call==>")
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




