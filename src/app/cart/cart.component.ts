import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as global from '../global';
import { AppService } from '../app.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
    @ViewChild('selectedvalue') selectedvalue: ElementRef;
selectedValues: string[] = [];
  private totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  index: any;
  updateQuantity: Array<any> = [];
  quantity: number = 1;
  cartdetails:Array<any> = [];
  cartremoveItem: any;
  counter:any;
  quantity1: any;
  Cartupdate: any;
  userid: string;
  sessionid: string;
  cartitemid: any;
    cartdata: any;
    cartid: any;
    cartitemidget: string;
    cartidget: string;
    cartitem: any;
    Processdata: any;
    PID: any;
    getindex: any;
    cartdetails1: any;
    updatedcartitem: any[];
    template: string =`<img src="/assets/Images/assets/loading_icon.gif" />`
    selected: any;
    quantityorderd: Array<number> = [];

  constructor(private spinnerService:Ng4LoadingSpinnerService,private activatedRoute: ActivatedRoute, private appservice: AppService, private router: Router) { }

  ngOnInit() {
   
    this.userid = localStorage.getItem('UserId');
    this.sessionid = localStorage.getItem('SessionId');
    this.cartitemidget = localStorage.getItem('CartItemId');
    this.cartidget = localStorage.getItem('CartId');
   this.Getcartdetails();
    // console.log(this.index=this.activatedRoute.snapshot.params['id']);
    for (let i = 1; i <= 20; i++) 
    {
        this.quantityorderd.push(i)
      }

}
deliverytype:any;
pickup()
{
this.deliverytype='p';
console.log(this.deliverytype);
this.router.navigate(['/checkout'],{ queryParams: { deliverytype: this.deliverytype} });
}

delivery()
{
this.deliverytype='d';
console.log(this.deliverytype);
this.router.navigate(['/checkout'],{ queryParams: { deliverytype: this.deliverytype} });
}

  onChange(_selectedvalue){
    this.selected=this.selectedvalue.nativeElement.value;
 //  console.log(this.pagefrom);
    this.Getcartdetails();
  }

Getcartdetails(){
  let CartDetails: any;
  CartDetails = {
    StoreId: 10002,
    UserId: this.userid,
    SessionId: this.sessionid,
    AppId: 10002,
    CartId:0,
  }

 this.spinnerService.show(); 
  this.appservice.postdetails(global.baseUrl + 'Cart/CartGetDetail', CartDetails).subscribe(Response => {
  
    if (Response) {
      this.cartdetails = Response.ListCartItem;
      this.spinnerService.hide(); 
      this.cartitem =Response;
   //  console.log(this.cartitem)
  
    }

    else {
      alert("something went wrong at server");
    }
  });

}

decrement(i,quantity,CartItemId1,cartid1,pid1) {
  if (this.quantity > 0) {
   
    this.getindex=i;
  this.quantity1=--quantity;
  this.cartitemid=CartItemId1;
  this.cartid=cartid1;
  this.PID=pid1
  console.log(i,this.quantity1,CartItemId1,cartid1,pid1)
    this.updateCartDetails();
  }
  else {
    this.quantity;
    this.updateCartDetails();
  }
}

increment(i,quantity,CartItemId1,cartid1,pid1) {
    this.getindex=i;
  this.quantity1=++quantity;
  this.cartitemid=CartItemId1;
  this.cartid=cartid1;
  this.PID=pid1
  console.log(i,this.quantity1,CartItemId1,cartid1,pid1)
  this.updateCartDetails();

}


updateCartDetails()
{
console.log(this.quantity);

this.cartdetails;
this.updatedcartitem=[
    {
        CartItemId:this.cartdetails[this.getindex].CartItemId,
        UserId: this.cartdetails[this.getindex].UserId,
        StoreId: this.cartdetails[this.getindex].StoreId,
        AppId: this.cartdetails[this.getindex].AppId,
        CartId: this.cartdetails[this.getindex].CartId,
        PID: this.cartdetails[this.getindex].PID,
        Pack: this.cartdetails[this.getindex].Pack,
        ProductId: this.cartdetails[this.getindex].ProductId,
        ProductImage: this.cartdetails[this.getindex].ProductImage,
        ProductName: this.cartdetails[this.getindex].ProductName,
        UnitSize: this.cartdetails[this.getindex].UnitSize,
        Quantity:this.quantity1,
        UPC: this.cartdetails[this.getindex].UPC,
        SKU: this.cartdetails[this.getindex].SKU,
        CategoryId:this.cartdetails[this.getindex].CategoryId,
        TypeId: this.cartdetails[this.getindex].TypeId,
        VarietalId: this.cartdetails[this.getindex].VarietalId,
        UnitSizeId: this.cartdetails[this.getindex].UnitSizeId,
        CountryId: this.cartdetails[this.getindex].CountryId,
        RegionId: this.cartdetails[this.getindex].RegionId,
        Price: this.cartdetails[this.getindex].Price,
        PriceDisplay: this.cartdetails[this.getindex].PriceDisplay,
        OfferPrice: this.cartdetails[this.getindex].OfferPrice,
        OfferPriceDisplay:this.cartdetails[this.getindex].OfferPriceDisplay,
        FinalPrice: this.cartdetails[this.getindex].FinalPrice,
        FinalPriceDisplay: this.cartdetails[this.getindex].FinalPriceDisplay,
        TaxRate: this.cartdetails[this.getindex].TaxRate,
        OfferType:this.cartdetails[this.getindex].OfferType,
        QuantityOrdered: this.quantity1,
        Remark: this.cartdetails[this.getindex].Remark,
        ItemTotal: this.cartdetails[this.getindex].ItemTotal,
        ItemTotalDisplay: this.cartdetails[this.getindex].ItemTotalDisplay,
        FinalItemTotal: this.cartdetails[this.getindex].FinalItemTotal,
        FinalItemTotalDisplay: this.cartdetails[this.getindex].FinalItemTotalDisplay,
        ItemTotalSaving: this.cartdetails[this.getindex].ItemTotalSaving,
        ItemTotalSavingDisplay: this.cartdetails[this.getindex].ItemTotalSavingDisplay,
        ListDiscount: [
            {
                DiscountId: 1,
                StoreId: 0,
                DiscountType: "On-Sale",
                DiscountTitle: "On Sale",
                DiscountAmountDisplay: "$6.02",
                DiscountAmount: 6.02,
                DiscountDescription: "You save $6.02"
            }
        ]
    }
]

var res = this.cartdetails.map(obj => this.updatedcartitem.find(o => o.CartItemId === obj.CartItemId) || obj);

console.log(res);

  let Cartupdate: any;
  
  Cartupdate= {
    CartId: this.cartitem.CartId,
    SessionId:this.cartitem.SessionId,
    StoreId: this.cartitem.StoreId,
    UserId: this.cartitem.UserId,
    AppId: this.cartitem.AppId,
    ListCartItem:res,
    ListDiscount: [
        {
            DiscountId: 1,
            StoreId: 0,
            DiscountType: "On-Sale",
            DiscountTitle: "On Sale",
            DiscountAmountDisplay: "$6.02",
            DiscountAmount: 6.02,
            DiscountDescription: "You save $6.02"
        }
    ],
    ListCharge: [
        {
            StoreId: 10131,
            OrderId: 0,
            ChargeId: 1,
            ChargeType: "Tax",
            ChargeAmountDisplay: "$2.31",
            ChargeAmount: 2.31,
            ChargePercentage: 0,
            ChargeFlat: 0,
            ChargeTitle: "Tax"
        },
        {
            StoreId: 0,
            OrderId: 0,
            ChargeId: 7,
            ChargeType: "Tip For Driver",
            ChargeAmountDisplay: "$0.00",
            ChargeAmount: 0,
            ChargePercentage: 0,
            ChargeFlat: 0,
            ChargeTitle: "Tip"
        }
    ],
    CouponCode: "",
    OrderTypeId: 0,
    AddressId: 0,
    PaymentTypeId: 0,
    TipForDriver: 0,
    ListTipForDriver: [
        {
            Percentage: 5,
            TipAmount: 1.6,
            TipAmountDisplay: "$1.60",
            IsDeafault: false
        },
        {
            Percentage: 10,
            TipAmount: 3.2,
            TipAmountDisplay: "$3.20",
            IsDeafault: false
        },
        {
            Percentage: 15,
            TipAmount: 4.8,
            TipAmountDisplay: "$4.80",
            IsDeafault: false
        },
        {
            Percentage: 0,
            TipAmount: 0,
            TipAmountDisplay: "$0.00",
            IsDeafault: true
        }
    ],
    SubTotal: 32,
    SubTotalDisplay: "$32.00",
    TotalSavings: 6.02,
    TotalSavingsDisplay: "$6.02",
    TotalCharges: 2.31,
    TotalChargesDisplay: "$2.31",
    TotalValue: 28.29,
    TotalValueDisplay: "$28.29",
    SubTotalAfterDsicount: 25.98,
    SubTotalAfterDiscountDisplay: "$25.98",
    CartPaymentItemUser: {
        UserId: 10009425,
        StoreId: 10131,
        AppId: 0,
        PaymentTypeId: 0,
        UserProfileId: "",
        IsDefault: false,
        Credential1: "",
        Credential2: "",
        Credential3: ""
    },
    DoPDate: "",
    DoPTimeSlot: "",
    ListDoPTimeSlot: [
        {
            DoPDate: "8/10/2018",
            DoPSlot: "6:30AM - 8:30AM"
        },
        {
            DoPDate: "8/10/2018",
            DoPSlot: "8:30AM - 10:30AM"
        },
        {
            DoPDate: "8/10/2018",
            DoPSlot: "10:30AM - 12:30PM"
        },
        {
            DoPDate: "8/10/2018",
            DoPSlot: "12:30PM - 2:30PM"
        },
        {
            DoPDate: "8/10/2018",
            DoPSlot: "2:30PM - 4:30PM"
        },
        {
            DoPDate: "8/10/2018",
            DoPSlot: "4:30PM - 6:30PM"
        },
        {
            DoPDate: "8/11/2018",
            DoPSlot: "9:00AM - 11:00AM"
        },
        {
            DoPDate: "8/11/2018",
            DoPSlot: "11:00AM - 1:00PM"
        },
        {
            DoPDate: "8/11/2018",
            DoPSlot: "1:00PM - 3:00PM"
        },
        {
            DoPDate: "8/11/2018",
            DoPSlot: "3:00PM - 5:00PM"
        },
        {
            DoPDate: "8/11/2018",
            DoPSlot: "5:00PM - 7:00PM"
        },
        {
            DoPDate: "8/12/2018",
            DoPSlot: "9:00AM - 11:00AM"
        },
        {
            DoPDate: "8/12/2018",
            DoPSlot: "11:00AM - 1:00PM"
        },
        {
            DoPDate: "8/12/2018",
            DoPSlot: "1:00PM - 3:00PM"
        },
        {
            DoPDate: "8/12/2018",
            DoPSlot: "3:00PM - 5:00PM"
        },
        {
            DoPDate: "8/12/2018",
            DoPSlot: "5:00PM - 7:00PM"
        },
        {
            DoPDate: "8/14/2018",
            DoPSlot: "9:00AM - 11:00AM"
        },
        {
            DoPDate: "8/14/2018",
            DoPSlot: "11:00AM - 1:00PM"
        },
        {
            DoPDate: "8/14/2018",
            DoPSlot: "1:00PM - 3:00PM"
        },
        {
            DoPDate: "8/14/2018",
            DoPSlot: "3:00PM - 5:00PM"
        },
        {
            DoPDate: "8/14/2018",
            DoPSlot: "5:00PM - 7:00PM"
        },
        {
            DoPDate: "8/15/2018",
            DoPSlot: "9:00AM - 11:00AM"
        },
        {
            DoPDate: "8/15/2018",
            DoPSlot: "11:00AM - 1:00PM"
        },
        {
            DoPDate: "8/15/2018",
            DoPSlot: "1:00PM - 3:00PM"
        },
        {
            DoPDate: "8/15/2018",
            DoPSlot: "3:00PM - 5:00PM"
        },
        {
            DoPDate: "8/15/2018",
            DoPSlot: "5:00PM - 7:00PM"
        },
        {
            DoPDate: "8/16/2018",
            DoPSlot: "9:00AM - 11:00AM"
        },
        {
            DoPDate: "8/16/2018",
            DoPSlot: "11:00AM - 1:00PM"
        },
        {
            DoPDate: "8/16/2018",
            DoPSlot: "1:00PM - 3:00PM"
        },
        {
            DoPDate: "8/16/2018",
            DoPSlot: "3:00PM - 5:00PM"
        },
        {
            DoPDate: "8/16/2018",
            DoPSlot: "5:00PM - 7:00PM"
        }
    ],
    Remark: "",
    Profile: {
        FirstName: "dujj",
        LastName: "fyyu",
        ContactNo: "8686868686"
    },
    SuccessMessage: "",
    ErrorDetail: "",
    ErrorMessage: "",
    MessageType: "",
    MessageTitle: "",
    TextType: ""
}




  console.log(Cartupdate);

  
  this.appservice.postdetails(global.baseUrl + 'Cart/CartUpdate', Cartupdate).subscribe(Response => {
    if (Response) {
      this.Cartupdate = Response;

     // console.log(this.Cartupdate);
      // this.counter = this.cartdetails[0].Quantity;
      console.log(this.Cartupdate);
      this.Getcartdetails();
    
    }
    else {
      alert("something went wrong at server");
    }

  });
  this.Getcartdetails();

}


  myordersClick() {
    this.router.navigate(['/myorders']);
  }

  myaccount() {
    this.router.navigate(['/myaccount']);
  }

  checkoutClick() {
    this.router.navigate(['/checkout']);
  }


  removeItem(id,i) {
    console.log(id)
    let body: any;
    body = {
      StoreId: 10002,
      UserId: this.userid,
      SessionId:this.sessionid,
      AppId:10002,
      PId: id,
      CartId:0
    }
    this.appservice.postdetails(global.baseUrl + 'Cart/CartRemoveItem', body).subscribe(Response => {
      if (Response) {
        //this.cartremoveItem=Response.ListCartItem;
        console.log(Response);
        const index: number = i;
        if (index !== -1) {
            this.cartdetails.splice(index, 1);
        }  
      }
      else {
        alert("something went wrong at server");
      }

    });
  }

  gottoHome() {
    this.router.navigate(['/']);
  }


}
