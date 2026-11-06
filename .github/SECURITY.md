# Security policy

## Supported versions

This repository is an alpha library prototype. Review its implementation and adapter support before adopting it; WalletConnect is currently incomplete.

## Reporting a vulnerability

Please report suspected vulnerabilities privately through
[GitHub's private vulnerability reporting](https://github.com/NexaStellar/stellar-wallet-kit/security/advisories/new).
Do not include exploit details, private keys, seed phrases, or account credentials in a public issue.

Reports should include the affected commit or release, impact, and concise reproduction steps. The maintainers will acknowledge reports and coordinate disclosure after a fix is available.

## Safe handling

Never commit secrets or credentials. Treat wallet transaction XDR and third-party provider responses as untrusted input, and verify network and transaction intent before requesting signatures.
