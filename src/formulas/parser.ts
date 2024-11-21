import { FormulaError } from '../errors';
import { HyperFormula } from 'hyperformula';

export interface Token {
  type: 'number' | 'string' | 'operator' | 'function' | 'reference' | 'separator' | 'parenthesis';
  value: string;
  position: number;
}

export interface ASTNode {
  type: 'number' | 'string' | 'operator' | 'function' | 'reference';
  value: string;
  children?: ASTNode[];
}

export class FormulaParser {
  private hf: HyperFormula;

  constructor() {
    this.hf = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3'
    });
  }

  parse(formula: string): ASTNode {
    try {
      // Remove leading equals sign if present
      formula = formula.startsWith('=') ? formula.substring(1) : formula;
      
      // Tokenize the formula
      const tokens = this.tokenize(formula);
      
      // Build AST
      return this.buildAST(tokens);
    } catch (error) {
      throw new FormulaError('Error parsing formula', error);
    }
  }

  private tokenize(formula: string): Token[] {
    const tokens: Token[] = [];
    let position = 0;

    while (position < formula.length) {
      const char = formula[position];

      // Skip whitespace
      if (/\s/.test(char)) {
        position++;
        continue;
      }

      // Numbers
      if (/\d/.test(char)) {
        let value = '';
        while (position < formula.length && /[\d.]/.test(formula[position])) {
          value += formula[position++];
        }
        tokens.push({ type: 'number', value, position: position - value.length });
        continue;
      }

      // Strings
      if (char === '"') {
        let value = '';
        position++; // Skip opening quote
        while (position < formula.length && formula[position] !== '"') {
          value += formula[position++];
        }
        position++; // Skip closing quote
        tokens.push({ type: 'string', value, position: position - value.length - 2 });
        continue;
      }

      // Operators
      if (/[+\-*\/^=<>]/.test(char)) {
        tokens.push({ type: 'operator', value: char, position });
        position++;
        continue;
      }

      // Functions and references
      if (/[A-Za-z]/.test(char)) {
        let value = '';
        while (position < formula.length && /[A-Za-z0-9_]/.test(formula[position])) {
          value += formula[position++];
        }
        const type = formula[position] === '(' ? 'function' : 'reference';
        tokens.push({ type, value, position: position - value.length });
        continue;
      }

      // Parentheses and separators
      if (/[(),]/.test(char)) {
        const type = char === ',' ? 'separator' : 'parenthesis';
        tokens.push({ type, value: char, position });
        position++;
        continue;
      }

      // Unknown character
      throw new FormulaError(`Unexpected character: ${char} at position ${position}`);
    }

    return tokens;
  }

  private buildAST(tokens: Token[]): ASTNode {
    let position = 0;

    const parseExpression = (): ASTNode => {
      let node = parseTerm();

      while (position < tokens.length) {
        const token = tokens[position];
        if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
          position++;
          const right = parseTerm();
          node = {
            type: 'operator',
            value: token.value,
            children: [node, right]
          };
        } else {
          break;
        }
      }

      return node;
    };

    const parseTerm = (): ASTNode => {
      let node = parseFactor();

      while (position < tokens.length) {
        const token = tokens[position];
        if (token.type === 'operator' && (token.value === '*' || token.value === '/')) {
          position++;
          const right = parseFactor();
          node = {
            type: 'operator',
            value: token.value,
            children: [node, right]
          };
        } else {
          break;
        }
      }

      return node;
    };

    const parseFactor = (): ASTNode => {
      const token = tokens[position++];

      switch (token.type) {
        case 'number':
        case 'string':
        case 'reference':
          return { type: token.type, value: token.value };

        case 'function':
          const args: ASTNode[] = [];
          if (tokens[position].type === 'parenthesis' && tokens[position].value === '(') {
            position++; // Skip opening parenthesis
            while (position < tokens.length && tokens[position].type !== 'parenthesis') {
              args.push(parseExpression());
              if (tokens[position].type === 'separator') {
                position++; // Skip comma
              }
            }
            position++; // Skip closing parenthesis
          }
          return {
            type: 'function',
            value: token.value,
            children: args
          };

        case 'parenthesis':
          if (token.value === '(') {
            const node = parseExpression();
            position++; // Skip closing parenthesis
            return node;
          }
          break;
      }

      throw new FormulaError(`Unexpected token: ${JSON.stringify(token)}`);
    };

    return parseExpression();
  }
}