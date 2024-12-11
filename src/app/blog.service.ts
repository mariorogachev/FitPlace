// blog.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs, query, updateDoc, increment, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebase.config';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsCollection = 'blogs';

  getBlogs(): Observable<any[]> {
    const blogsQuery = query(collection(firestore, this.blogsCollection));
    return from(getDocs(blogsQuery).then(snapshot => 
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    ));
  }

  postBlog(blog: { title: string, content: string, author: string }): Promise<void> {
    const newDocRef = doc(collection(firestore, this.blogsCollection));
    return setDoc(newDocRef, {
      ...blog,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likes: 0,
      likedBy: [],
      comments: []
    });
  }

  likeBlog(blogId: string, userId: string): Promise<void> {
    const blogDoc = doc(firestore, `${this.blogsCollection}/${blogId}`);
    return updateDoc(blogDoc, {
      likes: increment(1),
      likedBy: arrayUnion(userId)
    });
  }

  unlikeBlog(blogId: string, userId: string): Promise<void> {
    const blogDoc = doc(firestore, `${this.blogsCollection}/${blogId}`);
    return updateDoc(blogDoc, {
      likes: increment(-1),
      likedBy: arrayRemove(userId)
    });
  }

  addComment(blogId: string, comment: { userId: string, comment: string, createdAt: any, username: string }): Promise<void> {
    const blogDoc = doc(firestore, `${this.blogsCollection}/${blogId}`);
    return updateDoc(blogDoc, {
      comments: arrayUnion(comment)
    });
  }

  updateBlog(blogId: string, updatedBlog: { title: string, content: string }): Promise<void> {
    const blogDoc = doc(firestore, `${this.blogsCollection}/${blogId}`);
    return updateDoc(blogDoc, {
      ...updatedBlog,
      updatedAt: serverTimestamp()
    });
  }
}





