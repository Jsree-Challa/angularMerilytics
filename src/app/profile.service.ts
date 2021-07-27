import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile, APIResponse,APIResponseSingle } from './profile.modal';
import { HttpClient } from '@angular/common/http';
import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }

 

  getProfiles():Observable<APIResponse>{
   return this.http.get<APIResponse>(`http://localhost:3000/profile`)
  }

  getProfile(email:String):Observable<APIResponseSingle>{
    return this.http.get<APIResponseSingle>(`http://localhost:3000/profile/${email}`)
  }

  putProfile(profile:Profile): Observable<APIResponseSingle>{
    let headers ={
      'Content-Type':'application/json;charset=utf-8'
    } 
    return this.http.post<APIResponseSingle>(`http://localhost:3000/profile`, profile, {headers})
  }

  deleteProfile(id:String): Observable<any>{
    let headers ={
      'Content-Type':'application/json;charset=utf-8'
    }
    return this.http.delete<any>(`http://localhost:3000/profile/${id}`,{headers})
  }
}


