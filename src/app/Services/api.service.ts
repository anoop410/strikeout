import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class YourInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userDetails: any;
  //baseUrl: any = 'http://localhost/sportshub_laravel/public/';
  baseUrl: any = 'https://strikeout.roboxautomation.com/';
  constructor(private http: HttpClient) {
    let user: any = localStorage.getItem('userInfo');
    this.userDetails = JSON.parse(user);
  }

  getAllSports(){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get(this.baseUrl+'api/getAllSports',{headers: headers});
  }

  getSelectedSports(body: any){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseUrl+'api/getSelectedSports',body,{headers: headers});
  }

  getUserLogin(body: any){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseUrl+'api/loginOtp',body,{headers: headers});
  }

  getUserLoginOTP(body: any){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseUrl+'api/checkLogin',body,{headers: headers});
  }

  getPaymentQRCode(){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseUrl+'api/getPaymentQR',{},{headers: headers});
  }

  homePageCarousel(){
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseUrl+'api/homePageCarousel',{},{headers: headers});
  }

  updateUserProfile(data: any){
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization' : 'Bearer '+this.userDetails?.access_token});
    return this.http.post(this.baseUrl+'api/updateProfile',data,{headers: headers});
  }

  createBooking(data: any){
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization' : 'Bearer '+this.userDetails?.access_token});
    return this.http.post(this.baseUrl+'api/createBooking',data,{headers: headers});
  }

  getMyBookings(data: any){
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization' : 'Bearer '+this.userDetails.access_token});
    return this.http.post(this.baseUrl+'api/getMyBookings',data,{headers: headers});
  }
}
