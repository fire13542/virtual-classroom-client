import { Component, OnInit, NgZone } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Title } from "@angular/platform-browser";
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  blog = {
    _id: '',
    metaTags: { title: '', description: '' },
    title: '',
    articleImageUrl: '',
    content: '',
    createDate: '',
    __v: 0 
  }

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, public ngZone: NgZone, private title: Title, private meta: Meta, private router: Router, private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
      this.getBlogContent(this.route.snapshot.paramMap.get('id'));
  }

  getBlogContent(blogId) {
    this.httpClient.get(BlogService.API_URL+'blog/'+blogId)
    .subscribe((response) => {
      if((response as any).blog){
            BlogService.blog = (response as any).blog;
            this.blog = (response as any).blog;
            this.title.setTitle('O-Class - ' + this.blog.metaTags.title);
            this.meta.updateTag({name: 'description', content: this.blog.metaTags.description})
          }
          else {
            throw 'no blog';
          }
    })
    // fetch(BlogService.API_URL+'blog/'+blogId, {
    //   method: 'get'
    // })
    // .then(res => {
    //   return res.json();
    // })
    // .then(response => {
    //   if(response.blog){
    //     BlogService.blog = response.blog;
    //     this.blog = response.blog;
    //     this.title.setTitle('O-Class - ' + this.blog.metaTags.title);
    //     this.meta.updateTag({name: 'description', content: this.blog.metaTags.description})
    //   }
    //   else {
    //     throw 'no blog';
    //   }
    // })
    // .catch(err => {
    //   alert(err);
    //   console.log(err);
    // })
  }

}
