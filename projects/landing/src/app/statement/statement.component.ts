import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class StatementComponent {
  constructor() {}
}
