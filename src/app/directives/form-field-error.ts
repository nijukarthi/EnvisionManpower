import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormFieldError]'
})
export class FormFieldError {

  constructor(private control: NgControl) { }

  @HostBinding('class.p-invalid')
  get invalidClass(){
    return this.showError;
  }

  @HostBinding('class.border-[#FF5630]')
  get redBorderClass(){
    return this.showError;
  }

  private get showError(): boolean{
    const c = this.control.control;
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

}
