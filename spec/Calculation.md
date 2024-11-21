# EPPlus Calculation Specification

## Calculation Types
- Automatic Calculation
  - On value change
  - On formula change
  - On workbook open
  - On sheet change
- Manual Calculation
  - On demand
  - Selected range
  - Full recalc
  - Partial recalc
- Dependency Tracking
  - Direct precedents
  - Direct dependents
  - Calculation chain
  - Circular references

## Calculation Features
- Formula Processing
  - Parse formulas
  - Evaluate formulas
  - Handle errors
  - Array formulas
- Performance
  - Parallel calculation
  - Caching
  - Volatile functions
  - Array optimization

## Implementation Priority
1. Basic calculation
2. Formula processing
3. Dependency tracking
4. Performance optimization