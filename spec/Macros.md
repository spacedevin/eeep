# EPPlus Macros Specification

## Macro Types
- Workbook Macros
  - Auto_Open
  - Auto_Close
  - Auto_Activate
  - Auto_Deactivate
- Worksheet Macros
  - Worksheet_Calculate
  - Worksheet_Change
  - Worksheet_SelectionChange
  - Worksheet_BeforeDoubleClick
  - Worksheet_BeforeRightClick
- Range Macros
  - Range_Change
  - Range_Calculate
  - Range_Select

## Macro Security
- Trust Settings
  - Macro enabled workbooks
  - Digital signatures
  - Trusted locations
  - Security levels
- Code Access
  - View code
  - Modify code
  - Execute code
  - Debug code

## Implementation Priority
1. Basic macro support
2. Security settings
3. Event handling
4. Advanced features