import { SecurityDescriptor } from './types';
import { SecurityError } from '../errors';
import * as crypto from 'crypto';

export interface ProtectionOptions {
  password?: string;
  structure?: boolean;
  windows?: boolean;
  workbook?: boolean;
  ranges?: Map<string, {
    password?: string;
    users?: string[];
    permissions: Array<'select' | 'edit' | 'format' | 'delete'>;
  }>;
}

export class ProtectionManager {
  private hashAlgorithm = 'sha256';
  private iterations = 100000;

  async protect(options: ProtectionOptions): Promise<SecurityDescriptor> {
    try {
      const descriptor: SecurityDescriptor = {
        users: [],
        groups: []
      };

      if (options.password) {
        const salt = crypto.randomBytes(16);
        const hash = await this.hashPassword(options.password, salt);
        descriptor.password = hash;
      }

      if (options.ranges) {
        descriptor.ranges = new Map();
        for (const [range, protection] of options.ranges) {
          const rangeHash = protection.password ? 
            await this.hashPassword(protection.password, crypto.randomBytes(16)) :
            undefined;

          descriptor.ranges.set(range, {
            password: rangeHash,
            users: protection.users,
            permissions: protection.permissions
          });
        }
      }

      return descriptor;
    } catch (error) {
      throw new SecurityError('Protection setup failed', error);
    }
  }

  async validateProtection(
    descriptor: SecurityDescriptor,
    password?: string,
    range?: string
  ): Promise<boolean> {
    try {
      if (!descriptor) return false;

      // Validate workbook password if set
      if (descriptor.password && password) {
        const isValid = await this.validatePassword(password, descriptor.password);
        if (!isValid) return false;
      }

      // Validate range protection if specified
      if (range && descriptor.ranges) {
        const rangeProtection = descriptor.ranges.get(range);
        if (!rangeProtection) return true;

        if (rangeProtection.password && password) {
          return this.validatePassword(password, rangeProtection.password);
        }
      }

      return true;
    } catch (error) {
      throw new SecurityError('Protection validation failed', error);
    }
  }

  private async hashPassword(password: string, salt: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        this.iterations,
        32,
        this.hashAlgorithm,
        (err, key) => {
          if (err) reject(new SecurityError('Password hashing failed', err));
          else resolve(key.toString('hex') + ':' + salt.toString('hex'));
        }
      );
    });
  }

  private async validatePassword(password: string, hash: string): Promise<boolean> {
    const [storedHash, saltHex] = hash.split(':');
    const salt = Buffer.from(saltHex, 'hex');

    const calculatedHash = await this.hashPassword(password, salt);
    return calculatedHash.split(':')[0] === storedHash;
  }

  hasPermission(
    descriptor: SecurityDescriptor,
    range: string,
    user: string,
    permission: string
  ): boolean {
    const rangeProtection = descriptor.ranges?.get(range);
    if (!rangeProtection) return true;

    if (!rangeProtection.users?.includes(user)) return false;
    return rangeProtection.permissions.includes(permission as any);
  }
}