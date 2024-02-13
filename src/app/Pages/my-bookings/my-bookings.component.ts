import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/Services/api.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit{

  userDetails: any;
  allBookings: any = [];

  constructor(public apiService: ApiService, public loader: LoaderService, public router: Router, private fb: FormBuilder, private modalService: BsModalService){}
  ngOnInit(): void {
    let user: any = localStorage.getItem("userInfo");
    this.userDetails = JSON.parse(user);
    this.getBookings();
  }

  getBookings(){
    let Data = {
      user_id: this.userDetails?.id
    }
    this.apiService.getMyBookings(Data).subscribe({
      next:(response) => {
        console.log('response',response)
        let res: any = response;
        this.allBookings = res.data;
      },
      error:(error)=>{}
    })
  }

}
