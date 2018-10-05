import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, ResponseContentType } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AppService {

  constructor(private http:HttpClient) { }
  
  postdetails(url:string,userData:any)
          {
            
           return this.http.post(url,userData).map((response:Response)=>
         {
         return response;
         
         }).catch((error:Response)=>
         {
           return Observable.throw(error);
          });
         }
  
   getdetails(url:string)
   {
      return this.http.get(url)
       .map((response:Response)=>
       {
        
        return response;
              
              }).catch((error: Response)=>{
         
                 return Observable.throw(error);
              });
           
             }
          
   updateDetails(url:string,body:any)
             {
              
               return this.http.put(url,body)
               .map((response : Response)=>
             {
               return response;
             });
             }
  
   deleteDetails(url:string)
             {
              
               return this.http.delete(url)
               .map((response : Response)=>
             {
               return response;
             });
             }
  
  }
