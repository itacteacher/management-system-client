import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
        const clonedRequest = req.clone({
            setHeaders: {
                Autorization: `Bearer ${token}`
            }
        });

        return next(clonedRequest);
    }
    
    return next(req);
}