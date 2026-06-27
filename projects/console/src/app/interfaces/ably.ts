export interface Occupancy {
  /** The number of connections */
  connections: number;
  /** The number of connections that are authorized to publish */
  publishers: number;
  /** The number of connections that are authorized to subscribe to messages */
  subscribers: number;
  /** The number of connections that are authorized to subscribe to presence messages */
  presenceConnections: number;
  /** The number of connections that are authorized to enter members into the presence channel */
  presenceMembers: number;
  /** The number of members currently entered into the presence channel */
  presenceSubscribers: number;
}
