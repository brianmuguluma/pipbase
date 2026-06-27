import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class ServerComponent {
  constructor() {}
}
