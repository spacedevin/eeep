export interface EncryptionState {
  type: 'none' | 'rc4' | 'aes128' | 'aes256';
  password?: string;
  saltValue?: string;
  spinCount?: number;
  keyBits?: number;
  blockSize?: number;
  hashAlgorithm?: 'SHA1' | 'SHA256' | 'SHA384' | 'SHA512';
  providerType?: 'rc4' | 'aes';
  cipherMode?: 'cbc' | 'cfb';
  flags?: {
    enforceKeyLength?: boolean;
    includeStructure?: boolean;
    includeWindows?: boolean;
    includeWorkbook?: boolean;
  };
}

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