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
  password?: string;
}