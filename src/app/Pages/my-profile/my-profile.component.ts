import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit{


  profileForm!: FormGroup
  formSubmit: boolean = false;
  userDetails: any;
  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    let user: any = localStorage.getItem('userInfo');
    this.userDetails = JSON.parse(user);
    this.initForm();
  }

  initForm(){
    this.profileForm = this.fb.group({
      first_name: [this.userDetails?.first_name,[Validators.required]],
      last_name: [this.userDetails?.last_name,[Validators.required]],
      email: [this.userDetails?.email,[Validators.required, Validators.email]],
      mobile: [this.userDetails?.mobile, [Validators.required]],
      address: [this.userDetails?.address]
    })
  }

  get f(){
    return this.profileForm.controls;
  }

  firstNameRequired = false;
  lastNameRequired = false;
  emailRequired = false;
  mobileRequired = false;

  validateField(field: any){
    if(field == 'first_name'){
      //console.log('field',field, this.profileForm.controls['first_name'].errors);
      if(this.profileForm.controls['first_name'].errors != null){
        this.firstNameRequired = true;
      }else{
        this.firstNameRequired = false;
      }
    }else if(field == 'last_name'){
      if(this.profileForm.controls['last_name'].errors != null){
        this.lastNameRequired = true;
      }else{
        this.lastNameRequired = false;
      }
    }else if(field == 'email'){
      if(this.profileForm.controls['email'].errors != null){
        this.emailRequired = true;
      }else{
        this.emailRequired = false;
      }
    }else if(field == 'mobile'){
      if(this.profileForm.controls['mobile'].errors != null){
        this.mobileRequired = true;
      }else{
        this.mobileRequired = false;
      }
    }
  }

  profileUpdate: any;
  showAlert: boolean = false;
  updateForm(){
    this.formSubmit=true;
    if (this.profileForm.invalid){
      this.validateField('first_name');
      this.validateField('last_name');
      this.validateField('email');
      this.validateField('mobile');
      return;
    }
    console.log('error',this.profileForm.controls['first_name'].value);
    let Data = {
      id: this.userDetails.id,
      first_name:  this.profileForm.controls['first_name'].value,
      last_name:  this.profileForm.controls['last_name'].value,
      mobile:  this.profileForm.controls['mobile'].value,
      address:  this.profileForm.controls['address'].value,
    }

    this.apiService.updateUserProfile(Data).subscribe({
      next: (res: any) => {
        console.log('res',res);
        if(res.status == true){
          this.userDetails['first_name'] = this.profileForm.controls['first_name'].value;
          this.userDetails['last_name'] = this.profileForm.controls['last_name'].value
          this.userDetails['mobile'] = this.profileForm.controls['mobile'].value
          this.userDetails['address'] = this.profileForm.controls['address'].value
          //console.log('this.userDetails',this.userDetails);
          localStorage.setItem("userInfo",JSON.stringify(this.userDetails));
          this.showAlert = true;
          this.profileUpdate = {
            "show" : "show",
            "status" : "success",
            "message": res.message
          }
        }
      },
      error: (err: any) => {
        console.log('err',err);
      }
    })
  }

}
