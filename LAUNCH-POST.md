# Post de lançamento — Reddit

Rascunho para r/Daytrading, r/Forex ou r/propfirms. Em inglês, que é o público.

**Ângulo:** a mecânica das entradas escalonadas, não a simplicidade. O mercado já
tem bons diários grátis e offline (StonkJournal, PlanningTrade, FreeTradeJournal)
e já tem um diário dedicado a prop firms (TradesViz). O que mais ninguém parece
ter é o tratamento de entradas escalonadas com stop próprio e reajuste do lote
quando não enches ao preço planeado — é essa a abertura.

---

## Título

```
Every position size calculator assumes one entry. I scale into three, each with its own stop, so I built the one I needed.
```

## Corpo

```
I trade CFDs on a prop account and I scale into positions — usually three
entries, each with its own stop, not one stop for the whole thing.

Every calculator I tried breaks on that in two places:

**1. They size one entry at a time.** So you size each leg separately and your
total risk ends up 2-3x your max loss, because each leg was sized as if it
were the whole position. Mine solves for the total: three entries, three
different stops, total risk lands exactly on your max loss.

**2. They assume you get filled where you planned.** You don't. I plan entry 2
at 195 with a stop at 180 — 11.61 lots, $174 of risk. I actually get 205. I'm
now 25 points from my stop instead of 15, and if I keep that size I'm risking
$290 on a leg I budgeted $174 for.

So entries are things you *validate* after the fact. Mark entry 2 as filled at
205 and the lot drops to 6.96 automatically — risk back to $174. Fill better
than planned and it goes the other way.

Each entry is Planned / Filled / Cancelled. The ones that never fill drop out
of the average price and the risk. What I didn't expect is that this turned
into the most useful thing in the tool: it shows you your plan degrading in
real time. A setup I planned at 4.16 R:R was worth 2.71 by the time entry 1
filled high and entry 3 never triggered. Same idea, different trade — and now
I can see that instead of finding out at the end.

It also separates your initial stop from your trailing stop, so you see
initial risk vs. current risk — and once the stop moves past entry it stops
calling it risk and tells you what you've locked in.

The rest is a normal journal: partial exits with commissions, stats, charts,
CSV export.

Free, runs in the browser, nothing to install, works offline, data stays on
your machine unless you turn on sync. Open source. That part isn't the point —
there are good free journals already. The scaled-entry handling is the reason
I built it.

**Where it stands:** new, and I'm the only person who has used it. It's shaped
around how I trade — CFDs, prop firm rules, scaling in. No broker integration,
you type your trades.

Two things I'd like to know from anyone who scales in:
- When you don't get your planned fill, do you re-size to keep the risk, or
  keep the size and accept the bigger risk? I assumed the first — tell me if
  that's wrong.
- Do you use one stop for the whole position or one per leg? I built for
  per-leg and I'm not sure how common that is.

Link in the comments (rules).
```

---

## Antes de publicar

- **Ler as regras do subreddit.** Vários proíbem links no corpo ou só permitem
  autopromoção em dias próprios. Por isso o post acaba em "link in the comments":
  o link vai no primeiro comentário.
- **Um subreddit de cada vez**, com dias de intervalo. Três no mesmo dia é a
  forma mais rápida de ser marcado como spam.
- **Responder a toda a gente**, sobretudo a quem critica. É isso que separa
  "alguém que fez uma coisa" de "alguém a vender".
- **Não mencionar o Buy Me a Coffee.** Se perguntarem como apoiar, aí sim.
- Alguém vai apontar um concorrente nos comentários. A frase *"there are good
  free journals already"* existe para essa conversa já estar ganha.

## Antes de publicar, a sério

Usar a app nas trades reais durante uma semana primeiro. A abertura ideal é
*"I've used this on my last 20 trades and noticed X"* — credibilidade que não se
escreve à secretária. Os números do texto (11.61 → 6.96, 4.16 → 2.71) são reais,
saídos dos testes; substituí-los por números de trades mesmo feitas é melhor.
