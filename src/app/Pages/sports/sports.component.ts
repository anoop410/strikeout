import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { LoaderService } from 'src/app/Services/loader.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit{
  constructor(public apiService: ApiService, public loader: LoaderService, public router: Router){}
  allSports: any = [];
  ngOnInit(): void {
    this.getAllSports();
  }

  getAllSports(){
    this.loader.showLoader();
    this.apiService.getAllSports().subscribe({
      next:(response: any)=>{
        console.log("response",response);
        this.allSports = response.data;
        this.loader.hideLoader();
      },
      error:(error)=>{
        console.log("Error Occured",error);
      },
      complete:()=>{}
    })
  }

  getTime(time: any){
    return moment(time).format('h:mm a');
  }

  openSport(sport: any){
    localStorage.setItem('sport', sport.id);
    this.router.navigate(['/sport-details']);
  }
}
