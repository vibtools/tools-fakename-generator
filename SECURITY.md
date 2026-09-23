# Security Policy

## Reporting Security Vulnerabilities

The **Vib Tools** team takes the security and reliability of our open-source software seriously. If you discover a security vulnerability, please do **NOT** open a public issue.

Instead, please send an encrypted or direct email to:
📧 **[security@vib.tools](mailto:security@vib.tools)** or **[support@vib.tools](mailto:support@vib.tools)**

Please include:
- A description of the vulnerability and its potential impact.
- Clear steps or proof-of-concept scripts to reproduce the issue.
- Your suggested fix, if available.

We commit to acknowledging your disclosure within **24 hours** and providing a fix or timeline within **48 business hours**.

---

## Synthetic Data & Zero-Retention Security Architecture

1. **Client-Side Generation:** All identities and test card credentials are synthesized entirely in client memory (RAM).
2. **Zero Server Logging:** No generated persona details, phone numbers, or addresses are stored in any database.
3. **Non-Transactional Numbers:** All synthesized payment card numbers are computed purely with the ISO/IEC 7812 Luhn algorithm for input field testing; they carry zero balance and have no associated merchant accounts.
