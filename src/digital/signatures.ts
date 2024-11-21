import { DigitalSignatureState } from '../../spec/DigitalSignatures';

export function createDigitalSignature(name: string, email: string): DigitalSignatureState {
  return {
    signatures: [{
      id: `sig_${Date.now()}`,
      type: 'invisible',
      signer: {
        name,
        email
      },
      certificate: {
        type: 'self',
        data: new Uint8Array(),
        issuer: 'Self',
        validFrom: new Date(),
        validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        serialNumber: '1'
      },
      properties: {},
      validation: {
        isValid: false,
        chainValid: false,
        trustValid: false,
        timeValid: false
      }
    }],
    settings: {
      validation: {
        checkRevocation: true,
        requireTimestamp: true,
        trustSettings: {
          trustedIssuers: [],
          trustedRoots: [],
          verifyChain: true
        }
      },
      display: {
        showSignatureLine: true,
        showValidationStatus: true,
        showDetails: true
      }
    },
    lines: []
  };
}

export function addSignatureLine(state: DigitalSignatureState, signer: string, title?: string): DigitalSignatureState {
  return {
    ...state,
    lines: [...state.lines, {
      id: `line_${Date.now()}`,
      suggested: {
        signer,
        signerTitle: title
      },
      appearance: {
        showDate: true,
        allowComments: true
      },
      status: 'unsigned'
    }]
  };
}