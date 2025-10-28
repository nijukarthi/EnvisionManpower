import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consultancy-form',
  imports: [Shared],
  templateUrl: './consultancy-form.html',
  styleUrl: './consultancy-form.scss'
})
export class ConsultancyForm implements OnInit {
  categoryList: any;

  userId = 0;

  private fb = inject(FormBuilder);

  constructor(private apiService: Apiservice, private messageService: MessageService, private router: Router, private route: ActivatedRoute){}

  consultancyForm = this.fb.group({
    consultancyName: [''],
    userName: [''],
    email: [''],
    phoneNumber: [''],
    address_1: [''],
    address_2: [''],
    city: [''],
    state: [''],
    country: [''],
    pinCode: [''],
    panNumber: [''],
    tanNumber: [''],
    gstNumber: [''],
    consultancyCategory: this.fb.array([])
  })

  consultancyCategoryControl = new FormControl([]);

  assignCategory(categoryId: number): FormGroup{
    return this.fb.group({
      categoryId: [categoryId]
    })
  }

  get consultancyCategory(): FormArray {
    return this.consultancyForm.get('consultancyCategory') as FormArray;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      console.log(id);

      if (id) {
        this.userId = Number(id);
        this.fetchViewConsultancy(this.userId);
      }
    })

    this.fetchActiveCategory();
  }

  fetchViewConsultancy(userId: number){
    try {
      const data = {
        userId: userId
      }
      this.apiService.fetchViewConsultancy(data).subscribe({
        next: val => {
          console.log(val);
          const categoryIds = val.data.consultancyCategory.map((c: any) => c.categoryId);
          this.consultancyCategoryControl.patchValue(categoryIds);

          this.consultancyForm.patchValue(val.data);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  fetchActiveCategory(){
    this.apiService.fetchActiveCategory('').subscribe({
      next: val => {
        console.log(val);
        this.categoryList = val.data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  categoryChange(selectedIds: number[]){
    const categoryArray = this.consultancyCategory;
    categoryArray.clear();

    selectedIds.forEach(id => {
      categoryArray.push(this.assignCategory(id))
    })
  }

  onSubmit(){
    try {   
      console.log(this.consultancyForm.value);
      const data = this.consultancyForm.value;
  
      this.apiService.createConsultancy(data).subscribe({
        next: val => {
          console.log(val);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Consultancy Created Successfully'});
          setTimeout(() => {    
            this.router.navigate(['/home/consultancies']);
          }, 2000);
        },
        error: err => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
