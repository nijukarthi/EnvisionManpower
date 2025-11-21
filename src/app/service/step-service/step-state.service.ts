import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class StepStateService {
    private activeStepSource = new BehaviorSubject<number>(1);
    activeStep$ = this.activeStepSource.asObservable();

    setActiveStep(step: number){
        this.activeStepSource.next(step);
    }
}

