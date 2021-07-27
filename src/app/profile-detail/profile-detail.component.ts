import { Component, OnInit } from '@angular/core';
import { APIResponse, Profile } from '../profile.modal';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
profiles:Profile[] = []
  constructor( 
    private profileService:ProfileService) { }

  getProfiles(){
    this.profileService.getProfiles().subscribe((response:APIResponse)=>{
      this.profiles = response.data
      return response;
  })
}

deleteProfile(email:String){
  let profiles = this.profiles;
  let newArray:Profile[] = [];
  this.profileService.deleteProfile(email).subscribe((response:APIResponse)=>{
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
