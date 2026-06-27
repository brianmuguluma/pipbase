import { Component, input } from '@angular/core';
import { IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  standalone: true,
  imports: [IonNote],
})
export class EmptyComponent {
  text = input<string>();
  constructor() {}
}
