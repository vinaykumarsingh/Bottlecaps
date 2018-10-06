import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { SliderModule } from 'primeng/slider';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {  FacebookLoginProvider} from "angularx-social-login";
import { CollapsibleModule } from 'angular2-collapsible';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import {enableProdMode} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '../../node_modules/@angular/router';
import { LandingproductComponent } from './landingproduct/landingproduct.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { CartComponent } from "./cart/cart.component";
import { ProductComponent } from './product/product.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { LoginComponent } from './login/login.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import { AuthGuardService } from './AuthGuardService ';
import { LoginGuardService } from './login/LoginGuardService';
import{CheckoutComponent} from './checkout/checkout.component';
import { AddnewaddressComponent } from "./addnewaddress/addnewaddress.component";
import { LoginService } from './login/loginservice';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
enableProdMode();
let config = new AuthServiceConfig([
 
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("291215211474187")
  }
 
]);
export function provideConfig() {
  return config;
}


const routes:Routes=[
  {path: '', component: LandingproductComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'aboutus', component: AboutComponent},
  {path:'recipes', component: RecipesComponent},
  {path:'recipedetails', component: RecipedetailsComponent},
  {path:'recipedetails/:id', component: RecipedetailsComponent},
  {path:'cart', component: CartComponent},
  {path:'product', component: ProductComponent},
  {path:'product/:id', component: ProductComponent},
  {path:'product/:id/:ids/:cid', component: ProductComponent},
  {path:'forgot', component: ForgotpasswordComponent},
  {path:'addaddress', component: AddnewaddressComponent,canActivate: [AuthGuardService]},
  {path:'myorders', component: MyordersComponent,canActivate: [AuthGuardService]},
  {path:'login', component:LoginComponent,canActivate: [LoginGuardService] },
  {path:'checkout', component: CheckoutComponent,canActivate: [AuthGuardService]},
  {path:'myaccount', component: MyaccountComponent,canActivate: [AuthGuardService],

  children:[ 
   {path:'favorite', component: FavoritesComponent,canActivate: [AuthGuardService]}
      
  ]},

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingproductComponent,
    LoginComponent,
    HomepageComponent,
    AboutComponent,
    RecipesComponent,
    RecipedetailsComponent,
    CartComponent,
    ProductComponent,
    ForgotpasswordComponent,
    MyaccountComponent,
    MyordersComponent,
    FavoritesComponent,
    MainpageComponent,
    CheckoutComponent,
    AddnewaddressComponent
  ],

  imports: [
    BrowserModule,
   RouterModule.forRoot(routes,{useHash:true}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    // DialogModule,
    // ButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SliderModule,
     Ng4LoadingSpinnerModule.forRoot(),
     SocialLoginModule,
     CollapsibleModule,
     CheckboxModule,
     MultiSelectModule

  ],
  providers: [AppService,CookieService,AuthGuardService,LoginGuardService,LoginService,
    {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
