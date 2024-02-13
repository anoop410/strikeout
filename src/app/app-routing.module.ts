import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './Pages/booking/booking.component';
import { HomeComponent } from './Pages/home/home.component';
import { MyBookingsComponent } from './Pages/my-bookings/my-bookings.component';
import { MyProfileComponent } from './Pages/my-profile/my-profile.component';
import { SportDetailsComponent } from './Pages/sport-details/sport-details.component';
import { SportsComponent } from './Pages/sports/sports.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "sports", component: SportsComponent},
  {path: "sport-details", component: SportDetailsComponent},
  {path: "booking", component: BookingComponent},
  {path: "my-profile", component: MyProfileComponent},
  {path: 'my-bookings', component: MyBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
