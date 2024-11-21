export interface LicenseState {
  type: 'commercial' | 'evaluation' | 'none';
  status: 'active' | 'expired' | 'invalid';
  
  details: {
    key: string;
    product: string;
    version: string;
    licensee: string;
    organization?: string;
    seats?: number;
    expiration?: Date;
  };
  
  features: Map<string, {
    enabled: boolean;
    restrictions?: {
      maxRows?: number;
      maxSheets?: number;
      maxFiles?: number;
    };
  }>;
  
  usage: {
    tracking: boolean;
    metrics: Map<string, {
      count: number;
      lastUsed: Date;
    }>;
    environment: {
      platform: string;
      version: string;
      machine: string;
    };
  };
}