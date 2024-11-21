import { VBAState } from '../../../spec/VBA';
import { MacroRecording } from './recorder';

export class MacroValidator {
  validateMacro(code: string): boolean {
    try {
      // Check basic structure
      if (!this.hasValidStructure(code)) return false;

      // Check for required elements
      if (!this.hasRequiredElements(code)) return false;

      // Check for syntax errors
      if (!this.hasSyntaxErrors(code)) return false;

      return true;
    } catch {
      return false;
    }
  }

  validateRecording(recording: MacroRecording): boolean {
    try {
      // Validate recording metadata
      if (!this.isValidRecordingMetadata(recording)) return false;

      // Validate events
      if (!this.areValidEvents(recording.events)) return false;

      // Validate generated code
      if (!this.validateMacro(recording.code)) return false;

      return true;
    } catch {
      return false;
    }
  }

  private hasValidStructure(code: string): boolean {
    const subMatch = code.match(/Sub\s+(\w+)\s*\((.*?)\)/);
    const endSubMatch = code.match(/End Sub/);
    return !!(subMatch && endSubMatch);
  }

  private hasRequiredElements(code: string): boolean {
    // Check for minimum required elements
    return code.includes('Sub') && 
           code.includes('End Sub') && 
           code.trim().length > 15;
  }

  private hasSyntaxErrors(code: string): boolean {
    // Basic syntax validation
    try {
      const lines = code.split('\n');
      let blockDepth = 0;

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('Sub ')) blockDepth++;
        if (trimmed === 'End Sub') blockDepth--;
        if (blockDepth < 0) return false;
      }

      return blockDepth === 0;
    } catch {
      return false;
    }
  }

  private isValidRecordingMetadata(recording: MacroRecording): boolean {
    return !!(
      recording.name &&
      recording.timestamp &&
      recording.code &&
      Array.isArray(recording.events)
    );
  }

  private areValidEvents(events: Array<{
    type: string;
    target: string;
    action: string;
    parameters: any[];
  }>): boolean {
    return events.every(event => 
      event.type &&
      event.target &&
      event.action &&
      Array.isArray(event.parameters)
    );
  }
}