import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getActiveClusters(){
    return this.http.get(`${this.baseUrl}/api/master/cluster`);
  }

  createNewCluster(clusterForm: any){
    return this.http.post(`${this.baseUrl}/api/master/cluster/create`, clusterForm);
  }

  fetchViewCluster(clusterId: number){
    return this.http.get(`${this.baseUrl}/api/master/cluster/view?clusterId=${clusterId}`);
  }

  updateCluster(updateClusterForm: any){
    return this.http.put(`${this.baseUrl}/api/master/cluster/update`, updateClusterForm);
  }

  deleteCluster(clusterId: number){
    return this.http.delete(`${this.baseUrl}/api/master/cluster/delete?clusterId=${clusterId}`)
  }
}
