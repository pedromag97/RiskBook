# RiskBook — briefing para Claude Design

**Objetivo: POLIR o que existe.** Mantém a estrutura, o layout de 3 colunas e a
identidade atual. Refina espaçamento, tipografia, cor, hierarquia e os
componentes novos. Não reinventes a navegação nem mudes funcionalidades.

## O produto
RiskBook — "o diário de trading & calculadora de lotes mais simples".
Calculadora de position sizing + trade journal para traders de CFD / prop firms
(FTMO e afins). Ficheiro HTML único, Tailwind via CDN, JS vanilla, sem build.
Funciona offline (PWA), dados só em `localStorage`, 4 idiomas (EN/FR/ES/PT).

## Restrições técnicas (obrigatórias)
- **Um único `index.html`.** Sem framework, sem build, sem npm.
- **Tailwind via CDN** + um bloco `<style>` com as classes próprias. Podes
  adicionar/alterar classes utilitárias e o CSS do bloco.
- Única dependência externa além do Tailwind: `html2canvas` (exportar imagem) e
  a fonte Inter (Google Fonts). **Não acrescentes bibliotecas** — os gráficos
  são SVG escrito à mão de propósito.
- Todo o texto visível vem do dicionário i18n via `data-i18n` / `t()`. Se mexeres
  em texto, mantém o mecanismo e as 4 línguas.
- Tem de continuar legível em **~250px de largura de coluna** (3 colunas lado a
  lado) e em telemóvel. **Nada pode gerar scroll horizontal.**

## Linguagem visual atual (ponto de partida)
- Fundo da página `#f3f4f6`; contentor branco, `max-width: 1160px`, sombra suave.
- Cartão de coluna `.col-card`: fundo `#f9fafb`, borda `#e5e7eb`, raio 12px, padding 1rem.
- Cores: primária `#3b82f6` (azul), sucesso `#10b981` / `#059669` (verde),
  perigo `#ef4444` / `#dc2626` (vermelho), texto `#1f2937`, secundário `#6b7280`,
  ténue `#9ca3af`.
- Tipografia: **Inter**. Títulos de secção `text-xl font-bold`. Rótulos de
  micro-secção: `text-[10px] uppercase font-bold` a cinzento.
- Inputs `.input-field`: fundo `#f9fafb`, borda `#d1d5db`, raio 8px, focus azul com anel.
- Botões segmentados `.seg-btn` (ativo a azul cheio), `.tool-btn` (secundário com
  ícone SVG + texto), `.act-btn` (ações pequenas nos cartões de trade).
- Modais próprios (substituem prompt/confirm/alert): overlay escuro com blur,
  cartão branco raio 16px, animação de entrada subtil.
- Ícones: SVG inline com `stroke="currentColor"`, `stroke-width="2"`.
- Logo: livro azul com marcador (`icon.svg`).

## Estrutura (3 colunas, título "RiskBook" a abraçar tudo)

### Coluna 1 — "Dados da Trade" (`#inputs`)
Símbolo · Tipo de ativo (Forex/Índices/Cripto/Ações/Comodities, segmentado) ·
Prioridade (Alta/Média/Baixa) · Estilo (Day/Swing) · Carteira e Perda Máx (com
cadeado) · Metas (Objetivo R:R, Risco máx carteira %) · Valor do contrato ·
Nº de entradas (1/2/3) · **Distribuir por (% do lote | $ em risco)** ·
linhas de entrada (Entrada · SL · %/$ por linha) · Take Profit · Data.

### Coluna 2 — Resumo do cálculo (`#captureArea`)
- Cabeçalho "Resumo: SÍMBOLO".
- **Entradas & Risco Acumulado**: um bloco por entrada com
  `1ª · 40%` à esquerda, risco em destaque à direita, e por baixo os campos
  rotulados `Entrada / SL / TP / Lote` que quebram linha sozinhos.
  Termina com a linha "Risco acumulado 1ª: $120 | +2ª: $192 | +3ª: $246".
- Destaques: Lote Total (número grande em cartão verde), Preço Médio, SL, TP,
  Risco, Ganho, R:R, Risco % da carteira, valor nominal da posição.
- Alertas grandes: lote anómalo, lote = 0 / não cabe no teto, risco acima do teto.
- Botões: "Calcular Resumo" (primário azul) → "Registar no Log" → "Guardar Resumo (Imagem)".

### Coluna 3 — "Log de Trades" (`#journalSection`)
- Navegador de mês (‹ mês ›) + "Resumo do Mês" / "Resumo Anual" (imagem).
- **Quadro de estatísticas 3×3**: Trades · Abertas · Não Exec. / Taxa Acerto ·
  P&L Total · Profit Factor / Expectância · Melhor Trade · Pior Trade.
- **Breakdown** por Prioridade (Alta/Média/Baixa) e por Estilo (Day/Swing):
  tabelas Grupo · N · Acerto · P&L.
- **Gráficos** (secção retrátil, SVG inline): curva de capital, P&L por trade,
  P&L por mês, ganho médio vs perda média com R:R real.
- Filtro de estado, CSV / Backup / Restaurar / Limpar, atalho "Abertas",
  "Minimizar/Expandir todas".
- Lista de trades agrupada por dia. **Linha minimizada**: símbolo · compra/venda ·
  resultado (ou 🚫 se não executada, — se aberta). **Expandida**: badges
  (estado / prioridade / estilo, clicáveis), preços e risco, chips de
  **Entradas** (`1.0800 SL 1.0750 · 0.24`) e chips de **Saídas** no mesmo estilo
  (`Manual +$112.06 ×0.24 @25422.14 −Comissão$15.04`), linha "Por vender X/Y"
  quando parcial, notas/revisão, e botões de ação.

## O que quero que polas
1. **Densidade e ritmo** — a coluna 3 é longa; melhora hierarquia e respiração
   sem esconder informação.
2. **Quadro de estatísticas** — 9 tiles iguais; dá mais peso aos que interessam
   (P&L Total, Taxa de Acerto) sem partir a grelha.
3. **Gráficos** — cartões, títulos, eixos e legendas dos 4 SVGs: torna-os
   elegantes e consistentes entre si. Cuidado com o contraste do verde/vermelho.
4. **Bloco "Entradas & Risco Acumulado"** — é o coração da calculadora; deve
   ler-se de relance.
5. **Chips de entradas/saídas** no log — já partilham estilo; afina.
6. **Badges e botões de ação** — muitos elementos pequenos juntos; unifica
   tamanhos, raios e estados (hover/ativo).
7. **Alertas** — que se destaquem sem parecer erro do sistema.
8. **Cartões de resumo em imagem** (mensal/anual, largura fixa 440px, gerados
   por html2canvas) — devem parecer um relatório publicável.

## O que NÃO mudar
- Estrutura de 3 colunas e o nome/logo.
- Mecanismo i18n, modais próprios, PWA/offline, dados em localStorage.
- A matemática, os textos de ajuda e as funcionalidades.
- Sem novas dependências externas.

## Entregável
`index.html` completo e funcional (mesma app, visual polido).
