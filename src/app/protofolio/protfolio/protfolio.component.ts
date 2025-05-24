import { Component } from '@angular/core';

@Component({
  selector: 'app-protfolio',
  templateUrl: './protfolio.component.html',
  styleUrls: ['./protfolio.component.css']
})
export class ProtfolioComponent {
  images = [
    'assets/henry.webp',
    'assets/004.webp',
    'assets/Profile_Photo.jpg',
    'assets/matt.webp'
    // add more images here
  ];
  currentIndex = 0;
  SwipeNext() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  SwipeRight() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  swapImage(index: number) {
    this.currentIndex = index;
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}
