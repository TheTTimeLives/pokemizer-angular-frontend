import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { TestingService } from './testing.service';

@Component({
  selector: 'testing-requestor-button',
  templateUrl: './testing-requestor-button.component.html',
  styleUrls: ['./testing-requestor-button.component.less']
})
export class TestingRequestorButtonComponent {

  constructor(private testingService: TestingService) {}

  something : any

  getTester(port : any) {
    console.log("Hello from the tester button")
    this.testingService.getTesting(port)
    .pipe(
      tap(data => console.log('Receiving data', data)),
    )
    .subscribe(something => this.something = something);

  }

}
