import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-carousel',
  templateUrl: './courses-carousel.component.html',
  styleUrls: ['./courses-carousel.component.css']
})
export class CoursesCarouselComponent implements OnInit {

  images = [];
  carouselError = '';


  constructor() { }

  ngOnInit(): void {
    this.getCarouselImages();
  }

  getCarouselImages(){
    fetch(CoursesService.API_URL + 'course/carousel', {
      method: 'get',
    })
    .then(res => res.json())
    .then(response => {
      if(response.images){
        this.images = response.images.map(image => CoursesService.API_URL+'courses-images/carousel/'+image);
      } else {
        this.carouselError = response.error;
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

}
