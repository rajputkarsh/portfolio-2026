"use client";

import { useReducer } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type Suit = "S" | "H" | "D" | "C";
type Card = { id: string; suit: Suit; rank: number; faceUp: boolean };
type PileKind = "tableau" | "waste" | "foundation";
type PileRef = { kind: PileKind; i: number };
type Sel = { source: PileRef; index: number } | null;

type State = {
  stock: Card[];
  waste: Card[];
  foundations: Card[][];
  tableau: Card[][];
  selected: Sel;
  won: boolean;
};

const SUITS: Suit[] = ["S", "H", "D", "C"];
const SYMBOL: Record<Suit, string> = { S: "♠", H: "♥", D: "♦", C: "♣" };
const isRed = (s: Suit) => s === "H" || s === "D";
const RANK = [
  "",
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

function shuffled(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS)
    for (let rank = 1; rank <= 13; rank++)
      deck.push({ id: `${suit}${rank}`, suit, rank, faceUp: false });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function deal(): State {
  const deck = shuffled();
  const tableau: Card[][] = Array.from({ length: 7 }, () => []);
  let k = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const card = deck[k++];
      card.faceUp = row === col;
      tableau[col].push(card);
    }
  }
  const stock = deck.slice(k).map((c) => ({ ...c, faceUp: false }));
  return {
    stock,
    waste: [],
    foundations: [[], [], [], []],
    tableau,
    selected: null,
    won: false,
  };
}

const top = (pile: Card[]): Card | undefined => pile[pile.length - 1];

function validRun(cards: Card[]): boolean {
  for (let i = 0; i < cards.length - 1; i++) {
    const a = cards[i];
    const b = cards[i + 1];
    if (isRed(a.suit) === isRed(b.suit) || a.rank !== b.rank + 1) return false;
  }
  return true;
}

function canTableau(moving: Card[], destTop: Card | undefined): boolean {
  const first = moving[0];
  if (!destTop) return first.rank === 13;
  return (
    isRed(first.suit) !== isRed(destTop.suit) && first.rank === destTop.rank - 1
  );
}

function canFoundation(card: Card, pile: Card[]): boolean {
  const t = top(pile);
  if (!t) return card.rank === 1;
  return t.suit === card.suit && card.rank === t.rank + 1;
}

function movingCards(state: State, sel: NonNullable<Sel>): Card[] {
  const { source, index } = sel;
  if (source.kind === "tableau") return state.tableau[source.i].slice(index);
  if (source.kind === "waste") return state.waste.slice(-1);
  return state.foundations[source.i].slice(-1);
}

type Action =
  | { type: "NEW" }
  | { type: "DRAW" }
  | { type: "SELECT"; ref: PileRef; index: number }
  | { type: "MOVE"; dest: PileRef };

function removeFromSource(state: State, source: PileRef, index: number): State {
  if (source.kind === "tableau") {
    const tableau = state.tableau.map((p) => [...p]);
    tableau[source.i] = tableau[source.i].slice(0, index);
    const t = top(tableau[source.i]);
    if (t && !t.faceUp) t.faceUp = true;
    return { ...state, tableau };
  }
  if (source.kind === "waste") {
    return { ...state, waste: state.waste.slice(0, -1) };
  }
  const foundations = state.foundations.map((p) => [...p]);
  foundations[source.i] = foundations[source.i].slice(0, -1);
  return { ...state, foundations };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEW":
      return deal();

    case "DRAW": {
      if (state.stock.length === 0) {
        const stock = [...state.waste]
          .reverse()
          .map((c) => ({ ...c, faceUp: false }));
        return { ...state, stock, waste: [], selected: null };
      }
      const stock = [...state.stock];
      const card = stock.pop()!;
      return {
        ...state,
        stock,
        waste: [...state.waste, { ...card, faceUp: true }],
        selected: null,
      };
    }

    case "SELECT": {
      const { ref, index } = action;
      if (ref.kind === "tableau") {
        const run = state.tableau[ref.i].slice(index);
        if (!run.length || !run[0].faceUp || !validRun(run)) return state;
      }
      return { ...state, selected: { source: ref, index } };
    }

    case "MOVE": {
      const sel = state.selected;
      if (!sel) return state;
      const dest = action.dest;
      // Clicking the source pile deselects.
      if (dest.kind === sel.source.kind && dest.i === sel.source.i) {
        return { ...state, selected: null };
      }
      const moving = movingCards(state, sel);
      let ok = false;
      if (dest.kind === "foundation") {
        ok =
          moving.length === 1 &&
          canFoundation(moving[0], state.foundations[dest.i]);
      } else if (dest.kind === "tableau") {
        ok = validRun(moving) && canTableau(moving, top(state.tableau[dest.i]));
      }
      if (!ok) return { ...state, selected: null };

      let next = removeFromSource(state, sel.source, sel.index);
      if (dest.kind === "foundation") {
        const foundations = next.foundations.map((p) => [...p]);
        foundations[dest.i] = [...foundations[dest.i], ...moving];
        next = { ...next, foundations };
      } else {
        const tableau = next.tableau.map((p) => [...p]);
        tableau[dest.i] = [...tableau[dest.i], ...moving];
        next = { ...next, tableau };
      }
      const won = next.foundations.every((p) => p.length === 13);
      return { ...next, selected: null, won };
    }

    default:
      return state;
  }
}

function CardFace({ card, selected }: { card: Card; selected?: boolean }) {
  if (!card.faceUp) {
    return (
      <div className="gradient-brand h-16 w-11 rounded-md border border-white/20 shadow-sm" />
    );
  }
  return (
    <div
      className={cn(
        "bg-card flex h-16 w-11 flex-col rounded-md border p-1 shadow-sm",
        selected ? "border-primary ring-primary/50 ring-2" : "border-border",
        isRed(card.suit) ? "text-red-500" : "text-foreground"
      )}
    >
      <span className="text-xs leading-none font-bold">{RANK[card.rank]}</span>
      <span className="mt-auto self-end text-base leading-none">
        {SYMBOL[card.suit]}
      </span>
    </div>
  );
}

export default function Solitaire() {
  const [state, dispatch] = useReducer(reducer, undefined, deal);

  const isSelected = (ref: PileRef, index: number) =>
    state.selected?.source.kind === ref.kind &&
    state.selected.source.i === ref.i &&
    state.selected.index <= index &&
    ref.kind === "tableau";

  function clickTableauCard(i: number, index: number, card: Card) {
    if (state.selected)
      dispatch({ type: "MOVE", dest: { kind: "tableau", i } });
    else if (card.faceUp)
      dispatch({ type: "SELECT", ref: { kind: "tableau", i }, index });
  }

  function clickTableauPile(i: number) {
    if (state.selected)
      dispatch({ type: "MOVE", dest: { kind: "tableau", i } });
  }

  function clickWaste() {
    const card = top(state.waste);
    if (!card) return;
    if (state.selected)
      dispatch({ type: "MOVE", dest: { kind: "waste", i: 0 } });
    else
      dispatch({
        type: "SELECT",
        ref: { kind: "waste", i: 0 },
        index: state.waste.length - 1,
      });
  }

  function clickFoundation(i: number) {
    if (state.selected)
      dispatch({ type: "MOVE", dest: { kind: "foundation", i } });
    else {
      const card = top(state.foundations[i]);
      if (card)
        dispatch({
          type: "SELECT",
          ref: { kind: "foundation", i },
          index: state.foundations[i].length - 1,
        });
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5">
      <div className="flex w-full items-center justify-between">
        <p className="text-muted-foreground font-mono text-xs">
          {state.won ? "You won! 🎉" : "Build the foundations A → K"}
        </p>
        <Button size="sm" onClick={() => dispatch({ type: "NEW" })}>
          New game
        </Button>
      </div>

      {/* Top row: stock, waste, foundations */}
      <div className="flex w-full justify-between gap-1.5">
        <div className="flex gap-1.5">
          <button
            onClick={() => dispatch({ type: "DRAW" })}
            aria-label="draw"
            className="border-border bg-muted flex h-16 w-11 items-center justify-center rounded-md border"
          >
            {state.stock.length ? (
              <div className="gradient-brand h-14 w-9 rounded" />
            ) : (
              <span className="text-muted-foreground text-lg">↻</span>
            )}
          </button>
          <button onClick={clickWaste} aria-label="waste" className="h-16 w-11">
            {top(state.waste) ? (
              <CardFace
                card={top(state.waste)!}
                selected={state.selected?.source.kind === "waste"}
              />
            ) : (
              <div className="border-border/60 h-16 w-11 rounded-md border border-dashed" />
            )}
          </button>
        </div>

        <div className="flex gap-1.5">
          {state.foundations.map((pile, i) => (
            <button
              key={i}
              onClick={() => clickFoundation(i)}
              aria-label={`foundation ${i + 1}`}
              className="h-16 w-11"
            >
              {top(pile) ? (
                <CardFace card={top(pile)!} />
              ) : (
                <div className="border-border/60 text-muted-foreground/50 flex h-16 w-11 items-center justify-center rounded-md border border-dashed text-lg">
                  A
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <div className="flex w-full justify-between gap-1.5">
        {state.tableau.map((pile, i) => (
          <div
            key={i}
            onClick={() => clickTableauPile(i)}
            className="min-h-16 w-11"
          >
            {pile.length === 0 ? (
              <div className="border-border/60 h-16 w-11 rounded-md border border-dashed" />
            ) : (
              <div className="relative">
                {pile.map((card, index) => (
                  <div
                    key={card.id}
                    className="absolute w-11"
                    style={{ top: index * 18 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      clickTableauCard(i, index, card);
                    }}
                  >
                    <CardFace
                      card={card}
                      selected={isSelected({ kind: "tableau", i }, index)}
                    />
                  </div>
                ))}
                {/* Spacer to give the column height */}
                <div style={{ height: (pile.length - 1) * 18 + 64 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-center text-xs">
        Click a card to pick it up, then click where to place it. Click the deck
        to draw.
      </p>
    </div>
  );
}
