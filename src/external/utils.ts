import { ConnectionSettings, FileSourceOptions } from './types';

export function buildConnectionString(settings: ConnectionSettings): string {
  const parts = [];
  for (const [key, value] of Object.entries(settings)) {
    if (value !== undefined && value !== null) {
      parts.push(`${key}=${value}`);
    }
  }
  return parts.join(';');
}

export function parseConnectionString(connectionString: string): Partial<ConnectionSettings> {
  const settings: Partial<ConnectionSettings> = {
    timeout: 30000,
    pooling: true
  };

  const parts = connectionString.split(';');
  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key && value) {
      const trimmedKey = key.trim() as keyof ConnectionSettings;
      if (trimmedKey) {
        settings[trimmedKey] = value.trim() as any;
      }
    }
  }

  return settings;
}

export function buildFileOptions(options?: Partial<FileSourceOptions>): FileSourceOptions {
  return {
    encoding: options?.encoding || 'utf8',
    delimiter: options?.delimiter || ',',
    hasHeader: options?.hasHeader ?? true,
    schema: options?.schema
  };
}

export function formatQueryParams(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}