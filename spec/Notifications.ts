export interface NotificationState {
  system: {
    queue: Array<{
      id: string;
      type: 'status' | 'error' | 'warning' | 'success';
      message: string;
      timestamp: Date;
      priority: number;
      duration?: number;
      dismissible: boolean;
    }>;
    settings: {
      maxQueue: number;
      defaultDuration: number;
      groupSimilar: boolean;
    };
  };

  user: {
    active: Map<string, {
      type: string;
      content: string;
      created: Date;
      expires?: Date;
      actions?: Array<{
        label: string;
        handler: string;
      }>;
    }>;
    history: Array<{
      id: string;
      type: string;
      message: string;
      timestamp: Date;
      acknowledged: boolean;
    }>;
  };

  display: {
    position: {
      vertical: 'top' | 'bottom';
      horizontal: 'left' | 'right' | 'center';
    };
    animation: {
      enter: string;
      exit: string;
      duration: number;
    };
    stacking: {
      limit: number;
      direction: 'up' | 'down';
      spacing: number;
    };
    style: {
      theme: string;
      icons: boolean;
      width: number;
      maxHeight?: number;
    };
  };
}