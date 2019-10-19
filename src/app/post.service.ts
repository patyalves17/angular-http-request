import { Injectable } from '@angular/core';
import { Post } from './posts.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(postData: Post) {
    return this.http.post<{ name: string }>(
      'https://irobot-4af1e.firebaseio.com/posts.json',
      postData
    );
  }

  fetchPosts() {
    let customParams = new HttpParams();
    customParams = customParams.append('print', 'pretty');
    customParams = customParams.append('custom', 'key');

    return this.http
      .get<Post[]>('https://irobot-4af1e.firebaseio.com/posts.json', {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: customParams
        // params: new HttpParams().set('print', 'pretty')
      })
      .pipe(
        map(reponseData => {
          const postArray: Post[] = [];
          for (const key in reponseData) {
            if (reponseData.hasOwnProperty(key)) {
              postArray.push({ ...reponseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError(errorRes => {
          // maybe  send to analytics
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete('https://irobot-4af1e.firebaseio.com/posts.json');
  }
}
