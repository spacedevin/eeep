import { VBAState } from '../../../spec/VBA';

export interface MacroEvent {
  type: string;
  target: string;
  action: string;
  parameters: unknown[];
}

export interface MacroRecording {
  name: string;
  code: string;
  timestamp: Date;
  events: MacroEvent[];
}

export class MacroRecorder {
  private recording: MacroRecording | null = null;
  private events: MacroEvent[] = [];

  startRecording(name: string): void {
    this.recording = {
      name,
      code: '',
      timestamp: new Date(),
      events: []
    };
  }

  stopRecording(): MacroRecording | null {
    if (!this.recording) return null;
    
    this.recording.events = [...this.events];
    this.recording.code = this.generateCode();
    
    const result = { ...this.recording };
    this.recording = null;
    this.events = [];
    
    return result;
  }

  recordEvent(type: string, target: string, action: string, ...parameters: unknown[]): void {
    if (!this.recording) return;

    this.events.push({
      type,
      target,
      action,
      parameters
    });
  }

  private generateCode(): string {
    if (!this.events.length || !this.recording) return '';

    let code = `Sub ${this.recording.name}()\n`;
    code += '  On Error Resume Next\n\n';

    for (const event of this.events) {
      code += this.generateEventCode(event);
    }

    code += '\nEnd Sub';
    return code;
  }

  private generateEventCode(event: MacroEvent): string {
    let code = '  ';

    switch (event.type) {
      case 'cell':
        code += this.generateCellCode(event);
        break;
      case 'range':
        code += this.generateRangeCode(event);
        break;
      case 'sheet':
        code += this.generateSheetCode(event);
        break;
      case 'workbook':
        code += this.generateWorkbookCode(event);
        break;
      default:
        code += this.generateCustomCode(event);
    }

    return code + '\n';
  }

  private generateCellCode(event: MacroEvent): string {
    const params = event.parameters.map(param => this.formatParameter(param)).join(', ');
    return `Range("${event.target}").${event.action} ${params}`;
  }

  private generateRangeCode(event: MacroEvent): string {
    const params = event.parameters.map(param => this.formatParameter(param)).join(', ');
    return `Range("${event.target}").${event.action} ${params}`;
  }

  private generateSheetCode(event: MacroEvent): string {
    const params = event.parameters.map(param => this.formatParameter(param)).join(', ');
    return `Sheets("${event.target}").${event.action} ${params}`;
  }

  private generateWorkbookCode(event: MacroEvent): string {
    const params = event.parameters.map(param => this.formatParameter(param)).join(', ');
    return `ThisWorkbook.${event.action} ${params}`;
  }

  private generateCustomCode(event: MacroEvent): string {
    const params = event.parameters.map(param => this.formatParameter(param)).join(', ');
    return `${event.target}.${event.action} ${params}`;
  }

  private formatParameter(param: unknown): string {
    if (typeof param === 'string') return `"${param}"`;
    if (typeof param === 'boolean') return param ? 'True' : 'False';
    if (param === null || param === undefined) return 'Empty';
    return String(param);
  }
}