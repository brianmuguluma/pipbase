import { Component, input } from '@angular/core';
import { StepSeperatorComponent } from '../step-seperator/step-seperator.component';

@Component({
  selector: 'app-step-current',
  templateUrl: './step-current.component.html',
  styleUrls: ['./step-current.component.scss'],
  standalone: true,
  imports: [StepSeperatorComponent],
})
export class StepCurrentComponent {
  index = input.required<string>();
  step = input.required<string>();
  displaySeperator = input<boolean>();
  constructor() {}
}
