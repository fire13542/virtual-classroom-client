import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {

  images = ['home-slider-1', 'home-slider-2', 'home-slider-3'].map((n) => `../../../assets/images/${n}.jpg`);

  constructor() { }

  ngOnInit(): void {
  }

}
