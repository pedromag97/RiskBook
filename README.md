# RiskBook

**The simplest position-size calculator + trade journal.** No signup, no cloud, works offline, 4 languages. / Calculadora de position sizing e diário de trading para CFDs em prop firms, num único ficheiro HTML.

- 🌍 **4 idiomas** — Inglês, Francês, Espanhol, Português (troca ao vivo, deteta o browser).
- 📲 **PWA** — instalável e **offline** quando servido por https (ex. GitHub Pages).
- 🔒 **Privado** — todos os dados ficam no `localStorage` do teu dispositivo. Nada sai para a cloud.

## O que faz

### Position Sizing
- **Entradas parceladas (1–3 tranches)** com stop e take-profit únicos partilhados.
- **Distribuição por %** do lote total por entrada (ex. 40/30/30) — os lotes são calculados, não escritos à mão.
- O **risco total** (do preço médio ponderado ao stop) bate sempre na **Perda Máx** definida, nunca por tranche. Sem dupla contagem.
- **Risco acumulado ao vivo** por tranche (`1ª: $120 | +2ª: $200 | +3ª: $250`).
- **Preço médio ponderado** pelos lotes.
- Lote **tradeable a 2 casas** (0.01, CFD) + valor **exato a 4 casas**.
- **Tipo de ativo** (Forex, Índices, Cripto, Ações, Comodities) que preenche o valor do contrato por defeito (editável).
- Alertas grandes: **lote anómalo** (Nx a mediana dos últimos ~20 lotes) e **lote = 0 / trade não cabe no teto**.
- Rácio **R:R** com objetivo mínimo 1:2 e check de risco da carteira.

### Diário de Trades (Log)
- **Registar** o cálculo atual com um clique.
- **Fechar com resultado** (P&L realizado em $); estado ganho/perda/nulo derivado do sinal.
- **Estatísticas**: nº trades, taxa de acerto, P&L total, profit factor, expectância.
- **Filtros**, **notas** por trade, apagar individual/tudo.
- **Exportar CSV** (Excel) e **Backup/Restauro JSON** (portável entre browsers/PCs, dedupe por id).

## Como usar
Abre o `index.html` em qualquer browser. Funciona offline (PWA). Também pode ser hospedado via GitHub Pages.

## Onde ficam os dados
Tudo em **`localStorage`** do browser (chaves `riskcalc_journal`, `riskcalc_symbols`, `riskcalc_lots_*`). É local a este browser/origem — usa o **Backup JSON** para transportar o histórico entre dispositivos.

## Stack
HTML único + Tailwind CSS (CDN) + html2canvas (export de imagem). Sem framework, sem build.
