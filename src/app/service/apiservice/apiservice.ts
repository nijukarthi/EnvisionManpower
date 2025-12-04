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

  sendInterviewerOtp(params: any){
    return this.postMethod('auth/guestuser/send-otp', params);
  }

  verifyInterviewerOtp(params: any): Observable<any>{
    return this.postMethod('auth/guestuser/verify-otp', params);
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
  fetchViewRole(params: any): Observable<any>{
    return this.postMethod('master/env-role/view', params);
  }
  deleteEnvRole(params: any): Observable<any> {
    return this.postMethod('master/env-role/delete',params);
  }

  fetchRoleInfoList(params: any): Observable<any>{
    return this.postMethod('master/env-role/info', params);
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

  assignRoleForDemand(params: any): Observable<any>{
    return this.postMethod('requesition/demand/envisionrole', params);
  }

  fetchDemandFullFill(params: any): Observable<any>{
    return this.postMethod('requesition/demand/fullfill', params);
  }

  fetchConsultancyByCategory(params: any): Observable<any>{
    return this.postMethod('user/category/consultancy', params);
  }

  fetchInterviewerInfoList(params: any): Observable<any>{
    return this.postMethod('user/active/list/guestuserinfo', params);
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

  fetchViewCandidate(params: any): Observable<any>{
    return this.postMethod('candidate/view', params);
  }

  updateFixedCostCandidate(params: any){
    return this.postMethod('candidate/fixedcost/update', params);
  }

  fetchEmploymentStatus(params: any): Observable<any>{
    return this.postMethod('candidate/employmentstatus', params);
  }

  updateEmploymentStatus(params: any): Observable<any>{
    return this.postMethod('candidate/employmentdetail/status/update', params);
  }

  deleteCandidate(params: any){
    return this.postMethod('candidate/remove', params);
  }

  updateCostPlusPersonalCandidate(params: any){
    return this.postMethod('candidate/costplus/update', params);
  }

  updateMonthlyReimbursementCandidate(params: any){
    return this.postMethod('candidate/monthlyreimbursement/update', params);
  }

  updateOneTimeReimbursementCandidate(params: any){
    return this.postMethod('candidate/onetimereimbursement/update', params);
  }

  updateCostPlusSalaryDetails(params: any){
    return this.postMethod('candidate/costplussalary/update', params);
  }

  fetchActiveInterviewers(params: any): Observable<any>{
    return this.postMethod('user/active/guestuser', params);
  }

  createNewInterviewer(params: any){
    return this.postMethod('user/guestuser/create', params);
  }

  fetchViewInterviewer(params: any): Observable<any>{
    return this.postMethod('user/guestuser/view', params);
  }

  updateInterviewer(params: any){
    return this.postMethod('user/guestuser/update', params);
  }

  deleteInterviewer(params: any){
    return this.postMethod('user/guestuser/remove', params);
  }

  createFirstInterview(params: any){
    return this.postMethod('requesition/demand/interview/first-round/create', params);
  }

  viewFirstInterview(params: any): Observable<any>{
    return this.postMethod('requesition/demand/interview/first-round/view', params);
  }

  assignNewConsultancy(params: any){
    return this.postMethod('requesition/demand/interview/consultancy/assign', params);
  }

  removeAssignedConsultancy(params: any){
    return this.postMethod('requesition/demand/interview/consultancy/remove', params);
  }

  updateFirstInterviewDetails(params: any){
    return this.postMethod('requesition/demand/interview/update', params);
  }

  fetchCandidateInfoList(params: any): Observable<any>{
    return this.postMethod('candidate/infolist', params);
  }

  assignCandidatesFirstInterview(params: any){
    return this.postMethod('requesition/demand/interview/first-round/candidate/assign', params);
  }

  viewAssignedCandidates(params: any): Observable<any>{
    return this.postMethod('requesition/demand/interview/candidates', params);
  }

  assignMoreCandidates(params: any){
    return this.postMethod('requesition/demand/interview/first-round/candidate/assign-more', params);
  }

  removeAssignedCandidates(params: any){
    return this.postMethod('requesition/demand/interview/first-round/candidate/remove', params);
  }

  firstInterviewRoundStatus(params: any){
    return this.postMethod('requesition/demand/interview/first-round/candidate/update', params);
  }

  viewFinalInterviewDetails(params: any): Observable<any>{
    return this.postMethod('requesition/demand/interview/second-round/view', params);
  }

  updateFinalInterviewRound(params: any){
    return this.postMethod('requesition/demand/interview/second-round/candidate/update', params);
  }

  finalApprovalCandidateList(params: any): Observable<any>{
    return this.postMethod('requesition/demand/finalapproval/candidate', params);
  }

  finalApprovalRound(params: any){
    return this.postMethod('requesition/demand/finalapproval/candidate/update', params);
  }

  joiningProcessCandidateList(params: any): Observable<any>{
    return this.postMethod('requesition/demand/joiningprocess/candidate', params);
  }

  joiningProcessCandidatesForm(params: any): Observable<any>{
    return this.postMethod('requesition/demand/joiningprocess/candidate/update', params);
  }

  fetchOnboardingCandidateList(params: any): Observable<any>{
    return this.postMethod('candidate/onboarded', params);
  }

  fetchOnRollCandidates(params: any): Observable<any>{
    return this.postMethod('candidate/onroll', params);
  }

  moveCandidatesToOnroll(params: any): Observable<any>{
    return this.postMethod('candidate/move-to/onroll', params);
  }

  updateOnboardCandidates(params: any): Observable<any>{
    return this.postMethod('candidate/onboarded/update', params);
  }

  fetchPpeDetails(params: any): Observable<any>{
    return this.postMethod('candidate/onboarded/ppedetails/view', params);
  }

  updatePpeDetails(params: any){
    return this.postMethod('candidate/onboarded/ppedetails/update', params);
  }

  updateGwoTraining(params: any): Observable<any>{
    return this.postMethod('candidate/training/gwo/update', params);
  }

  fetchCandidateSitePerformance(params: any): Observable<any>{
    return this.postMethod('candidate/siteperfomance', params);
  }

  transferCandidateProject(params: any){
    return this.postMethod('candidate/siteperfomance/transfer', params);
  }

  fetchTransferredEmployeeList(params: any): Observable<any>{
    return this.postMethod('candidate/siteperfomance/transfer/requests', params);
  }

  approveTransferClusterHead(params: any){
    return this.postMethod('candidate/siteperfomance/transfer/approve/statehead', params);
  }

  approveTransferDeptHead(params: any){
    return this.postMethod('candidate/siteperfomance/transfer/approve/departmenthead', params);
  }

  employeeResignation(params: any){
    return this.postMethod('candidate/siteperfomance/resignation', params);
  }

  fetchResignationList(params: any): Observable<any>{
    return this.postMethod('candidate/siteperfomance/resignation/requests', params);
  }

  approveResignClusterHead(params: any){
    return this.postMethod('candidate/siteperfomance/resignation/approve/statehead', params);
  }

  approveResignDeptHead(params: any){
    return this.postMethod('candidate/siteperfomance/resignation/approve/departmenthead', params);
  }

  fetchDemandDetails(params: any): Observable<any>{
    return this.postMethod('requesition/demand/byspn', params);
  }

  fetchAttendanceList(params: any): Observable<any>{
    return this.postMethod('candidate/siteattendance', params);
  }

  updateAttendanceDetails(params: any){
    return this.postMethod('candidate/siteattendance/update', params);
  }

  updateSitePerformanceDetails(params: any){
    return this.postMethod('candidate/siteperfomance/update', params);
  }

  fetchConsultancyInfoList(params: any): Observable<any>{
    return this.postMethod('user/active/consultancy-info', params);
  }

  fetchDemandCandidates(params: any): Observable<any>{
    return this.postMethod('candidate/employment/active/demand', params);
  }

  fetchSpnCandidates(params: any): Observable<any>{
    return this.postMethod('candidate/employment/active/spn', params);
  }

  fetchPOList(params: any): Observable<any>{
    return this.postMethod('requesition/purchaseorder/list', params);
  }

  mapNewPurchaseOrder(params: any){
    return this.postMethod('requesition/purchaseorder/mapnew', params);
  }

  fetchInvoiceSubmissionList(params: any): Observable<any>{
    return this.postMethod('requesition/invoice/list', params);
  }

  fetchPODetails(params: any): Observable<any>{
    return this.postMethod('requesition/invoice/po-candidates', params);
  }

  createInvoice(params: any): Observable<any>{
    return this.postMethod('requesition/invoice/submit', params);
  }

  invoiceGRNList(params: any): Observable<any>{
    return this.postMethod('requesition/invoice/grn/list', params);
  }

  updatePOStatus(params: any){
    return this.postMethod('requesition/purchaseorder/status/update', params);
  }

  startGRNProcess(params: any){
    return this.postMethod('requesition/invoice/grn/start', params);
  }

  completeGRNProcess(params: any){
    return this.postMethod('requesition/invoice/grn/complete', params);
  }

  makeGRNReverse(params: any){
    return this.postMethod('requesition/invoice/grn/reverse', params);
  }

  fetchDisbursementList(params: any): Observable<any>{
    return this.postMethod('requesition/invoice/disbursement/list', params);
  }

  fetchViewPurchaseOrder(params: any): Observable<any>{
    return this.postMethod('requesition/purchaseorder/view', params);
  }

  fetchViewInvoice(params: any): Observable<any>{
    return this.postMethod('requesition/invoice/view', params);
  }
}
