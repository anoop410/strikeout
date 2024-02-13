import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  @ViewChild(ModalDirective, { static: true }) modal?: ModalDirective;
  allSports: any = [];
  selectedSport: any = [];
  dropdownSettings: any = {}
  dropdownList: Array<any> = [];
  selectedItems: any = [];
  myForm!:FormGroup;
  dropDownData: any;
  timeSlotData: any = [];
  selectedTimeItems: any = [];
  noOfHours: number = 0;
  courts: any = [];
  selectedCourts: any = [];
  isCartEmpty: boolean = true;
  cartItem: any = [];
  gameSelection: any = '';
  dateSelection: any = '';
  timeSelection: any = '';
  priceSelection: any = '';
  courtSelection: any = '';
  userDetails: any;
  QRCode: any = '';
  transactionId: any = '';
  modalRef?: BsModalRef;
  config = {
    animated: true
  };
  todayDate: any =  new Date();
  minDate!: Date;
  maxDate!: Date;

  paymentUserId: any;
  paymentSportsId: any;
  paymentCourtId: any;
  paymentSlotId: any;
  paymentBookingDate: any;
  paymentSlotStartTime: any;
  paymentSlotEndTime: any;
  paymentPrice: any;
  bookingHours: any = 0;

  cartDisable: boolean = true;

  constructor(public apiService: ApiService, public loader: LoaderService, public router: Router, private fb: FormBuilder, private modalService: BsModalService){

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem("userInfo");
    this.userDetails = JSON.parse(user);
    this.paymentUserId = this.userDetails?.id;
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      enableCheckAll: false,
      clearSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.myForm = this.fb.group({
      sport: [this.selectedItems],
      timeSlot: [this.selectedTimeItems],
      courts: [this.selectedCourts]
    });
    this.getAllSports();

  }

  get f() {
    return this.myForm.controls;
  }
  getSelectedSport(){
    let sport = localStorage.getItem("booking");
    let select = this.allSports.filter((item: any)=> item.id == sport);
    this.selectedSport = select[0];
    console.log('selectedSport',this.selectedSport);
  }

  getAllSports(){
    this.loader.showLoader();
    this.apiService.getAllSports().subscribe({
      next:(response: any)=>{
        console.log("response",response);
        this.allSports = response.data;
        this.allSports.forEach((x: any)=>{
          this.dropdownList.push({
            id: x.id, name: x.name
          });
        });
        this.dropDownData = this.dropdownList;
        this.getSelectedSport();
        this.loader.hideLoader();
      },
      error:(error)=>{
        console.log("Error Occured",error);
      },
      complete:()=>{}
    })
  }


  onItemSelect(item: any) {
    console.log('item',item);
    this.gameSelection = item;
    this.paymentSportsId = item.id;

    let slot: any = [];
    let court: any = [];
    //console.log('onItemSelect',item);
    let select = this.allSports.filter((sport: any)=> sport.id == item.id);
    this.selectedSport = select[0];
    console.log('this.selectedSport',this.selectedSport);

    this.selectedSport.courts.forEach((x: any)=>{
      court.push({id: x.id, name: x.court_name, slots: x.slots});
    });
    this.courts = court;
    console.log('this.courts',this.courts);
    if(this.paymentSportsId && this.paymentCourtId && this.paymentSlotId && this.paymentBookingDate && this.noOfHours > 0){
        this.cartDisable = false;
    }
  }

  onItemCourtSelect(item: any){
    let slot: any = [];
    //this.timeSlotData = [];
    console.log('onItemCourtSelect',item);
    this.paymentCourtId = item.id;
    this.courtSelection = item;
    // this.selectedSport.courts.forEach((x: any)=>{
    //   x.slots.forEach((y: any)=>{
    //   })
    // });
    this.timeSlotData = slot;
    if(this.paymentSportsId && this.paymentCourtId && this.paymentSlotId && this.paymentBookingDate && this.noOfHours > 0){
        this.cartDisable = false;
    }
  }

  onItemSlotSelect(item: any){
    console.log('onItemSlotSelect',item);
    this.timeSelection = item;
    this.paymentSlotId = item.id;
    if(this.paymentSportsId && this.paymentCourtId && this.paymentSlotId && this.paymentBookingDate && this.noOfHours > 0){
        this.cartDisable = false;
    }
  }

  onSelectAll(items: any) {
    console.log('onSelectAll',items);
  }

  handleMinus(){
    if(this.noOfHours <= 0){
      return;
    }
    this.noOfHours--;
  }

  newTimeSet: any = '';
  handlePlus(){
    this.noOfHours++;

    if(this.paymentSportsId && this.paymentCourtId && this.paymentSlotId && this.paymentBookingDate && this.noOfHours > 0){
      this.cartDisable = false;
    }
  }

  onDateValueChange(event: Date){
    let pricing: any = [];
    console.log('onDateValueChange',moment(event).format('dddd'));
    this.dateSelection = event;
    this.paymentBookingDate = moment(event).format('L');
    let day = moment(event).format('dddd');
    this.selectedSport.courts.forEach((x: any)=>{
      x.slots.forEach((y: any)=>{
        console.log('yy',y);
        if(y.week_day == day){
          y.price.forEach((z: any)=>{
            pricing.push({id: z.id, name: z.start_time+' - Rs.'+z.price, price: z.price});
          })
        }
      })
    });

    this.timeSlotData = pricing.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
    console.log('timeSlotData',this.timeSlotData);
    if(this.paymentSportsId || this.paymentCourtId || this.paymentSlotId || this.paymentBookingDate || this.bookingHours > 0){
        this.cartDisable = false;
    }
  }

  filteredData: any;
  totalPrice: any;
  addToCart(){
    this.cartItem = [];
    const currentTime = moment(this.timeSelection.name, 'hh:mm A');
    const newTime = currentTime.add(this.noOfHours, 'hours');
    let newTimeSet = newTime.format('hh:mm A');
    let oldTime = moment(this.timeSelection.name, ["h:mm A"]).format("hh:mm A");

    this.paymentSlotStartTime = this.timeSelection.name.split(" -")[0];
    this.paymentSlotEndTime = moment(this.timeSelection.name,'hh:mm:ss').add(this.noOfHours, 'hours').format('H:mm:ss');
    //paymentPrice: any;
    this.bookingHours = this.noOfHours;

    this.filteredData = this.timeSlotData.filter((item: any) => {
      let itemTime = this.convertTimeToInteger(item.name);
      let t1 = this.convertTimeToInteger(this.paymentSlotStartTime);
      let t2 = this.convertTimeToInteger(this.paymentSlotEndTime);
      //console.log(itemTime,t1,t2)
      return itemTime >= t1 && itemTime < t2;
    });

    this.totalPrice = this.filteredData.reduce((sum: any, item: any) => sum + parseInt(item.price, 10), 0);

    let timeSelection = this.timeSlotData.find((x: any)=> x.id == this.timeSelection.id);
    console.log('timeSelectiontimeSelection',timeSelection);
    this.cartItem.push({
      gameName: this.gameSelection.name,
      date: moment(this.dateSelection).format("LL"),
      time: oldTime+' - '+newTimeSet,
      price: this.totalPrice,
      court: this.courtSelection.name
    })
    console.log('this.cartItem',this.cartItem);
  }

  private convertTimeToInteger(time: string): number {
    // Remove colons and parse as integer
    return parseInt(time.replace(/:/g, ''), 10);
  }

  deleteCart(){
    this.cartItem = [];
    this.totalPrice = 0;
  }

  paymentModal(){
    let user: any = localStorage.getItem("userInfo");
    this.userDetails = JSON.parse(user);

    if(this.userDetails){
      this.apiService.getPaymentQRCode().subscribe({
        next:(res)=>{
          let payment: any = res;
          this.QRCode = payment.payment;
        },
        error:(error)=>console.log("Error",error)
      })
      this.modal?.show();
    }else{
      this.loader.openLoginPopup();
    }
  }

  transactionRequired: any = false;
  finalPayment(template: TemplateRef<void>){
    if(this.transactionId == ""){
      this.transactionRequired = true;
    }else{
      this.transactionRequired = false;
    }
    this.loader.showLoader();
    let Data = {
      user_id: this.userDetails.id,
      sports_id: this.paymentSportsId,
      court_id: this.paymentCourtId,
      slot_id: this.paymentSlotId,
      sport_booking_date: this.paymentBookingDate,
      slot_start_time: this.paymentSlotStartTime,
      slot_end_time: this.paymentSlotEndTime,
      price: this.totalPrice,
      booking_hours: this.bookingHours,
      transaction_id: this.transactionId
    }
    console.log('Data',Data);

    this.apiService.createBooking(Data).subscribe({
      next:(res: any)=>{
        console.log('res',res);
        this.loader.hideLoader();
      },
      error: (err: any)=>{
        console.log('error',err);
        this.loader.hideLoader();
      },
      complete: ()=>{
        this.modal?.hide();
        this.modalRef = this.modalService.show(template, this.config);
      }
    })
  }

  closeSucModal(){
    this.modalRef?.hide();
    this.router.navigate(['/sports']);
  }
  validateTransaction(){
    if(this.transactionId == ""  && this.transactionId.length == 0){
      this.transactionRequired = true;
    }else{
      this.transactionRequired = false;
    }
  }
}
