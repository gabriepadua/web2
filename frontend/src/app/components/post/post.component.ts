import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  message = '';
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getMyPosts().subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  createPost(): void {
    this.postService.createPost(this.message).subscribe(
      response => {
        console.log('Post created:', response);
        this.loadPosts();
      },
      error => {
        console.error('Error creating post:', error);
      }
    );
  }

  editPost(id: string, message: string): void {
    this.postService.editPost(id, message).subscribe(
      response => {
        console.log('Post updated:', response);
        this.loadPosts();
      },
      error => {
        console.error('Error updating post:', error);
      }
    );
  }

  deletePost(id: string): void {
    this.postService.deletePost(id).subscribe(
      response => {
        console.log('Post deleted:', response);
        this.loadPosts();
      },
      error => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
