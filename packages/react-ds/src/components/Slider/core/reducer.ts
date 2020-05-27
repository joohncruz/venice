class Slide {
  previous!: Slide | null
  next!: Slide | null
  content: number

  constructor(
    content: number,
    previous: Slide | null = null,
    next: Slide | null = null
  ) {
    this.content = content
    this.previous = previous
    this.next = next
  }
}
export function goToSlide(goTo: number) {
  return {
    type: 'GO_TO_SLIDE',
    goTo,
  } as const
}
export function forwardSlide() {
  return {
    type: 'FORWARD_SLIDE',
  } as const
}
export function backwardSlide() {
  return {
    type: 'BACKWARD_SLIDE',
  } as const
}

export function startPlaying(interval: number) {
  return {
    type: 'START_PLAYING',
    interval,
  } as const
}
export function stopPlaying() {
  return {
    type: 'STOP_PLAYING',
  } as const
}
export function initialize(
  width: number,
  height: number,
  position: number,
  slides: Array<any>
) {
  const firstSlide = new Slide()
  const lastSlide = slides.reduce((previous, _, idx) => {
    if (previous) {
      previous.next = new Slide(idx, previous)

      return previous.next
    }
    firstSlide.content = idx
    return firstSlide
  }, null)

  firstSlide.previous = lastSlide
  lastSlide.next = firstSlide

  return {
    type: 'INITIALIZE',
    width,
    height,
    position,
    currentSlide: firstSlide,
  } as const
}

type ActionType = ReturnType<
  | typeof startPlaying
  | typeof stopPlaying
  | typeof initialize
  | typeof forwardSlide
  | typeof backwardSlide
  | typeof goToSlide
>

export const initialState = {
  isPlaying: false,
  currentSlide: new Slide(-1),
  sliderWidth: 0,
  sliderHeight: 0,
  sliderPosition: 0,
  interval: 5000,
}

type StateType = typeof initialState

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...initialState,
        sliderWidth: action.width,
        sliderHeight: action.height,
        sliderPosition: action.position,
        currentSlide: action.currentSlide,
      }
    case 'GO_TO_SLIDE': {
      const current = state.currentSlide
      let slide
      while (current.content !== action.goTo) slide = current.next

      return {
        ...state,
        currentSlide: slide,
      }
    }
    case 'FORWARD_SLIDE':
      return {
        ...state,
        currentSlide: state.currentSlide.next,
      }
    case 'BACKWARD_SLIDE':
      return {
        ...state,
        currentSlide: state.currentSlide.previous,
      }
    case 'START_PLAYING':
      return { ...state, isPlaying: true, interval: action.interval }
    case 'STOP_PLAYING':
      return { ...state, isPlaying: false }
    default:
      throw new Error('invalid action')
  }
}

export default reducer
