import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PercentageService {
  constructor() {}

  getPercentageChange(start: number | string, end: number | string): number {
    return (Number(end) - Number(start)) / Number(start);
  }
}
