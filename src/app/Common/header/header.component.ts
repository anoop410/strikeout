import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription, take } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @ViewChild(ModalDirective, { static: true }) modal?: ModalDirective;
  hideSlider: boolean = false;
  private subscription!: Subscription;
  loginForm!: FormGroup;
  showAlert: boolean = false;
  alert: any = {};
  showOTPBox: boolean = false;
  otp: any = '';
  loginDiv: boolean = true;
  userLoggedIn: boolean = false;
  userDetails: any;
  items: any = [
    {name: "My Profile", url: "/my-profile"},
    {name: "Bookings", url: "/my-bookings"}
  ];
  carousel: any = [];
  rightSlot: any = [];
  leftSlot: any = [];

  constructor(private loaderService: LoaderService,private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private apiService: ApiService){
    this.subscription = this.loaderService.loginState$.subscribe((state) => {
      this.modal?.show();
    });
  }

  ngOnInit() {
    let user: any = localStorage.getItem("userInfo");
    this.userDetails = JSON.parse(user);
    if(this.userDetails){
      this.userLoggedIn = true;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fullUrl = this.getFullUrl();
        console.log('Full URL:', fullUrl);
        if (fullUrl.includes('sports') || fullUrl.includes('sport-details') || fullUrl.includes('booking') || fullUrl.includes('my-profile')) {
          this.hideSlider = false;
        } else {
          this.hideSlider = true;
        }
      }
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp:['']
    });

    this.homePageCarousel();
  }

  get pf() {
    return this.loginForm.controls;
  }

  private getFullUrl(): string {
    const urlTree = this.router.createUrlTree([], { relativeTo: this.activatedRoute });
    const url = this.router.serializeUrl(urlTree);
    return window.location.origin + url;
  }

  showLoginModal(){
    this.modal?.show();
  }

  login(){
    this.loaderService.showLoader();
    let Data = {
      email : this.loginForm.controls['email'].value
    }
    this.apiService.getUserLogin(Data).subscribe({
      next:(response)=>{
        //console.log('response',response)
        this.loaderService.hideLoader();
        let res: any = response;
        if(res.success){
            this.userLoggedIn = true;
            this.showAlert = true;
            this.alert = {
              type: "success",
              head: "Well Done!",
              message: res.data.message
            }
            this.showOTPBox = true;
            setTimeout(()=>{
              this.showAlert = false;
            },5000);
        }else{
          this.showAlert = true;
          this.alert = {
            type: "danger",
            head: "Oh snap!",
            message: "Unable to login, Try again after sometime."
          }
          setTimeout(()=>{
            this.showAlert = false;
          },5000);
        }
      },
      error:(error)=>{
        this.loaderService.hideLoader();
        console.log('error',error.error.message.error);
        this.showAlert = true;
        this.alert = {
          type: "danger",
          head: "Oh snap!",
          message: error.error.message.error
        }
        setTimeout(()=>{
          this.showAlert = false;
        },5000);
      }
    })
  }

  loginOTP(){
    this.loaderService.showLoader();
    let Data = {
      email : this.loginForm.controls['email'].value,
      otp: this.loginForm.controls['otp'].value
    }
    this.apiService.getUserLoginOTP(Data).subscribe({
      next:(response)=>{
        this.loaderService.hideLoader();
        //console.log('response',response)
        let res: any = response;
        if(res.success){
            this.showAlert = true;
            this.alert = {
              type: "success",
              head: "Well Done!",
              message: "Login Successful"
            }
            setTimeout(()=>{
              this.showAlert = false;
            },5000);
            localStorage.setItem("userInfo",JSON.stringify(res.data));
            this.modal?.hide();
        }else{
          this.showAlert = true;
            this.alert = {
              type: "danger",
              head: "Oh snap!",
              message: "Unable to login, Try again after sometime."
            }
        }
      },
      error:(error)=>{
        this.loaderService.hideLoader();
        console.log('error',error.error.message.error);
        this.showAlert = true;
        this.alert = {
          type: "danger",
          head: "Oh snap!",
          message: error.error.message.error
        }
        setTimeout(()=>{
          this.showAlert = false;
        },5000);
      }
    })
  }

  logout(){
    localStorage.removeItem("userInfo");
    this.userDetails = '';
    this.userLoggedIn = false;
    this.router.navigate(['/']);
  }

  homePageCarousel(){
    this.apiService.homePageCarousel().pipe(take(1)).subscribe({
      next : (res: any)=>{
        console.log('res',res)
        this.carousel = res.carousel;
        // this.rightSlot = res.homepageSlots.find((x: any)=> x.slot_name === 'RightSlot');
        // this.leftSlot = res.homepageSlots.find((x: any)=> x.slot_name === 'LeftSlot');
        // console.log('rightSlot',this.rightSlot,this.leftSlot);
      },
      error: (err: any)=>{
        console.log('error',err)
      }
    })
  }
}
