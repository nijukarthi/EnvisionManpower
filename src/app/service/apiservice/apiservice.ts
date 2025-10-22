import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postMethod(url: any, params: any, config?: any) {
    return this.http.post(this.baseUrl + url, params, config);
  }

  sendOTP(params: any): Observable<any> {
    return this.postMethod('auth/user/send-otp', params)
  }

  fetchUserProfile(params: any): Observable<any> {
    return this.postMethod('user/profile', params)
  }

  verifyUserOtp(params: any): Observable<any> {
    return this.postMethod('auth/user/verify-otp', params);
  }

  createNewDepartment(params: any): Observable<any> {
    return this.postMethod('master/department/create', params);
  }

  updateDepartment(params: any): Observable<any> {
    return this.postMethod('master/department/update', params);
  }

  fetchActiveDepartments(params: any): Observable<any> {
    return this.postMethod('master/department', params);
  }

  deleteDepartment(params: any): Observable<any> {
    return this.postMethod('master/department/delete', params);
  }

  createNewUsergroup(params: any): Observable<any> {
    return this.postMethod('master/usergroup/create',params);
  }
  updateUserGroup(params: any): Observable<any> {
    return this.postMethod('master/usergroup/update',params);
  }
   fetchActiveUsergroup(params: any): Observable<any> {
    return this.postMethod('master/usergroup',params);
  }
  deleteUserGroup(params: any): Observable<any> {
    return this.postMethod('master/usergroup/delete',params);
  }

  createNewCategory(params: any): Observable<any> {
    return this.postMethod('master/category/create',params);
  }
  updateCategory(params: any): Observable<any> {
    return this.postMethod('master/category/update',params);
  }
  fetchActiveCategory(params: any): Observable<any> {
    return this.postMethod('master/category',params);
  }
  deleteCategory(params: any): Observable<any> {
    return this.postMethod('master/category/delete',params);
  }

  createNewEnvRole(params: any): Observable<any> {
    return this.postMethod('master/env-role/create',params);
  }
  updateEnvRole(params: any): Observable<any> {
    return this.postMethod('master/env-role/update',params);
  }
   fetchActiveEnvRole(params: any): Observable<any> {
    return this.postMethod('master/env-role',params);
  }
  deleteEnvRole(params: any): Observable<any> {
    return this.postMethod('master/env-role/delete',params);
  }

  createNewCluster(params: any): Observable<any> {
    return this.postMethod('master/cluster/create',params);
  }
  updateCluster(params: any): Observable<any> {
    return this.postMethod('master/cluster/update',params);
  }
  getActiveClusters(params: any): Observable<any> {
    return this.postMethod('master/cluster',params);
  }
  deleteCluster(params: any): Observable<any> {
    return this.postMethod('master/cluster/delete',params);
  }

  findUserGroup(params: any): Observable<any>{
    return this.postMethod('user/findby/usergroup', params);
  }

  fetchClusterHeadByCluster(params: any): Observable<any>{
    return this.postMethod('master/cluster/head', params);
  }

  fetchActiveSpns(params: any): Observable<any>{
    return this.postMethod('master/spn', params);
  }

  createNewSpn(params: any){
    return this.postMethod('master/spn/create', params);
  }

  updateSpn(params: any){
    return this.postMethod('master/spn/update', params);
  }

  deleteSpn(params: any){
    return this.postMethod('master/spn/delete', params);
  }

  fetchSpnInfo(params: any): Observable<any>{
    return this.postMethod('master/spninfo', params);
  }

  fetchActiveProjects(params: any): Observable<any>{
    return this.postMethod('master/project', params);
  }

  createNewProject(params: any){
    return this.postMethod('master/project/create', params);
  }

  updateProject(params: any){
    return this.postMethod('master/project/update', params);
  }

  deleteProject(params: any){
    return this.postMethod('master/project/delete', params)
  }

  fetchProjectCodes(params: any): Observable<any>{
    return this.postMethod('master/projectcode', params);
  }

  viewProject(params: any): Observable<any>{
    return this.postMethod('master/project/view', params);
  }

  fetchActiveCompanyUsers(params: any): Observable<any>{
    return this.postMethod('user/active/companyuser', params);
  }

}
