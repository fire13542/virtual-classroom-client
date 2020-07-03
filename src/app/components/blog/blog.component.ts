import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs = [];

  isAdmin: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getAllBlogs();
    this.isAdmin = AuthService.isAdmin;
  }

  getAllBlogs() {
    fetch('http://localhost:3000/blog/all', {
      method: 'get'
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      this.blogs = response.blogs;
    })
    .catch(err => {
      console.log(err);
    })
  }

  goToArticle(blogId, blogTitle){
    this.router.navigate(['/article', blogId, blogTitle]);
  }

  getBlogContent(blogId) {
    fetch(BlogService.API_URL+'blog/'+blogId, {
      method: 'get'
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.blog){
        BlogService.blog = response.blog;
        this.router.navigate(['/article', response.blog._id, response.blog.title]);
      }
      else {
        throw 'no blog';
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  deleteBlog(id){
    let d = confirm('are you sure, you want to delete this article?');
    if(d){
      fetch(BlogService.API_URL+'blog/delete', {
        method: 'delete',
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
        body: JSON.stringify({
          blogId: id
        })
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.tokenError){
          alert(response.message);
        }
        else {
          if(response.blogDeleted){
            alert('this article is deleted successfully');
          }
          else {
            alert('error in deleting blog, try again later...');
          }
        }
        this.router.navigate(['/blog']);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

}
