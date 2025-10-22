import { Apiservice } from '@/service/apiservice/apiservice';
import { Shared } from '@/service/shared';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-loginpage',
  imports: [Shared, ReactiveFormsModule, PasswordModule, FormsModule, RouterModule, RippleModule, TabsModule, InputNumberModule, InputOtpModule],
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
  userOtpForm:any;

  constructor(private messageService: MessageService, private apiService: Apiservice, private fb: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginUserForm = this.fb.group({
      email: [''],
      guestMobileNumber: [''],

    })

    this.userOtpForm = this.fb.group({
        email: [''],
        otp: ['',Validators.required]
    })

     const nav = this.route.getCurrentNavigation();
        console.log(history.state);
        this.otpTimeLeft = history.state.otpTimeLeft;
        console.log('OTP Time Left:', this.otpTimeLeft);
  }

   otpTimer(expireByString: string){
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

                this.loginUserForm.get('guestMobileNumber')?.clearValidators();
                this.loginUserForm.get('guestMobileNumber')?.updateValueAndValidity();

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
                            this.loginUserResponse = val;
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
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
                    }
                })
                }else{
                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter Email Id' });
                }
               

            } else if (action == 'guest') {
                this.loginUserForm.get('guestMobileNumber')?.setValidators([
                    Validators.required,
                    Validators.pattern('^[0-9]{10}$')
                ]);
                this.loginUserForm.get('guestMobileNumber')?.updateValueAndValidity();

                 this.loginUserForm.get('email')?.clearValidators();
                this.loginUserForm.get('email')?.updateValueAndValidity();
                this.loginUserForm.updateValueAndValidity();

                if(this.loginUserForm.valid){
                    var guestMobileNumber = this.loginUserForm.get('guestMobileNumber')?.value;
                    let data = {
                        "email": guestMobileNumber
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
                            /* this.route.navigate(['/register']) */
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

    fetchUserProfile(){
        this.apiService.fetchUserProfile('').subscribe({
            next: val => {
                console.log(val);
                sessionStorage.setItem("userName", val.data.userName);
                this.route.navigate(['/home/demand']);
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
            email: this.loginUserResponse.data.email
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
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });

            }
        })
            }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter OTP' });

            }
        }catch(e){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try Again' });

        }
        
    }


}
