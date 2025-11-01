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

  fetchDepartmentHeadByDepartment(params: any): Observable<any>{
    return this.postMethod('master/department/head', params);
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

  createCompanyUsers(params: any): Observable<any>{
    return this.postMethod('user/account/create', params);
  }

  viewCompanyUser(params: any): Observable<any>{
    return this.postMethod('user/account/view', params);
  }

  updateCompanyUser(params: any){
    return this.postMethod('user/account/update', params);
  }

  deleteCompanyUser(params: any): Observable<any>{
    return this.postMethod('user/account/remove', params);
  }

  createRequesition(params: any){
    return this.postMethod('requesition/create', params);
  }

  fetchDemandRequest(params: any): Observable<any>{
    return this.postMethod('requesition/demand/assigned', params);
  }

  viewRequisition(params: any): Observable<any>{
    return this.postMethod('requesition/view', params);
  }

  approveDemandByClusterHead(params: any){
    return this.postMethod('requesition/demand/approve/statehead', params);
  }

  approveDemandByDepartmentHead(params: any){
    return this.postMethod('requesition/demand/approve/departmenthead', params);
  }

  fetchDemandResourceManager(params: any): Observable<any>{
    return this.postMethod('requesition/demand/resourcemanager', params);
  }

  editDemandQuantity(params: any){
    return this.postMethod('requesition/edit/demand/quantity', params);
  }

  assignResourceManager(params: any){
    return this.postMethod('requesition/demand/resourcemanager/assign', params);
  }

  fetchDemandFullFill(params: any): Observable<any>{
    return this.postMethod('requesition/demand/fullfill', params);
  }

  assignEnvisionRoles(params: any){
    return this.postMethod('requesition/demand/envisionrole/assign', params);
  }

  createConsultancy(params: any){
    return this.postMethod('user/consultancy/create', params);
  }

  fetchActiveConsultancy(params: any): Observable<any>{
    return this.postMethod('user/active/consultancy', params);
  }

  fetchViewConsultancy(params: any): Observable<any>{
    return this.postMethod('user/consultancy/view', params);
  }

  updateConsultancy(params: any): Observable<any>{
    return this.postMethod('user/consultancy/update', params);
  }

  deleteConsultancy(params: any): Observable<any>{
    return this.postMethod('user/consultancy/remove', params);
  }

  createFixedCostCandidate(params: any){
    return this.postMethod('candidate/fixedcost/create', params);
  }

  fetchActiveFixedCostCandidates(params: any): Observable<any>{
    return this.postMethod('candidate/fixedcost/active', params);
  }

  fetchActiveCostPlusCandidates(params: any): Observable<any>{
    return this.postMethod('candidate/costplus/active', params);
  }

  createCostPlusCandidates(params: any){
    return this.postMethod('candidate/costplus/create', params);
  }

}
