/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Instance {
  /** A unique ID for the VPS Instance. */
  id: string;

  /** The Operating System name. */
  os: string;

  /** The amount of RAM in MB. */
  ram: number;

  /** The size of the disk in GB. */
  disk: number;

  /** The main IPv4 address. */
  main_ip: string;

  /** Number of vCPUs. */
  vcpu_count: number;

  /** The Region id where the Instance is located. */
  region: string;

  /** The default password assigned at deployment. Only available for ten minutes after deployment. */
  default_password: string;

  /** The date this instance was created. */
  date_created: string;

  /** The current status. */
  status: InstanceStatus;

  /** The power-on status. */
  power_status: InstancePowerStatus;

  /** The server health status. */
  server_status: InstanceServerStatus;

  /** Monthly bandwidth quota in GB. */
  allowed_bandwidth: number;

  /** The IPv4 netmask in dot-decimal notation. */
  netmask_v4: string;

  /** The gateway IP address. */
  gateway_v4: string;

  /** An array of IPv6 objects. */
  v6_networks: any[];

  /** The hostname for this instance. */
  hostname: string;

  /** The user-supplied label for this instance. */
  label: string;

  /** The internal IP used by this instance, if set. */
  internal_ip: string;

  /** HTTPS link to the Vultr noVNC Web Console. */
  kvm: string;

  /** The Operating System id used by this instance. */
  os_id: number;

  /** The Application id used by this instance. */
  app_id: number;

  /** The Application image_id used by this instance. */
  image_id: string;

  /** The Firewall Group id linked to this Instance. */
  firewall_group_id: string;

  features: InstanceFeatures[];

  /** A unique ID for the Plan. */
  plan: string;

  /** Tags to apply to the instance */
  tags: string[];
}

type InstanceStatus = 'active' | 'pending' | 'suspended' | 'resizing';
type InstancePowerStatus = 'running' | 'stopped';
type InstanceServerStatus = 'none' | 'locked' | 'installingbooting' | 'ok';
type InstanceFeatures = 'auto_backups' | 'ipv6' | 'ddos_protection';

export interface Regions {
  /** Array of objects (region) [ items ] **/
  regions: Region[];

  /** The meta information object. See Meta and Pagination for more information. */
  meta: RegionMeta;
}

export interface Region {
  /** A unique ID for the Region. */
  id: string;

  /** The two-letter country code for this Region. */
  country: string;

  /** An array of product features available in this Region. */
  options: string[];

  /** The name of the continent for this Region. */
  continent: string;

  /** The name of the city for this Region. */
  city: string;
}

export interface RegionMeta {
  /**
   *
   * Total objects available in the list.
   * This value may be greater than the number of
   * objects returned if per_page is set.
   *
   * */
  total: number;

  /** Cursor values for pagination. */
  links: {
    /** Cursor value for the next page. */
    next: string;

    /** Cursor value for the previous page. */
    prev: string;
  };
}
