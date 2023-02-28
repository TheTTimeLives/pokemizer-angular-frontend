import { Component } from '@angular/core';

@Component({
  selector: 'call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.less']
})
export class CallToActionComponent {
  callToAction = [
    {
      header: 'Tired of group selfies?',
      subHeader: 'Attack your friends with Homey-mon Showdown'

    },
    {
      header: 'Put your friendships to the test',
      subHeader: 'See who would survive a boosted Hydro Pump'
    },
    {
      header: "It's like tag",
      subHeader: 'But your friends get killed by bolts of lightning'
    },
    {
      header: "This is your new gym membership",
      subHeader: 'The Pewter City gym specifically'
    },
  ]

  randomIndex = Math.floor(Math.random() * this.callToAction.length);
  randomCallToAction = this.callToAction[this.randomIndex];

}
