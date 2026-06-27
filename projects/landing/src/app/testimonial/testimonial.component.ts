import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { Testimonial } from '../interfaces/testimonial';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class TestimonialComponent {
  testimonial = input.required<Testimonial>();
  constructor() {}
}
