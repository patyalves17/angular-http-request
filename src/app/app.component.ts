import { Post } from './posts.interface';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://irobot-4af1e.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.http
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
      )
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      });
  }

  onClearPosts() {
    // Send Http request
  }
}
