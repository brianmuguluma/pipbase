import { Component, input } from '@angular/core';
import { StepSeperatorComponent } from '../step-seperator/step-seperator.component';

@Component({
  selector: 'app-step-upcoming',
  templateUrl: './step-upcoming.component.html',
  styleUrls: ['./step-upcoming.component.scss'],
  standalone: true,
  imports: [StepSeperatorComponent],
})
export class StepUpcomingComponent {
  index = input.required<string>();
  step = input.required<string>();
  displaySeperator = input<boolean>();
  constructor() {}
}
