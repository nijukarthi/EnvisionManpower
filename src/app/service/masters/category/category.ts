import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Category {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  fetchActiveCategory(){
    return this.http.get(`${this.baseUrl}/api/master/category`);
  }

  createNewCategory(categoryForm: any){
    return this.http.post(`${this.baseUrl}/api/master/category/create`, categoryForm);
  }

  fetchViewCategory(categoryId: number){
    return this.http.get(`${this.baseUrl}/api/master/category/view?categoryId=${categoryId}`);
  }

  updateCategory(updateCategoryForm: any){
    return this.http.put(`${this.baseUrl}/api/master/category/update`, updateCategoryForm);
  }

  deleteCategory(categoryId: number){
    return this.http.delete(`${this.baseUrl}/api/master/category/delete?categoryId=${categoryId}`);
  }
}
