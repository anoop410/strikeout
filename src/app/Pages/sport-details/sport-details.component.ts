import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-sport-details',
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.scss']
})
export class SportDetailsComponent implements OnInit{
  allSports: any = [];
  constructor(public apiService: ApiService, public loader: LoaderService, public router: Router){}
  ngOnInit(): void {
    this.getSelectedSport();
  }

  getSelectedSport(){
    let selectedSport = localStorage.getItem('sport');
    this.loader.showLoader();
    let Data = {
      id: selectedSport
    }
    this.apiService.getSelectedSports(Data).subscribe({
      next:(response: any)=>{
        console.log("response",response);
        this.allSports = response.data[0];
        this.loader.hideLoader();
      },
      error:(error)=>{
        console.log("Error Occured",error);
      },
      complete:()=>{}
    })
  }

  bookNow(sport: any){
    localStorage.setItem('booking',sport.id)
    this.router.navigate(['/booking']);
  }
}
