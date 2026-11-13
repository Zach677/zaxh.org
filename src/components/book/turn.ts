// The whole state of the book, and every way it changes.
export type BookState = {
  open: boolean
  spread: number
  // The leaf in motion rides above both stacks until it lands.
  moving: number | null
  // For one frame after a jump, the book moves without a transition.
  instant: boolean
  // False until the reader turns a page: the hint shows until then.
  turned: boolean
}

export type BookAction =
  // Turn by a number of spreads. Leaf 0 is the cover: a forward turn opens it.
  | { type: 'turn'; by: number; spreads: number }
  // Go to a state at once: the closed cover, or a section's spread.
  | { type: 'jump'; open: boolean; spread?: number }
  | { type: 'land' }
  | { type: 'settle' }

// The prerendered book is open on its first spread. The client starts the
// same, so it can hydrate, and jumps from there.
export const PRERENDERED: BookState = {
  open: true,
  spread: 0,
  moving: null,
  instant: true,
  turned: false,
}

export function reduce(state: BookState, action: BookAction): BookState {
  switch (action.type) {
  case 'turn': {
    if (!state.open) return action.by > 0 ? { ...state, open: true, moving: 0 } : state
    const to = Math.min(Math.max(state.spread + action.by, 0), action.spreads - 1)
    if (to === state.spread) return state
    // Forward lifts the next leaf; back lowers the current one.
    return { ...state, spread: to, moving: Math.max(to, state.spread), turned: true }
  }
  case 'jump':
    return {
      ...state,
      open: action.open,
      spread: action.spread ?? state.spread,
      moving: null,
      instant: true,
    }
  case 'land':
    return state.moving === null ? state : { ...state, moving: null }
  case 'settle':
    return state.instant ? { ...state, instant: false } : state
  default:
    return state
  }
}
