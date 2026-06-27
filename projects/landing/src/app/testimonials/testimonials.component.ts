import { Component, signal } from '@angular/core';
import { AppComponent } from '../app.component';
import { testimonials } from '../testimonials';
import { TestimonialComponent } from '../testimonial/testimonial.component';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  standalone: true,
  imports: [TestimonialComponent],
})
export class TestimonialsComponent {
  testimonials = signal(testimonials);
  constructor(public app: AppComponent) {}
}
