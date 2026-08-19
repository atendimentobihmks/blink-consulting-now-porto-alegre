# Segurança e Conformidade — Consulting Now (Porto Alegre / RS)

Este projeto segue rigorosamente os padrões de segurança e conformidade da BMK e da Consulting Now:

1. **LGPD / Proteção de Dados:** Nenhum dado pessoal sensível é coletado sem consentimento explícito.
2. **Segurança de Cabeçalhos HTTP:** Configurado via `vercel.json` com proteção contra clickjacking (`X-Frame-Options: DENY`), injeção MIME (`nosniff`) e XSS.
3. **Links Externos Seguros:** Todas as tags `<a>` externas utilizam `rel="noopener noreferrer"`.
4. **Armazenamento Seguro:** Não há gravação desnecessária de cookies ou rastreadores invasivos.
