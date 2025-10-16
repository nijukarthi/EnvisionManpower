import { Component, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Apiservice } from '@/service/apiservice/apiservice';

@Component({
  selector: 'app-category-table',
  imports: [Shared, ReactiveFormsModule],
  templateUrl: './category-table.html',
  styleUrl: './category-table.scss'
})
export class CategoryTable implements OnInit {
  openNewCategoryPopup = false;
  categoryId: any;
  /* private apiService = inject(Category);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService); */
  categoryList: any;
  categoryForm: any;
  actionName: any = "Save";

  constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router,private confirmationService:ConfirmationService) { }
  

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
     categoryId: [''],
     categoryName: ['',Validators.required]
   })
   this.fetchViewCategory();
    //this.categoryList = this.apiService.fetchActiveCategory('');
  }

  addCategory(){
    try {
      this.openNewCategoryPopup = true;
      this.actionName = "Save";
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewCategory(){
    this.apiService.fetchActiveCategory('').subscribe({
      next: val =>{
        console.log(val);
        this.categoryList = val?.data
        this.categoryForm.patchValue(val);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  editCategory(categoryId: number){
    try {
      this.categoryId = categoryId;
      this.openNewCategoryPopup = true;
      this.actionName = "Update";
       if (this.categoryId) {     
        this.categoryForm.patchValue({
          categoryId:this.categoryId.categoryId,
          categoryName:this.categoryId.categoryName});
         
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.categoryForm.value);
      if (!this.categoryId) {  
        if(this.categoryForm.valid){
          let name = this.categoryForm.get('categoryName').value
          let data = {
            categoryName:name
          }
          this.apiService.createNewCategory(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category Added Successfully'
              })
              this.openNewCategoryPopup = false;
              this.categoryForm.reset();
              this.fetchViewCategory();
            },
            error: err => {
              console.log(err);
            }
          })
        } else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please Enter Category'
          })
        }
        
      } else{
        if(this.categoryForm.valid){
           this.categoryForm.patchValue({
          categoryId: this.categoryId.categoryId
        });

        let data = {
          "categoryId": this.categoryForm.get('categoryId').value,
          "categoryName":this.categoryForm.get('categoryName').value
        }

        this.apiService.updateCategory(data).subscribe({
          next: val => {
            console.log(val);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category Updated Successfully'
            })
            this.openNewCategoryPopup = false;
            this.categoryForm.reset();
            this.fetchViewCategory();
          },
          error: err =>{
            console.log(err);
          }
        })
        } else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please Enter Category'
          })
        }
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteCategory(categoryId: number, categoryName: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: `Delete ${categoryName}`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        try {
          let data = {
            categoryId:categoryId
          }
          this.apiService.deleteCategory(data).subscribe({
            next: val => {
              console.log(val);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Deleted Successfully'});
              this.fetchViewCategory();
            },
            error: err => {
              console.log(err);
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  onDialogClose(){
    this.categoryId = null;
    this.categoryForm.reset();
  }
}
