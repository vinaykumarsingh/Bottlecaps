import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestMethod, ResponseContentType } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
@Injectable()
export class LoginService {
    private notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();
  constructor(private http:HttpClient) { }
  
postdetails(url:string,userData:any)
{
  
 return this.http.post(url,userData).map((response:Response)=>
{
    if (userData) {
        this.notify.next(userData);
      }
return response;

}).catch((error:Response)=>
{
 return Observable.throw(error);
});
}


logout(): void {
    this.notify.next('Sign In');
}
}