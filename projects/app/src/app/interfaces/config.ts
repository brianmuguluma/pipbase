export interface ProjectConfig {
  interest: {
    cap: boolean;
    rate: number;
  };
  killSwitch: boolean;
  risk: {
    percentage: number;
    leverage: number;
  };
}
