import { Component } from '@angular/core';

@Component({
  selector: 'hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.less']
})

export class HeroImageComponent {
  images: string[] = [
    "../../../assets/images/hero/trainerF2.png",
    "../../../assets/images/hero/trainerM2.png",
  ]

  randomIndex = Math.floor(Math.random() * this.images.length);
  randomImage = this.images[this.randomIndex];

}
