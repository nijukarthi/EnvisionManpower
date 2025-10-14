import { Component, inject, OnInit } from '@angular/core';
import { Shared } from "@/service/shared";
import { Category } from '@/service/masters/category/category';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-table',
  imports: [Shared, ReactiveFormsModule],
  templateUrl: './category-table.html',
  styleUrl: './category-table.scss'
})
export class CategoryTable implements OnInit {
  openNewCategory = false;

  categoryId: number | null = null;

  private categoryService = inject(Category);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  categoryList$!: Observable<any>;

  categoryForm = this.fb.group({
    categoryId: [0],
    categoryName: ['']
  })

  ngOnInit(): void {
    try {
      this.categoryList$ = this.categoryService.fetchActiveCategory();
    } catch (error) {
      console.log(error);
    }
  }

  addCategory(){
    try {
      this.openNewCategory = true;
    } catch (error) {
      console.log(error);
    }
  }

  fetchViewCategory(categoryId: number){
    this.categoryService.fetchViewCategory(categoryId).subscribe({
      next: val =>{
        console.log(val);
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
      this.openNewCategory = true;
      this.fetchViewCategory(this.categoryId);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){
    try {
      console.log(this.categoryForm.value);
      if (!this.categoryId) {  
        this.categoryService.createNewCategory(this.categoryForm.value).subscribe({
          next: val => {
            console.log(val);
            this.router.navigate(['/home']).then(success => {
              if(success){
                this.router.navigate(['/home/categories']);
              }
            })
          },
          error: err => {
            console.log(err);
          }
        })
      } else{
        this.categoryForm.patchValue({
          categoryId: this.categoryId
        });

        this.categoryService.updateCategory(this.categoryForm.value).subscribe({
          next: val => {
            console.log(val);
            this.router.navigate(['/home']).then(success => {
              if(success){
                this.router.navigate(['/home/categories']);
              }
            })
          },
          error: err =>{
            console.log(err);
          }
        })
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
          this.categoryService.deleteCategory(categoryId).subscribe({
            next: val => {
              console.log(val);
              setTimeout(() => {
                this.router.navigate(['/home']).then(success => {
                  if(success){
                    this.router.navigate(['/home/categories']);
                  }
                })
              }, 1000);
            },
            error: err => {
              console.log(err);
            }
          })
        } catch (error) {
          console.log(error);
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
      }
    })
  }

  onDialogClose(){
    this.categoryId = null;
    this.categoryForm.reset();
  }
}
