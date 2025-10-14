import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Spn {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  fetchActiveSpns(){
    return this.http.get(`${this.baseUrl}/api/master/spn`);
  }

  createNewSpn(spnForm: any){
    return this.http.post(`${this.baseUrl}/api/master/spn/create`, spnForm);
  }

  fetchViewSpn(spnId: number){
    return this.http.get(`${this.baseUrl}/api/master/spn/view?spnId=${spnId}`);
  }

  updateSpn(updateSpnForm: any){
    return this.http.put(`${this.baseUrl}/api/master/spn/update`, updateSpnForm);
  }

  deleteSpn(spnId: number){
    return this.http.delete(`${this.baseUrl}/api/master/spn/delete?spnId=${spnId}`);
  }
}
