import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Subscription, take } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  rightSlot: any;
  leftSlot: any;
  constructor(private apiService: ApiService, private loaderService: LoaderService){}
  ngOnInit(): void {
    this.homePageCarousel();
  }

  homePageCarousel(){
    this.loaderService.showLoader();
    this.apiService.homePageCarousel().pipe(take(1)).subscribe({
      next : (res: any)=>{
        console.log('res',res)
        this.rightSlot = res.homepageSlots.find((x: any)=> x.slot_name === 'RightSlot');
        this.leftSlot = res.homepageSlots.find((x: any)=> x.slot_name === 'LeftSlot');
        console.log('rightSlot',this.rightSlot,this.leftSlot);
        this.loaderService.hideLoader();
      },
      error: (err: any)=>{
        this.loaderService.hideLoader();
        console.log('error',err)
      }
    })
  }
}
