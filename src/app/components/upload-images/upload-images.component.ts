import { Component, OnInit } from '@angular/core';


var API_URL ='http://localhost:3000/';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  imageUrl: string = '';

  constructor() {}

  ngOnInit(): void {
  } 

  uploadImage(event){
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    this.imageUrl = 'please wait .....';
    fetch(API_URL + 'upload-image', {
      method: 'POST',
      body: formData
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      this.imageUrl = res.imageUrl;
    })
  }

}
