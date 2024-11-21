import { SecurityDescriptor } from './types';

export interface AuditEvent {
  timestamp: Date;
  user: string;
  action: string;
  target: string;
  result: 'success' | 'failure';
  details?: any;
}

export class SecurityAuditor {
  private events: AuditEvent[] = [];
  private maxEvents: number = 10000;

  logEvent(event: AuditEvent): void {
    this.events.push(event);
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
  }

  getEvents(
    filter?: {
      user?: string;
      action?: string;
      target?: string;
      result?: 'success' | 'failure';
      startDate?: Date;
      endDate?: Date;
    }
  ): AuditEvent[] {
    let filtered = [...this.events];

    if (filter?.user) {
      filtered = filtered.filter(e => e.user === filter.user);
    }
    if (filter?.action) {
      filtered = filtered.filter(e => e.action === filter.action);
    }
    if (filter?.target) {
      filtered = filtered.filter(e => e.target === filter.target);
    }
    if (filter?.result) {
      filtered = filtered.filter(e => e.result === filter.result);
    }
    if (filter?.startDate) {
      filtered = filtered.filter(e => e.timestamp >= filter.startDate!);
    }
    if (filter?.endDate) {
      filtered = filtered.filter(e => e.timestamp <= filter.endDate!);
    }

    return filtered;
  }

  generateReport(
    startDate: Date,
    endDate: Date
  ): {
    totalEvents: number;
    successCount: number;
    failureCount: number;
    userStats: Map<string, {
      total: number;
      success: number;
      failure: number;
    }>;
    actionStats: Map<string, number>;
  } {
    const events = this.getEvents({ startDate, endDate });
    const userStats = new Map<string, { total: number; success: number; failure: number }>();
    const actionStats = new Map<string, number>();

    let successCount = 0;
    let failureCount = 0;

    for (const event of events) {
      // Update user stats
      const userStat = userStats.get(event.user) || { total: 0, success: 0, failure: 0 };
      userStat.total++;
      if (event.result === 'success') {
        userStat.success++;
        successCount++;
      } else {
        userStat.failure++;
        failureCount++;
      }
      userStats.set(event.user, userStat);

      // Update action stats
      actionStats.set(event.action, (actionStats.get(event.action) || 0) + 1);
    }

    return {
      totalEvents: events.length,
      successCount,
      failureCount,
      userStats,
      actionStats
    };
  }

  clearEvents(): void {
    this.events = [];
  }

  setMaxEvents(max: number): void {
    this.maxEvents = max;
    if (this.events.length > max) {
      this.events = this.events.slice(-max);
    }
  }

  getMaxEvents(): number {
    return this.maxEvents;
  }

  getCurrentEventCount(): number {
    return this.events.length;
  }
}