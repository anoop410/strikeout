import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HomeComponent } from './Pages/home/home.component';
import { SportsComponent } from './Pages/sports/sports.component';
import { HeaderComponent } from './Common/header/header.component';
import { FooterComponent } from './Common/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SportDetailsComponent } from './Pages/sport-details/sport-details.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SafePipe } from './pipes/safe.pipe';
import { BookingComponent } from './Pages/booking/booking.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MyProfileComponent } from './Pages/my-profile/my-profile.component';
import { MyBookingsComponent } from './Pages/my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SportsComponent,
    HeaderComponent,
    FooterComponent,
    SportDetailsComponent,
    SafePipe,
    BookingComponent,
    MyProfileComponent,
    MyBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    CarouselModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
