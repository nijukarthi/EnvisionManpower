import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  fetchActiveProjects(offSet: number, pageSize: number){
    return this.http.get(`${this.baseUrl}/api/master/project?offSet=${offSet}&pageSize=${pageSize}`)
  }

  createNewProject(projectForm: any){
    return this.http.post(`${this.baseUrl}/api/master/project/create`, projectForm);
  }

  fetchViewProject(projectId: number){
    return this.http.get(`${this.baseUrl}/api/master/project/view?projectId=${projectId}`)
  }

  updateProject(updateProjectForm: any){
    return this.http.put(`${this.baseUrl}/api/master/project/update`, updateProjectForm);
  }

  deleteProject(projectId: number){
    return this.http.delete(`${this.baseUrl}/api/master/project/delete?projectId=${projectId}`)
  }
}
