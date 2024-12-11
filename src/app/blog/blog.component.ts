import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];
  blog = { title: '', content: '', author: '' };
  errorMessage: string = '';

  constructor(public auth: AuthService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs);
  }

  onSubmit() {
    if (this.blog.title.trim() === '' || this.blog.content.trim() === '') {
      this.errorMessage = 'Title and content cannot be empty';
      return;
    }

    this.auth.user$.subscribe(user => {
      if (user?.name) {
        const newBlog = { ...this.blog, author: user.name };
        this.blogService.postBlog(newBlog).then(() => {
          this.blog = { title: '', content: '', author: '' }; // Reset form
          this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
        });
      } else {
        console.error("User name is undefined");
      }
    });
  }

  like(blogId: string) {
    this.auth.user$.subscribe(user => {
      if (user?.sub && !this.hasLiked(blogId, user.sub)) {
        this.blogService.likeBlog(blogId, user.sub).then(() => {
          this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
        });
      }
    });
  }

  unlike(blogId: string) {
    this.auth.user$.subscribe(user => {
      if (user?.sub && this.hasLiked(blogId, user.sub)) {
        this.blogService.unlikeBlog(blogId, user.sub).then(() => {
          this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
        });
      }
    });
  }

  hasLiked(blogId: string, userId: string): boolean {
    const blog = this.blogs.find(blog => blog.id === blogId);
    return blog && blog.likedBy.includes(userId);
  }

  addComment(blogId: string, commentText: string) {
    this.auth.user$.subscribe(user => {
      if (user && user.sub && user.name) {
        const comment = {
          userId: user.sub,
          username: user.name,
          comment: commentText,
          createdAt: new Date()
        };
        this.blogService.addComment(blogId, comment).then(() => {
          this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
        });
      } else {
        console.error("User ID or name is undefined");
      }
    });
  }

  updateBlog(blogId: string, title: string, content: string) {
    this.blogService.updateBlog(blogId, { title, content }).then(() => {
      this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
    });
  }
}













