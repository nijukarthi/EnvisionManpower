import { UserGroups } from '@/models/usergroups/usergroups.enum';
import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-loginpage',
  imports: [Shared, TabsModule],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.scss'
})
export class Loginpage {

  enteredLoginUserEmail = '';
  otpTimeLeft = '';
  loginUserResponse: any;
  loginUserForm: any;
  loginScreen:boolean = true;
  registerScreen:boolean = false;
  registerInterviewerScreen = false;
  userOtpForm:any;
  interviewerForm: any;
  interviewerOtpForm: any;

  UserGroups = UserGroups;

  constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginUserForm = this.fb.group({
      email: ['',(Validators.required,Validators.email)],
    })

    this.userOtpForm = this.fb.group({
        email: [''],
        otp: ['',Validators.required]
    })

    this.interviewerForm = this.fb.group({
        phoneNumber: ['',Validators.required]
    })

    this.interviewerOtpForm = this.fb.group({
        phoneNumber: [''],
        otp: ['', Validators.required]
    })
  }

    otpTimer(expireByString: string){
        console.log(expireByString);
        const expireBy = new Date(expireByString).getTime();
        console.log("expireBy:", expireBy);

        const interval = setInterval(() => {
            const currentTime = Date.now();

            const diffMs = expireBy - currentTime;

            if (diffMs <= 0) {
                clearInterval(interval);
                this.otpTimeLeft = '00:00';
                return;
            }

            const totalSeconds = Math.floor(diffMs / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            this.otpTimeLeft = `${this.pad(minutes)}:${this.pad(seconds)}`;
            // console.log(this.otpTimeLeft);
        }, 1000)
    }

    pad(num: number): string{
        return num < 10 ? '0' + num : '' + num;
    }

    onSubmitUsers(action:any){
        try{
            if (action == 'email') {
                 this.enteredLoginUserEmail = this.loginUserForm.get('email')?.value ?? '';
                this.loginUserForm.get('email')?.setValidators([
                    Validators.required,
                ]);
                this.loginUserForm.get('email')?.updateValueAndValidity();

                this.interviewerForm.get('phoneNumber')?.clearValidators();
                this.interviewerForm.get('phoneNumber')?.updateValueAndValidity();

                if(this.loginUserForm.valid){
                    var email = this.loginUserForm.get('email')?.value;
                    let data = {
                        "email": email
                    }
                    this.apiService.sendOTP(data).subscribe({
                    next: val => {
                        if(val.status == 200){
                            console.log(val);
                            this.registerScreen = true;
                            this.loginScreen = false;
                            this.loginUserResponse = val.data;
                            this.otpTimer(this.loginUserResponse.expireBy);
                            return;
                           /*  this.route.navigate(['/register']) */
                        }
                        this.registerScreen = false;
                        this.loginScreen = true;
                    },
                    error: err => {
                      this.registerScreen = false;
                        this.loginScreen = true;
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.detail });
                    }
                })
                }else{
                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter Email Id' });
                }
               

            } else if (action == 'guest') {
                this.interviewerForm.get('phoneNumber')?.setValidators([
                    Validators.required,
                    Validators.pattern('^[0-9]{10}$')
                ]);
                this.interviewerForm.get('phoneNumber')?.updateValueAndValidity();

                 this.loginUserForm.get('email')?.clearValidators();
                this.loginUserForm.get('email')?.updateValueAndValidity();
                this.loginUserForm.updateValueAndValidity();

                if(this.loginUserForm.valid){
                    var phoneNumber = this.loginUserForm.get('phoneNumber')?.value;
                    let data = {
                        "email": phoneNumber
                    }
                    this.apiService.sendOTP(data).subscribe({
                    next: val => {
                        if(val.status == 200){
                           this.registerScreen = true;
                            this.loginScreen = false;
                            console.log(val);
                            this.loginUserResponse = val;
                            this.otpTimer(this.loginUserResponse.expireBy);
                            return;
                        }
                         this.registerScreen = false;
                            this.loginScreen = true;
                    },
                    error: err => {
                       this.registerScreen = false;
                            this.loginScreen = true;
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                })
                }else{
                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Mobile Number' });
                }

            }
             
             

        }catch(e){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
        }
       
    }

    submitInterviewer(){
        try {
            console.log(this.interviewerForm.value);
            if (this.interviewerForm.valid) {
                const data = this.interviewerForm.value;
                console.log(data);
                this.apiService.sendInterviewerOtp(data).subscribe({
                    next: val => {
                        console.log(val);
                        this.loginScreen = false;
                        this.registerInterviewerScreen = true;
                        this.loginUserResponse = val.data;
                        this.otpTimer(this.loginUserResponse.expireBy);
                        return;
                    },
                    error: err => {
                        console.log(err);
                        this.loginScreen = true;
                        this.registerInterviewerScreen = false;

                        if (err.status === 400) {
                            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail})
                        }
                    }
                })
            }else{
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please Enter Mobile Number'})
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchUserProfile(){
        this.apiService.fetchUserProfile('').subscribe({
            next: val => {
                console.log(val);
                sessionStorage.setItem("userName", val.data.userName);
                sessionStorage.setItem('userGroupId', val.data.userGroupId);
                sessionStorage.setItem('userEmail', val.data.email);
                if (val.data.userGroupId === UserGroups.CLUSTERHEAD || val.data.userGroupId === UserGroups.DEPARTMENTHEAD) {
                    this.route.navigate(['/home/manpower-approval']);
                } else if(val.data.userGroupId === UserGroups.CONSULTANCY){
                    this.route.navigate(['/home/consultancies']);
                } else if (val.data.userGroupId === UserGroups.GUESTUSER) {
                    this.route.navigate(['/home/manpower-fulfillment']);
                }
                else {
                    this.route.navigate(['/home/manpower-request']);
                }
            },
            error: err => {
                console.log(err);
            }
        })
    }

    verifyOtp(){
        try{
            if(this.userOtpForm.valid){
                this.userOtpForm.patchValue({
                    email: this.loginUserResponse.email
                })
                console.log(this.userOtpForm.value);

                this.apiService.verifyUserOtp(this.userOtpForm.value).subscribe({
                    next: (val: any) => {
                    if(val.status == 200){
                        console.log(val);
                        sessionStorage.setItem('token', val.data.token);
                        this.fetchUserProfile();
                    }
                    },
                    error: err => {
                        console.log(err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });

                    }
                })
            }   else{
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter OTP' });
            }
        }catch(e){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try Again' });
        }
        
    }

    verifyInterviewerOtp(){
        try {
            console.log(this.interviewerOtpForm.value);
            if (this.interviewerOtpForm.valid) {
                this.interviewerOtpForm.patchValue({
                    phoneNumber: this.loginUserResponse.email
                })

                const data = this.interviewerOtpForm.value;
                console.log(data);

                this.apiService.verifyInterviewerOtp(data).subscribe({
                    next: val => {
                        console.log(val);
                        sessionStorage.setItem('token', val.data.token);
                        this.fetchUserProfile();
                    },
                    error: err => {
                        console.log(err);

                        if (err.status === 400) {
                            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
                        }
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }


}
