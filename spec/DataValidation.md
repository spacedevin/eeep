# EPPlus Data Validation Specification

## Validation Types
- List Validation
  - Static list
  - Range list
  - Formula list
  - External list
- Numeric Validation
  - Whole number
  - Decimal
  - Greater than
  - Less than
  - Between
  - Not between
- Date/Time Validation
  - Date
  - Time
  - Before
  - After
  - Between
  - Not between
- Text Length Validation
  - Minimum length
  - Maximum length
  - Exact length
  - Between lengths
- Custom Validation
  - Formula based
  - Complex conditions
  - Cross-sheet validation
  - Multi-cell validation

## Validation Settings
- Input Message
  - Title
  - Message text
  - Show/hide on selection
- Error Alert
  - Style (Stop, Warning, Information)
  - Title
  - Message text
  - Custom buttons
- Validation Behavior
  - Allow blank
  - Show input message
  - Show error message
  - Ignore blank cells
  - Drop-down arrow
  - In-cell dropdown

## Implementation Priority
1. Basic list validation
2. Numeric validation
3. Date/time validation
4. Text length validation
5. Custom validation