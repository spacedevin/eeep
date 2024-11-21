# EPPlus Events Specification

## Event Types
- Workbook Events
  - Open
  - BeforeSave
  - AfterSave
  - BeforeClose
  - Calculate
  - ProtectionChange
- Worksheet Events
  - SelectionChange
  - BeforeRightClick
  - BeforeDoubleClick
  - Change
  - Calculate
  - ProtectionChange
- Range Events
  - Change
  - Calculate
  - Validate
  - BeforeEdit
  - AfterEdit

## Event Handlers
- Handler Registration
  - Add handler
  - Remove handler
  - Clear handlers
  - Priority handling
- Event Arguments
  - Source object
  - Event data
  - Cancel options
  - Custom data

## Event Flow
- Event Bubbling
  - Cell to range
  - Range to worksheet
  - Worksheet to workbook
- Event Cancellation
  - Cancel options
  - Default behavior
  - Error handling

## Implementation Priority
1. Basic workbook events
2. Worksheet events
3. Range events
4. Event bubbling
5. Advanced features