export type ActionType = {
  type:
    | 'initializing'
    | 'loadingStarted'
    | 'loadingEnded'
    | 'transitionRequested'
    | 'transitionStarted'
    | 'transitionEnded'
    | 'playStarted'
    | 'playStoped'
}

export type StateType = {
  payload: {}
  isPlaying: boolean
  isTransitioning: boolean
  currentSlide: number
}

export const initialState: StateType = {
  payload: {},
  isPlaying: false,
  isTransitioning: false,
  currentSlide: 0,
}
function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'initializing':
      return initialState
    case 'loadingStarted':
      return state
    case 'playStarted':
      return { ...state, isPlaying: true }
    case 'playStoped':
      return { ...state, isPlaying: true }
    default:
      throw new Error('invalid action')
  }
}

export default reducer
