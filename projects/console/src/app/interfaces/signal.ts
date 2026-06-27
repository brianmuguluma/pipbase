import { Timestamp } from '@angular/fire/firestore';
import { UserRecord } from './user';
import {
  OrderType,
  StopLossDetails,
  TakeProfitDetails,
  TimeInForce,
  TrailingStopLossDetails,
} from './oanda';
import { Occupancy } from './ably';

export interface Signal {
  id?: string;
  user?: Partial<UserRecord>;
  command: Command;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  notes?: string | undefined | null;
  occupancy?: Occupancy;
}

type Side = 'long' | 'short';

type Command =
  | 'CREATE_ORDER'
  | 'UPDATE_DEPENDANTS'
  | 'CLOSE_POSITION'
  | 'UPDATE_CONFIG'
  | 'TAKE_PARTIAL_PROFIT'
  | 'CANCEL_FUTURE_ORDERS'
  | 'REINSTALL';

export type BotCommand = 'START_BOT' | 'STOP_BOT' | 'PING_BOT';

export interface OrderSignal extends Signal {
  type: OrderType | undefined;
  side: string | undefined | null;
  price?: string | undefined | null;
  timeInForce?: TimeInForce;
  gtdTime?: string | undefined;
  command: SignalCommand;
  percentage: number;
  instrument: string | undefined;
  stopLossOnFill?: StopLossDetails;
  trailingStopLossOnFill?: TrailingStopLossDetails;
  takeProfitOnFill?: TakeProfitDetails;
}

export interface TakePartialProfitSignal extends Signal {
  instrument: string;
  percentage: number;
}

export type SignalCommand =
  | 'CREATE_ORDER'
  | 'UPDATE_DEPENDANTS'
  | 'CLOSE_POSITION';

export interface DependantSignal extends Signal {
  side: Side;
  command: SignalCommand;
  instrument: string;
  stopLoss?: StopLossDetails;
  trailingStopLoss?: TrailingStopLossDetails;
  takeProfit?: TakeProfitDetails;
}

export interface PositionSignal extends Signal {
  command: SignalCommand;
  percentage: number;
  instrument: string;
}

export interface InstanceSignal extends Signal {
  command: InstanceCommand;
}

export interface TokenSignal extends Signal {
  token: string;
}

export type InstanceCommand = 'REINSTALL';

// export interface ProjectConfigSignal extends Signal, ProjectConfig {}
