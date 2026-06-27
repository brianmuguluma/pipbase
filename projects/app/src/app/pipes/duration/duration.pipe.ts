import { Pipe, PipeTransform } from '@angular/core';
import { Duration, formatDuration, intervalToDuration } from 'date-fns';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(
    start: string | undefined,
    end: string | undefined,
    shorten: boolean | undefined,
  ): string {
    const duration = intervalToDuration({
      start: new Date(start!),
      end: end ? new Date(end) : new Date(),
    });

    const options: any = {
      format: [this.getFormat(duration)],
    };

    return shorten
      ? this.shortenDuration(formatDuration(duration, options))
      : formatDuration(duration, { delimiter: ', ' });
  }

  shortenDuration(duration: string): string {
    const substrings = duration.split(' ');
    const delta = substrings[0];
    const unit = substrings[1];
    switch (unit) {
      case 'year':
      case 'years':
        return `${delta}y`;
      case 'month':
      case 'months':
        return `${delta}M`;
      case 'week':
      case 'weeks':
        return `${delta}w`;
      case 'day':
      case 'days':
        return `${delta}d`;
      case 'hour':
      case 'hours':
        return `${delta}h`;
      case 'minute':
      case 'minutes':
        return `${delta}m`;
      case 'second':
      case 'seconds':
        return `${delta}s`;
      default:
        return '0s';
    }
  }

  getFormat(duration: Duration): string {
    if (duration.years) {
      return 'years';
    }
    if (duration.months) {
      return 'months';
    }
    if (duration.weeks) {
      return 'weeks';
    }
    if (duration.days) {
      return 'days';
    }
    if (duration.hours) {
      return 'hours';
    }
    if (duration.minutes) {
      return 'minutes';
    }
    if (duration.seconds) {
      return 'seconds';
    }
    return 'seconds';
  }
}
