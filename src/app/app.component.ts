import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { InternalError, Profile, Response, ResponseSingle } from './profile.modal';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    private profileService:ProfileService
    ) { }
 
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
      response.message = 'You must enter a vaild email'
      return response;
    }
    if(!this.firstName.value || (this.firstName.value.length<2&&this.firstName.value.length>10)){
      response.value = true;
      response.message = 'First Name too short or too long'
      return response;
    }
    if(!this.lastName.value || (this.lastName.value.length<2&&this.lastName.value.length>10)){
      response.value = true;
      response.message = 'Last Name too short or too long'
      return response;
    }
    if(!this.phone.value || (this.phone.value.length<2&&this.phone.value.length>10)){
      response.value = true;
      response.message = 'Invalid Phone Number'
      return response;
    }
    else{
      this.profileService.getProfile(this.email.value).subscribe((resp:ResponseSingle)=>{
        if(resp.data._id){
          response.value = true;
          response.message ='Email Id already exists';
        }else{
          //new email
        }
      });
      return response
    }    
  }

  addProfile(){
    let errorFlag:InternalError= this.getErrorMessage();
    if(errorFlag.value){
      alert(errorFlag.message);
      return false;
    }else{
      let profile = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phone:this.phone.value,
        email:this.email.value,
        _id:''
      }
      this.profileService.putProfile(profile).subscribe((response:ResponseSingle)=>{
        this.profiles.push(response.data)
        console.log(this.profiles)
      })
      return true;
    }
    
  }

  getProfiles(){
    this.profileService.getProfiles().subscribe((response:Response)=>{
      this.profiles = response.data
      return response;
  })
}

deleteProfile(email:String){
  let profiles = this.profiles;
  let newArray:Profile[] = [];
  this.profileService.deleteProfile(email).subscribe((response:Response)=>{
     profiles.map((profile)=>{
      if(email != profile.email){
        newArray.push(profile)
      }
    })
    this.profiles = newArray
  })
}

ngOnChange(){
  this.getProfiles();
}
  ngOnInit(){
    this.getProfiles();
  }
  
}


