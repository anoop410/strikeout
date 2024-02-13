import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<boolean>();
  loaderState$ = this.loaderSubject.asObservable();

  private loginSubject = new Subject<boolean>();
  loginState$ = this.loginSubject.asObservable();

  constructor() { }

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    this.loaderSubject.next(false);
  }

  openLoginPopup(){
    this.loginSubject.next(true);
  }
}
