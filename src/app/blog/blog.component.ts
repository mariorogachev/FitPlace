import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { AuthService } from '@auth0/auth0-angular';
import { MatDialog } from '@angular/material/dialog';
import { BlogdialogComponent } from '../blogdialog/blog-dialog.component';
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
    FormsModule,
  ]
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];
  blog = { title: '', content: '', author: '' };
  errorMessage: string = '';

  constructor(public auth: AuthService, private blogService: BlogService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs.map(blog => ({ ...blog, isEditing: false, editTitle: blog.title, editContent: blog.content }));
    });
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
          this.blogService.getBlogs().subscribe(blogs => {
            this.blogs = blogs.map(blog => ({ ...blog, isEditing: false, editTitle: blog.title, editContent: blog.content }));
          }); // Reload blogs
        });
      } else {
        console.error("User name is undefined");
      }
    });
  }

  openDialog(blog: any): void {
    this.dialog.open(BlogdialogComponent, {
      data: blog,
      width: '40%', // Make the dialog wider
      height:'60%',
      maxWidth: 'none' // Remove the max-width constraint
    });
  }
  
  
  

  like(blogId: string) {
    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        const blog = this.blogs.find(b => b.id === blogId);
        if (blog && blog.likedBy.includes(user.sub)) {
          this.blogService.unlikeBlog(blogId, user.sub).then(() => {
            this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
          });
        } else {
          this.blogService.likeBlog(blogId, user.sub).then(() => {
            this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
          });
        }
      }
    });
  }

  dislike(blogId: string) {
    this.auth.user$.subscribe(user => {
      if (user?.sub) {
        const blog = this.blogs.find(b => b.id === blogId);
        if (blog && blog.dislikedBy.includes(user.sub)) {
          this.blogService.undislikeBlog(blogId, user.sub).then(() => {
            this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
          });
        } else {
          this.blogService.dislikeBlog(blogId, user.sub).then(() => {
            this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
          });
        }
      }
    });
  }

  addComment(blogId: string, commentText: string) {
    this.auth.user$.subscribe(user => {
      if (user && user.sub && user.name) {
        const comment = {
          userId: user.sub,
          userName: user.name,
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

  toggleEdit(blog: any) {
    blog.isEditing = !blog.isEditing;
  }

  saveEdit(blog: any) {
    if (blog.editTitle.trim() !== '' && blog.editContent.trim() !== '') {
      this.blogService.updateBlog(blog.id, { title: blog.editTitle, content: blog.editContent }).then(() => {
        this.blogService.getBlogs().subscribe(blogs => {
          this.blogs = blogs.map(b => ({ ...b, isEditing: false, editTitle: b.title, editContent: b.content }));
        }); // Reload blogs
      });
    } else {
      this.errorMessage = 'Title and content cannot be empty';
    }
  }

  deleteBlog(blogId: string) {
    this.blogService.deleteBlog(blogId).then(() => {
      this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs); // Reload blogs
    });
  }
}



















