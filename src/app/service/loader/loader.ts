import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loader {
  
  private reqCount = 0;
  public isLoading =  new BehaviorSubject<boolean>(false);
  show() {
    this.reqCount++
    this.isLoading.next(true);
  }

  hide() {
    this.reqCount--;
    if(this.reqCount == 0){
      this.isLoading.next(false);
    }
  }
}
