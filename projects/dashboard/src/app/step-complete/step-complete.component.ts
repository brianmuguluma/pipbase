import { Component, input } from '@angular/core';
import { StepSeperatorComponent } from '../step-seperator/step-seperator.component';
import { StepCompleteIconComponent } from '../step-complete-icon/step-complete-icon.component';

@Component({
  selector: 'app-step-complete',
  templateUrl: './step-complete.component.html',
  styleUrls: ['./step-complete.component.scss'],
  standalone: true,
  imports: [StepSeperatorComponent, StepCompleteIconComponent],
})
export class StepCompleteComponent {
  step = input.required<string>();
  displaySeperator = input<boolean>();
  constructor() {}
}
