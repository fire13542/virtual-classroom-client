import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit {

  API_URL = ApiService.API_URL;

  blogTitle: string = '';
  blogContent: string ='';

  imgURL: any;

  createError: string = '';
  createSuccess: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  createArticle(form){
    let data = form.value;
    fetch(this.API_URL + 'blog/new', {
      method: 'post', 
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        title: data.title, 
        articleImage: data.articleImage,
        metaTags: {title: data.metaTitle, description: data.metaDescription},
        content: data.content
    })
  })
  .then(res => res.json())
  .then(response => {
    if(response.tokenError){
      alert(response.message);
    }
    else {
      if(!response.blogCreated) {
        this.createError = response.errMsg;
      }
      else {
        this.createSuccess = 'blog created successfully'
      }
    }
  })
}

}