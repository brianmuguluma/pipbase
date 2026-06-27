export interface Bot {
  status: BotStatus;
  notifications: {
    onStart: boolean;
    onStop: boolean;
    onPing: boolean;
  };
}

export type BotStatus = 'pending' | 'running' | 'stopped';

export type BotCommand = 'ping' | 'stop' | 'start';
