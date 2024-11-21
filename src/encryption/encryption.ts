import { EncryptionState } from '../../spec/Encryption';

export interface SecurityDescriptor {
  users: Array<{
    name: string;
    sid?: string;
    permissions: Array<'read' | 'write' | 'delete' | 'change'>;
  }>;
  groups: Array<{
    name: string;
    sid?: string;
    permissions: Array<'read' | 'write' | 'delete' | 'change'>;
  }>;
  ranges?: Map<string, {
    password?: string;
    users?: string[];
    groups?: string[];
    permissions: Array<'select' | 'edit' | 'format' | 'delete'>;
  }>;
  digitalSignature?: {
    certificate: string;
    timestamp?: Date;
    signatureLine?: {
      suggestedSigner?: string;
      suggestedSignerEmail?: string;
      suggestedSignerTitle?: string;
      signatureProviderUrl?: string;
      signatureProviderId?: string;
    };
  };
}

export function createEncryption(type: 'aes128' | 'aes256'): EncryptionState {
  return {
    type,
    password: undefined,
    saltValue: undefined,
    spinCount: 100000,
    keyBits: type === 'aes256' ? 256 : 128,
    blockSize: 16,
    hashAlgorithm: 'SHA256',
    providerType: 'aes',
    cipherMode: 'cbc',
    flags: {
      enforceKeyLength: true,
      includeStructure: true,
      includeWindows: true,
      includeWorkbook: true
    }
  };
}

export function createSecurityDescriptor(): SecurityDescriptor {
  return {
    users: [],
    groups: [],
    ranges: new Map(),
    digitalSignature: undefined
  };
}

export function addUserPermission(descriptor: SecurityDescriptor, name: string, permissions: Array<'read' | 'write' | 'delete' | 'change'>): SecurityDescriptor {
  return {
    ...descriptor,
    users: [...descriptor.users, {
      name,
      permissions
    }]
  };
}