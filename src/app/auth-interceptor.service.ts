import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Interceptor!!');
    const modifieldRequest = req.clone({
      headers: req.headers.append('auth', 'dskjdhaudu')
    });
    return next.handle(modifieldRequest);
  }
}
