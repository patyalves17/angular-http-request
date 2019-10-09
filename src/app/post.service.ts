import { Injectable } from '@angular/core';
import { Post } from './posts.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    return this.http
      .get<Post[]>('https://irobot-4af1e.firebaseio.com/posts.json')
      .pipe(
        map(reponseData => {
          const postArray: Post[] = [];
          for (const key in reponseData) {
            if (reponseData.hasOwnProperty(key)) {
              postArray.push({ ...reponseData[key], id: key });
            }
          }
          return postArray;
        })
      );
  }
}
