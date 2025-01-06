import { HttpInterceptorFn } from "@angular/common/http";
import { LoaderService } from "../../shared/services/loader.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs";

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
    const loaderService = inject(LoaderService);
    loaderService.startLoading();

    return next(req).pipe(
        finalize(() => loaderService.stopLoading())
    );
};