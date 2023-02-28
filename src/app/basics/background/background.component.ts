import { Component, Input } from '@angular/core';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.less']
})
export class BackgroundComponent {
  @Input() imageUrl: string = '';
  @Input() left: string = '';
  @Input() top: string = '';
}
