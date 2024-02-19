
 
import { ErrorHandler, Injectable} from '@angular/core';
 
@Injectable()
export class HandlerService implements ErrorHandler {
 
    constructor() { 
    }
  
    handleError(error:Error) {
       console.error('An error occurred:', error.message);
       console.error(error);
       alert(error);
   }
 
}