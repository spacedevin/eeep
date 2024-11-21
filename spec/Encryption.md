# EPPlus Encryption Specification

## Encryption Types
- Workbook Protection
  - Structure protection
  - Window protection
  - Password protection
- Worksheet Protection
  - Cell protection
  - Object protection
  - Scenario protection
- Range Protection
  - User permissions
  - Password protection
  - Allow edit ranges

## Encryption Methods
- Legacy RC4
  - Basic encryption
  - Compatibility mode
- AES Encryption
  - 128-bit
  - 256-bit
  - Custom key length
- SHA Hashing
  - Password hashing
  - Key derivation
  - Salt generation

## Security Features
- Digital Signatures
  - Certificate-based
  - Timestamp authority
  - Signature line
- Permission Management
  - User roles
  - Group permissions
  - Range permissions
- Document Recovery
  - Password recovery
  - Backup options
  - Emergency access

## Implementation Priority
1. Basic password protection
2. AES encryption
3. Worksheet protection
4. Range protection
5. Advanced security