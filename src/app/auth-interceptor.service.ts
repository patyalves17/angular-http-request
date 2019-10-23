import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Interceptor!!');
    const modifieldRequest = req.clone({
      headers: req.headers.append('auth', 'dskjdhaudu')
    });
    return next.handle(modifieldRequest).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('event arrived');
          console.log(event.body);
        }
      })
    );
  }
}
