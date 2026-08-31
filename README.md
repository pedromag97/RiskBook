# RiskBook

**The simplest position-size calculator + trade journal.** No signup, no cloud, works offline, 4 languages. / Calculadora de position sizing e diário de trading para CFDs em prop firms, num único ficheiro HTML.

- 🌍 **4 idiomas** — Inglês, Francês, Espanhol, Português (troca ao vivo, deteta o browser).
- 📲 **PWA** — instalável e **offline** quando servido por https (ex. GitHub Pages).
- 🔒 **Privado por omissão** — os dados ficam no `localStorage` do teu dispositivo. Só saem se **tu** escolheres entrar com a Google para sincronizar.

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

### Sincronização opcional (Firebase)
Se entrares com a Google, o log e as definições passam a sincronizar entre dispositivos.
A app continua **local-first**: o `localStorage` manda, tudo funciona offline e sem login,
e cada trade tem um carimbo de alteração (o mais recente ganha, com lápides para as apagadas).

**Sobre a chave de API no `index.html`:** a chave web do Firebase **não é um segredo** —
vai no HTML de qualquer app web e é visível a quem abrir o inspetor.
[A própria Google documenta isto](https://firebase.google.com/docs/projects/api-keys):
o acesso aos dados **não** é controlado pela chave, mas pelas regras de segurança
(ver [`firestore.rules`](firestore.rules) — cada utilizador só acede a `users/{o seu uid}`).
Os scanners de segredos assinalam-na na mesma por causa do padrão `AIza…`, por isso a chave
está restringida no Google Cloud (referrers HTTP + apenas as APIs do Firebase).

## Stack
HTML único + Tailwind CSS (CDN) + html2canvas (export de imagem). Sem framework, sem build.
