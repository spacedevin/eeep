export interface DigitalSignatureState {
  signatures: Array<{
    id: string;
    type: 'visible' | 'invisible';
    signer: {
      name: string;
      email?: string;
      title?: string;
      organization?: string;
    };
    certificate: {
      type: 'self' | 'trusted';
      data: Uint8Array;
      issuer: string;
      validFrom: Date;
      validTo: Date;
      serialNumber: string;
    };
    timestamp?: {
      time: Date;
      authority: string;
      token: string;
    };
    properties: {
      purpose?: string;
      comments?: string;
      commitmentType?: string;
      signatureType?: string;
    };
    validation: {
      isValid: boolean;
      chainValid: boolean;
      trustValid: boolean;
      timeValid: boolean;
      errors?: string[];
    };
  }>;

  settings: {
    validation: {
      checkRevocation: boolean;
      requireTimestamp: boolean;
      trustSettings: {
        trustedIssuers: string[];
        trustedRoots: string[];
        verifyChain: boolean;
      };
    };
    display: {
      showSignatureLine: boolean;
      showValidationStatus: boolean;
      showDetails: boolean;
    };
  };

  lines: Array<{
    id: string;
    suggested: {
      signer: string;
      signerTitle?: string;
      signerEmail?: string;
    };
    appearance: {
      showDate: boolean;
      allowComments: boolean;
      instructions?: string;
    };
    status: 'unsigned' | 'signed' | 'invalid';
  }>;
}