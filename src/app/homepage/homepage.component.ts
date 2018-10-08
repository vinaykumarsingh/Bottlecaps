import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { product } from './requestInterface';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as global from '../global';
declare var $;
import { LandingproductComponent } from '../landingproduct/landingproduct.component';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('selectedvalue') selectedvalue: ElementRef;
  @Input() landingproduct: LandingproductComponent;

  selectedValues: string[] = [];
  relatedpage: number;
  productsList: product[] = [];
  countries: any;
  CategoryId: any;
  selected = 1;
  pages: Array<number> = [];
  userid: any;
  sessionid: any;
  categorytype: boolean;
  country: boolean;
  region: boolean;
  varietal: boolean;
  listtypes: any;
  storefilters: Array<any> = [];
  carousalfirstImage: any;
  eventList: any;
  hometitle: any;
  storegetList: any;
  id: any;
  favorite: any;
  fid: any;
  totalcount: number;
  custermerinfo: any;
  carttotal: void;
  totalcountpage: number;
  searchvalue: number;
  listsizes: any[];
  pagesize: any;
  updateicon: boolean;
  size: boolean;
  sizeid: any;
  typeid: any;
  countryid: any;
  regionid: any;
  filterid: any;
  checkBoxValue: boolean;
  filtercountryid: any;
  filtertypeid: any;
  varietalid: any;

  maxprice: number;
  minprice: number;
  rangeValues: number[] = [];
  favoriteid: any;
  listcountries: any;
  pagefrom: number = 12;
  pageto: number = 1;
  myForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  selectedtypeItems = [];
  selectedvarietalItems = [];
  selectedcountryItems = [];
  selectedregionItems = [];
  selectedsizeItems = [];
  dropdownSettings = {};
  typedropdownSettings: {};
  sizedropdownSettings: {};
  countrydropdownSettings: {};
  varietaldropdownSettings: {};
  regiondropdownSettings: {};
  countrylist: any[];
  regionresult: any[];
  b: Array<any> = [];
  varietalresult: any[];
  v: Array<any> = [];
  dropdownList1: any;
  filterParams: any

  template: string = `<img src="/assets/Images/assets/loading_icon.gif" />`
  constructor(private spinnerService: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router, private appService: AppService, private httpclient: HttpClient) { 
    // this.activatedRoute.snapshot.params;
    this.filterParams = this.activatedRoute.snapshot.params;
    console.log("filterParams", this.filterParams);
  }

  users: object;

  ngOnInit() {

    //     this.filterid=this.activatedRoute.snapshot.queryParams['id'];
    //   this.CategoryId=this.activatedRoute.snapshot.queryParams['id'];
    //  if(this.activatedRoute.snapshot.queryParams['id']==1){

    //       this.country = false;
    //       this.region = false;
    //       this.categorytype=true;
    //       this.size = true;
    //       this.varietal=false;
    //       this.pages=[];
    //       this.GetProductDetailsByPost();

    //      }
    // this.GetProductDetailsByPost();

    $('ul.sidebar-submenu li a').click(function () {

      $(this).addClass("active").siblings().removeClass("active");
    });


    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 800);
      return false;
    });

    this.typedropdownSettings = {

      singleSelection: false,
      idField: 'TypeId',
      textField: 'TypeName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.sizedropdownSettings = {
      singleSelection: false,
      idField: 'SizeId',
      textField: 'UnitSize',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.countrydropdownSettings = {
      singleSelection: false,
      idField: 'CountryId',
      textField: 'CountryName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.varietaldropdownSettings = {
      singleSelection: false,
      idField: 'VarietalId',
      textField: 'VarietalName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.regiondropdownSettings = {
      singleSelection: false,
      idField: 'RegionId',
      textField: 'RegionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.storegethome();
    //this.categoryclick(this.id);
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');

    if (this.activatedRoute.snapshot.queryParams['value'] == "") {
      this.pagesize = "12"
      this.pages = [];
      this.topnav();
    } else {
      this.pagesize = "100"
      this.pages = [];
      this.topnav();
    }
    $.sidebarMenu($('.sidebar-menu'));
  }


  onItemSelect(item: any) {
    var typenames = this.selectedtypeItems.map(function (item) {
      return item['TypeId'];
    });
    console.log(varietalnames)
    this.varietalresult = this.dropdownList1.filter((o) => typenames.includes(+o.TypeId));
    console.log(this.varietal);
    this.v = []
    for (var i = 0; i < this.varietalresult.length; i++) {

      this.v = this.v.concat(this.varietalresult[i].ListVarietal)

    }
    console.log(this.v)
    this.typeid = typenames.toString();
    this.GetProductDetailsByPost();

    var varietalnames = this.selectedvarietalItems.map(function (item) {
      return item['VaritalId'];
    });

    this.varietalid = varietalnames.toString();
    this.GetProductDetailsByPost();

    var countrynames = this.selectedcountryItems.map(function (item) {
      return item['CountryId'];
    });
    this.regionresult = this.countrylist.filter((o) => countrynames.includes(+o.CountryId));

    this.b = []
    for (var i = 0; i < this.regionresult.length; i++) {

      this.b = this.b.concat(this.regionresult[i].ListRegions)

    }
    console.log(this.b)
    this.countryid = countrynames.toString();
    this.GetProductDetailsByPost();

    var regionnames = this.selectedregionItems.map(function (item) {
      return item['RegionId'];
    });
    this.regionid = regionnames.toString();
    this.GetProductDetailsByPost();

    var sizenames = this.selectedsizeItems.map(function (item) {
      return item['SizeId'];
    });
    this.sizeid = sizenames.toString();
    this.GetProductDetailsByPost();
  }

  onSelectAll(item: any) {
    var typenames = this.selectedtypeItems.map(function (item) {
      return item['TypeId'];
    });
    console.log(varietalnames)
    this.varietalresult = this.dropdownList1.filter((o) => typenames.includes(+o.TypeId));
    console.log(this.varietal);
    this.v = []
    for (var i = 0; i < this.varietalresult.length; i++) {

      this.v = this.v.concat(this.varietalresult[i].ListVarietal)

    }
    console.log(this.v)
    this.typeid = typenames.toString();
    this.GetProductDetailsByPost();

    var varietalnames = this.selectedvarietalItems.map(function (item) {
      return item['VaritalId'];
    });

    this.varietalid = varietalnames.toString();
    this.GetProductDetailsByPost();

    var countrynames = this.selectedcountryItems.map(function (item) {
      return item['CountryId'];
    });
    this.regionresult = this.countrylist.filter((o) => countrynames.includes(+o.CountryId));

    this.b = []
    for (var i = 0; i < this.regionresult.length; i++) {

      this.b = this.b.concat(this.regionresult[i].ListRegions)

    }
    console.log(this.b)
    this.countryid = countrynames.toString();
    this.GetProductDetailsByPost();

    var regionnames = this.selectedregionItems.map(function (item) {
      return item['RegionId'];
    });
    this.regionid = regionnames.toString();
    this.GetProductDetailsByPost();

    var sizenames = this.selectedsizeItems.map(function (item) {
      return item['SizeId'];
    });
    this.sizeid = sizenames.toString();
    this.GetProductDetailsByPost();
  }
  onItemDeSelect(items: any) {

    var typenames = this.selectedtypeItems.map(function (item) {
      return item['TypeId'];
    });
    console.log(varietalnames)
    this.varietalresult = this.dropdownList1.filter((o) => typenames.includes(+o.TypeId));
    console.log(this.varietal);
    this.v = []
    for (var i = 0; i < this.varietalresult.length; i++) {

      this.v = this.v.concat(this.varietalresult[i].ListVarietal)

    }
    console.log(this.v)
    this.typeid = typenames.toString();
    this.GetProductDetailsByPost();

    var varietalnames = this.selectedvarietalItems.map(function (item) {
      return item['VaritalId'];
    });
    this.varietalid = varietalnames.toString();
    this.GetProductDetailsByPost();

    var countrynames = this.selectedcountryItems.map(function (item) {
      return item['CountryId'];
    });
    this.regionresult = this.countrylist.filter((o) => countrynames.includes(+o.CountryId));

    this.b = []
    for (var i = 0; i < this.regionresult.length; i++) {

      this.b = this.b.concat(this.regionresult[i].ListRegions)

    }
    this.countryid = countrynames.toString();
    console.log(countrynames);
    this.GetProductDetailsByPost();

    var regionnames = this.selectedregionItems.map(function (item) {
      return item['RegionId'];
    });

    this.regionid = regionnames.toString();
    this.GetProductDetailsByPost();

    var sizenames = this.selectedsizeItems.map(function (item) {
      return item['SizeId'];
    });
    this.sizeid = sizenames.toString();
    this.GetProductDetailsByPost();

  }


  /* End NgOninit */
  GetProductDetailsByPost() {
    if (localStorage.getItem('EmailId') == null && this.filterParams.constructor !== Object) {
      let body: any;
      body = {
        EmailId: "",
        Password: "",
        LoginType: "B",
        AppVersion: "8.5",
        DeviceId: "W",
        DeviceType: "W",
        AppId: 10002,
        StoreId: 10002
      }
      this.appService.postdetails(global.baseUrl + 'Login/LoginCustomer', body).subscribe(Response => {
        if (Response.IsAccess == true && this.filterParams.constructor !== Object) {
          console.log(Response);
          localStorage.setItem('StoreId', Response.StoreId);
          localStorage.setItem('DeviceId', Response.DeviceId);
          localStorage.setItem('AppId', Response.AppId);
          localStorage.setItem('DeviceType', Response.DeviceType);
          localStorage.setItem('IsAccess', Response.IsAccess);
          localStorage.setItem('SessionId', Response.SessionId);
          localStorage.setItem('UserId', Response.UserId);
          let ReqObject1: any;
          ReqObject1 = {
            StoreId: 10002,

            PageSize: this.pagesize,

            PageNumber: this.selected,

            IsClub: 0,

            KeyWord: this.searchvalue,

            CategoryId: this.CategoryId,

            RegionId: this.regionid,

            TypeId: this.typeid,

            VaritalId: this.varietalid,

            CountryId: this.countryid,

            SizeId: this.sizeid,

            SessionId: localStorage.getItem('SessionId'),

            UserId: localStorage.getItem('UserId'),

            AppId: 10002,

            IsFavorite: false,

            IsFeatured: 1

          }
          this.spinnerService.show();
          this.appService.postdetails(global.baseUrl + 'Product/ProductGetList', ReqObject1).subscribe(Response => {

            if (Response) {
              console.log(Response);

              this.productsList = Response.ListProduct;
              this.spinnerService.hide();
              console.log(this.productsList);
              this.totalcount = Response.TotalCount;
              this.rangeValues.push(Response.MinimumPriceDisplay);
              this.rangeValues.push(Response.MaximumPriceDisplay);
              console.log(this.minprice);

              this.totalcountpage = this.totalcount / 12;
              this.pages = [];
              for (let i = 1; i <= this.totalcountpage; i++) {
                this.pages.push(i)
              }

            } else {
              alert("something went wrong at server");
            }

          });
        }
        else {
          alert("something went wrong at server");
        }
      });
    } 
    else if( localStorage.getItem('EmailId') == null && this.filterParams.constructor === Object) {

      let ReqObject: any;
      ReqObject = {
        StoreId: 10002,

        PageSize: this.pagesize,

        PageNumber: this.selected,

        IsClub: 0,

        KeyWord: this.searchvalue,

        CategoryId: this.CategoryId,

        RegionId: this.regionid,

        TypeId: this.filterParams.typeIds,

        VaritalId: this.varietalid,

        CountryId: this.countryid,

        SizeId: this.filterParams.sizeIds,

        SessionId: localStorage.getItem('SessionId'),

        UserId: localStorage.getItem('UserId'),

        AppId: 10002,

        IsFavorite: false,

        IsFeatured: 1

      }
      this.spinnerService.show();
      this.appService.postdetails(global.baseUrl + 'Product/ProductGetList', ReqObject).subscribe(Response => {

        if (Response) {
          console.log(Response);

          this.productsList = Response.ListProduct;
          this.spinnerService.hide();
          console.log(this.productsList);
          this.totalcount = Response.TotalCount;
          this.minprice = Response.MinimumPriceDisplay;
          this.maxprice = Response.MaximumPriceDisplay;
          console.log(this.minprice);

          this.totalcountpage = this.totalcount / 12;
          this.pages = [];
          for (let i = 1; i <= this.totalcountpage; i++) {
            this.pages.push(i)
          }

        } else {
          alert("something went wrong at server");
        }

      });
    }
    else {
      let ReqObject: any;
      ReqObject = {
        StoreId: 10002,

        PageSize: this.pagesize,

        PageNumber: this.selected,

        IsClub: 0,

        KeyWord: this.searchvalue,

        CategoryId: this.CategoryId,

        RegionId: this.regionid,

        TypeId: this.typeid,

        VaritalId: this.varietalid,

        CountryId: this.countryid,

        SizeId: this.sizeid,

        SessionId: localStorage.getItem('SessionId'),

        UserId: localStorage.getItem('UserId'),

        AppId: 10002,

        IsFavorite: false,

        IsFeatured: 1

      }
      this.spinnerService.show();
      this.appService.postdetails(global.baseUrl + 'Product/ProductGetList', ReqObject).subscribe(Response => {

        if (Response) {
          console.log(Response);

          this.productsList = Response.ListProduct;
          this.spinnerService.hide();
          console.log(this.productsList);
          this.totalcount = Response.TotalCount;
          this.minprice = Response.MinimumPriceDisplay;
          this.maxprice = Response.MaximumPriceDisplay;
          console.log(this.minprice);

          this.totalcountpage = this.totalcount / 12;
          this.pages = [];
          for (let i = 1; i <= this.totalcountpage; i++) {
            this.pages.push(i)
          }

        } else {
          alert("something went wrong at server");
        }

      });
    }
  }
  addtocart(id) {
    // console.log(id);
    let addcart: any;
    addcart = {

      StoreId: 10002,
      UserId: localStorage.getItem('UserId'),
      SessionId: localStorage.getItem('SessionId'),
      AppId: 10002,
      PID: id,
      CartId: 0,
      Quantity: 2
    }

    //  console.log(addcart)
    this.appService.postdetails(global.baseUrl + 'Cart/CartAddItem', addcart)
      .subscribe(Response => {
        if (Response.Remark == "Only -1 quantity left" || Response.Quantity === 0 || Response.Quantity == -1) {
          alert("Out Of Stock");
        }
        else {

          this.GetProductDetailsByPost();
        }

      });

  }
  storegethome() {
    let StoreObject: any;
    StoreObject = {
      StoreId: 10002,
      SessionId: this.sessionid,
      UserId: this.userid,
      AppId: 10002,
      IsFeatureProduct: true
    }

    //console.log(StoreObject);
    this.appService.postdetails(global.baseUrl + 'Store/StoreGetHome', StoreObject)
      .subscribe(Response => {
        if (Response) {

          this.countrylist = Response.StoreFilters[2].ListCountries;

          console.log(this.countrylist);
          this.dropdownList = Response.StoreFilters.ListType;
          this.dropdownList1 = Response.StoreFilters[2].ListType;
          console.log(this.dropdownList1)
          this.storegetList = Response.HomeList;
          this.hometitle = Response.HomeTitle;
          this.eventList = Response.EventList;
          this.storefilters = Response.StoreFilters;
          //  this.storefilters.forEach(data => {
          //     this.listcountries.push(data.ListCountries);
          //     console.log(this.listcountries);
          //   });
          this.listtypes = Response.StoreFilters[1].ListType;
          this.custermerinfo = Response.CustomerInfo;
          if (this.eventList.length == "") {
            this.eventList = this.staticBanners;
            this.carousalfirstImage = this.eventList[0].EventLargeImage;
            //  console.log(this.carousalfirstImage);
            this.storefilters = Response.StoreFilters;
            // this.storefilters.forEach(data => {
            //   this.listcountries.push(data.ListCountries);
            //   console.log(this.listcountries);
            // });
            //this.listtypes =Response.StoreFilters[1].ListType;

          }
          else {
            this.carousalfirstImage = this.eventList[0].EventLargeImage;
            this.storefilters = Response.StoreFilters;
            this.listtypes = Response.StoreFilters[1].ListType;
          }

        }
        else {
          alert("something went wrong at server");
        }

      });
  }

  // clearsearch(){
  //   // this.router.navigate(['home/'], { queryParams: { id:id,value:""} });
  //    this.router.navigate(['/']);
  // }

  ProductClick(id) {
    this.pages = [];
    var pagevalue = this.selectedvalue.nativeElement.value;
    this.relatedpage = ++pagevalue;
    this.router.navigate(['/product', id, this.relatedpage, this.CategoryId]);
  }

  onChange(_selectedvalue) {
    this.selected = this.selectedvalue.nativeElement.value;
    this.pagefrom = this.selected * 12;
    this.pageto = this.pagefrom - 12;
    //  console.log(this.pagefrom);
    this.GetProductDetailsByPost();
  }


  onChangeFilter(id: number, isChecked: boolean) {
    const filterFormArray = <FormArray>this.myForm.controls.ids;
    console.log(filterFormArray);
    if (isChecked) {
      filterFormArray.push(new FormControl(id));
      console.log(filterFormArray);
    } else {
      let index = filterFormArray.controls.findIndex(x => x.value == id)
      filterFormArray.removeAt(index);
    }
  }


  categoryclick(id) {
    this.filterid = id
    this.CategoryId = id;
    //  if(id==1 || this.activatedRoute.snapshot.queryParams[id]==1)
    if (id == 1 || this.activatedRoute.snapshot.queryParams[id] == 1) {
      this.country = false;
      this.region = false;
      this.categorytype = true;
      this.size = true;
      this.varietal = false;
      this.pages = [];
      this.GetProductDetailsByPost();

    }


    if (id == 2 || this.activatedRoute.snapshot.queryParams[id] == 2) {
      this.country = false;
      this.region = false;
      this.categorytype = true;
      this.varietal = false;
      this.size = true;
      this.pages = [];
      this.GetProductDetailsByPost();
    }

    if (id == 3 || this.activatedRoute.snapshot.queryParams[id] == 3) {
      this.categorytype = true;
      this.varietal = true;
      this.country = true;
      this.region = true;
      this.size = true;
      this.pages = [];
      this.GetProductDetailsByPost();
    }

    if (id == 4 || this.activatedRoute.snapshot.queryParams[id] == 4) {
      this.country = false;
      this.region = false;
      this.size = false;
      this.categorytype = false;
      this.varietal = false;
      this.pages = [];
      this.GetProductDetailsByPost();
    }

  }

  // productsize(id)
  // {
  //  this.sizeid=id;
  //  this.GetProductDetailsByPost();
  // }

  // producttype(id)
  // {
  //   console.log(id);
  //   this.typeid=id;
  //   this.filtertypeid=id;
  //   this.GetProductDetailsByPost();
  // }

  // listvarietal(id)
  // {
  // this.varietalid=id;
  // this.GetProductDetailsByPost();
  // }

  // productcountry(id)
  // {
  //  this.countryid=id;
  //  this.filtercountryid=id;
  //  this.GetProductDetailsByPost();
  // }

  // productregion(id)
  // {
  //   this.regionid=id;
  //   this.GetProductDetailsByPost();
  // }

  favoriteadd(pid, favorite) {
    this.favoriteid = pid;
    console.log(pid);
    let addfavorite: any;
    addfavorite = {
      StoreId: 10002,
      UserId: localStorage.getItem('UserId'),
      SessionId: localStorage.getItem('SessionId'),
      AppId: 10002,
      PID: pid,
      FavoriteStatus: favorite
    }

    console.log(addfavorite);
    this.appService.postdetails(global.baseUrl + 'Product/FavoriteProductUpdate', addfavorite)
      .subscribe(Response => {
        if (Response) {
          this.favorite = Response;
          this.GetProductDetailsByPost();
          this.pages = [];
          // console.log( this.favorite);
          // alert("sucess");
        }
        else {
          alert("something went wrong at server");
        }

      });

  }

  staticBanners = [
    {
      "EventLargeImage": "http://liquorapps.com/Images/EventImgLarge/180577c2-08d5-4b34-9332-5e88f1ddbe82.png"
    }
    // {
    //   "EventLargeImage":"http://liquorapps.com/Images/EventImgLarge/180577c2-08d5-4b34-9332-5e88f1ddbe82.png"
    // }
  ]
  topnav() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.CategoryId = params.id;
        this.searchvalue = params.value;
        // console.log(this.CategoryId);
        this.pages = [];
        this.GetProductDetailsByPost();
      });


  }


  //   searchproduct()
  //   {
  //     this.activatedRoute.params.subscribe(params => {
  //       this.searchvalue= +params['value'];
  //     this.GetProductDetailsByPost();
  //   });

  // }

  gottoHome() {
    this.router.navigate(['/']);
  }
  gotorecipes() {
    this.router.navigate(['/recipes']);
  }

}




