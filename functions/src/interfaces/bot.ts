import { OandaCredentials } from './user';

export interface Bot {
  id?: string;
  name: string;
  credentials: OandaCredentials;
  isPaperTrading: boolean;
  displayName: string;
  displayPrecision: number;
  status: 'running' | 'stopped' | 'pending';
}

export type CommandType = 'ping' | 'stop' | 'start' | 'delete';
