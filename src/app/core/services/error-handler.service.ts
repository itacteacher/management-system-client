import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexprected error occured.';

    if (error.error?.message) {
      errorMessage = error.error.message;
    }

    if (error.error?.errors) {
      const errorDetails = Object.values(error.error.errors).flat().join(', ');
      errorMessage = `Validation errors: ${errorDetails}`;
    }

    return errorMessage;
  }
}
