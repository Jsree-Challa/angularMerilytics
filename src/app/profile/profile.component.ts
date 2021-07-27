import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import {  APIResponseSingle, InternalError, Profile } from '../profile.modal';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: [''],
    middleName:[''],
    lastName: [''],
    email:[''],
    phone:[''],
    domain:[''],
    form:[''],
    role:[''],
    hr:[''],
    rsource:['']
  });


  constructor(
    private fb: FormBuilder,
    private profileService:ProfileService,
    private router: Router
    ) { }
 
  errorFirstName='';errorLastName='';errorEmail = '';errorPhone='';
  profiles: Profile[] = []  
  title = 'Merilytics';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  firstName = new FormControl('',[Validators.required]);
  middleName = new FormControl('');
  lastName = new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]);
  phone = new FormControl('',[Validators.required])
  domain= new FormControl('');
  form = new FormControl('');
  role= new FormControl('');
  rsource = new FormControl('');
  hr = new FormControl('');

  getErrorMessage() {
    let response :InternalError = {
      value:false,
      message:''
    }
    if (!this.email.value.includes('.com') || !this.email.value.includes('@') ) {
      response.value = true;
      response.message = 'You must enter a vaild email';
      this.errorEmail = response.message;
    
    }
    if(!this.firstName.value || (this.firstName.value.length<2&&this.firstName.value.length>10)){
      response.value = true;
      response.message = 'First Name too short or too long';
      this.errorFirstName= response.message;
     
    }
    if(!this.lastName.value || (this.lastName.value.length<2&&this.lastName.value.length>10)){
      response.value = true;
      response.message = 'Last Name too short or too long'
      this.errorLastName= response.message;
      
    }
    if(!this.phone.value || (this.phone.value.length<2&&this.phone.value.length>10)){
      response.value = true;
      response.message = 'Invalid Phone Number'
      this.errorPhone= response.message
   
    }
    else{
      this.profileService.getProfile(this.email.value).subscribe((resp:APIResponseSingle)=>{
        if(resp.data){
          response.value = true;
          response.message ='Email Id already exists';
          this.errorEmail = response.message
        }else{
          //new email
        }
      });
    }
    return response   
  }

  addProfile(){
    let errorFlag:InternalError= this.getErrorMessage();
    if(errorFlag.value){
      return false;
    }else{
      let profile = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phone:this.phone.value,
        email:this.email.value,
        _id:''
      }
      this.profileService.putProfile(profile).subscribe((response:APIResponseSingle)=>{
        this.profiles.push(response.data)
      })
      this.router.navigate(['/'])
      return true;
    }
    
  }



ngOnChange(){
  this.errorEmail ='';
  this.errorFirstName ='';
  this.errorPhone='';
  this.errorLastName = '';
}
  ngOnInit(){
   
  }

}
