import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyUsersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  fetchActiveCompanyUsers(offSet: number, pageSize: number){
    return this.http.get(`${this.baseUrl}/api/user/active/companyuser?offSet=${offSet}&pageSize=${pageSize}`);
  }
}
