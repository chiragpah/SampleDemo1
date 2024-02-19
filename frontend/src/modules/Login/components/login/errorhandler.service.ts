import { Injectable, importProvidersFrom } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ErrorHandlerService {
    private errrorMessageSubject = new Subject<string>();
    errorMessage$ = this.errrorMessageSubject.asObservable();

    setError(message: string){
        this.errrorMessageSubject.next(message);
    }

    clearError(){
        this.errrorMessageSubject.next('');
    }
}