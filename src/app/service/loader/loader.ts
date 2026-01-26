import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loader { 
  private reqCount = 0;
  private showTimeout: any;
  public isLoading = new BehaviorSubject<boolean>(false);

  show(delay = 100) {
    this.reqCount++;

    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }

    this.showTimeout = setTimeout(() => {
      if (this.reqCount > 0) {     
        this.isLoading.next(true);
      }
    }, delay);
  }

  hide() {
    if (this.reqCount > 0) {
      this.reqCount--;
    }

    if(this.reqCount === 0){
      clearTimeout(this.showTimeout);
      this.isLoading.next(false);
    }
  }

  forceHide(){
    this.reqCount = 0;
    clearTimeout(this.showTimeout);
    this.isLoading.next(false);
  }
}
