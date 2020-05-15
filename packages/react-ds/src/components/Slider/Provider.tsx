import React, { createContext, useReducer } from 'react'

import reducer, { initialState, StateType } from './core/reducer'

export const SliderContext = createContext<{
  state: StateType
  dispatch: React.Dispatch<never>
}>({
  state: initialState,
  dispatch: () => null,
})

const SliderProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SliderContext.Provider value={{ state, dispatch }}>
      {children}
    </SliderContext.Provider>
  )
}

export default SliderProvider
