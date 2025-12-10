import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormFieldError } from '@/directives/form-field-error';

@Component({
    selector: 'app-consultancy-form',
    imports: [Shared, FormFieldError],
    templateUrl: './consultancy-form.html',
    styleUrl: './consultancy-form.scss'
})
export class ConsultancyForm implements OnInit {
    categoryList: any;

    userId = 0;

    actionName = 'Submit';

    private fb = inject(FormBuilder);

    constructor(
        private apiService: Apiservice,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    consultancyForm = this.fb.group({
        userId: [0],
        consultancyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        consultancyCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
        email: ['', [Validators.required, Validators.maxLength(80), Validators.email]],
        phoneNumber: ['', Validators.maxLength(15)],
        address_1: ['', Validators.maxLength(80)],
        address_2: ['', Validators.maxLength(80)],
        city: ['', Validators.maxLength(80)],
        state: ['', Validators.maxLength(80)],
        country: ['', Validators.maxLength(80)],
        pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        panNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
        tanNumber: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/)]],
        gstNumber: ['', [Validators.minLength(15), Validators.maxLength(15), Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/)]],
        consultancyCategory: this.fb.array([])
    });

    get consultancyName() {
        return this.consultancyForm.get('consultancyName');
    }

    get consultancyCode() {
        return this.consultancyForm.get('consultancyCode');
    }

    get hrName() {
        return this.consultancyForm.get('userName');
    }

    get email() {
        return this.consultancyForm.get('email');
    }

    get phoneNumber() {
        return this.consultancyForm.get('phoneNumber');
    }

    get address_1() {
        return this.consultancyForm.get('address_1');
    }

    get address_2() {
        return this.consultancyForm.get('address_2');
    }

    get city() {
        return this.consultancyForm.get('city');
    }

    get state() {
        return this.consultancyForm.get('state');
    }

    get country() {
        return this.consultancyForm.get('country');
    }

    get pinCode() {
        return this.consultancyForm.get('pinCode');
    }

    get panNumber() {
        return this.consultancyForm.get('panNumber');
    }

    get tanNumber() {
        return this.consultancyForm.get('tanNumber');
    }

    get gstNumber() {
        return this.consultancyForm.get('gstNumber');
    }

    get category() {
        return this.consultancyForm.get('category');
    }

    consultancyCategoryControl = new FormControl([]);

    assignCategory(categoryId: number): FormGroup {
        return this.fb.group({
            categoryId: [categoryId]
        });
    }

    get consultancyCategory(): FormArray {
        return this.consultancyForm.get('consultancyCategory') as FormArray;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((param) => {
            const id = param.get('id');
            console.log(id);

            if (id) {
                this.userId = Number(id);
                this.actionName = 'Update';
                this.fetchViewConsultancy(this.userId);
            }
        });

        this.fetchActiveCategory();
    }

    fetchViewConsultancy(userId: number) {
        try {
            const data = {
                userId: userId
            };
            console.log(data);
            this.apiService.fetchViewConsultancy(data).subscribe({
                next: (val) => {
                    console.log(val);
                    const categoryIds = val.data.consultancyCategory.map((c: any) => c.categoryId);
                    this.consultancyCategoryControl.patchValue(categoryIds);

                    this.consultancyForm.patchValue(val.data);

                    if (val.data.consultancyCode) {
                        this.consultancyForm.get('consultancyCode')?.disable();
                    } else {
                        this.consultancyForm.get('consultancyCode')?.enable();
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchActiveCategory() {
        this.apiService.fetchActiveCategory('').subscribe({
            next: (val) => {
                console.log(val);
                this.categoryList = val.data;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    categoryChange(selectedIds: number[]) {
        const categoryArray = this.consultancyCategory;
        categoryArray.clear();

        selectedIds.forEach((id) => {
            categoryArray.push(this.assignCategory(id));
        });
    }

    onSubmit() {
        try {
            console.log(this.consultancyForm.value);
            if (!this.userId) {
                const data = this.consultancyForm.value;

                this.apiService.createConsultancy(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consultancy Created Successfully' });
                        setTimeout(() => {
                            this.router.navigate(['/home/consultancies']);
                        }, 2000);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            } else {
                const data = this.consultancyForm.value;

                if (!data.consultancyCategory?.length) {
                    const existingCategory = this.consultancyCategoryControl.value?.map((id: number) => ({ categoryId: id }));
                    data.consultancyCategory = existingCategory;
                }
                console.log(data);

                this.apiService.updateConsultancy(data).subscribe({
                    next: (val) => {
                        console.log(val);
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consultancy Updated Successfully' });
                        setTimeout(() => {
                            this.router.navigate(['/home/consultancies']);
                        }, 2000);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}
