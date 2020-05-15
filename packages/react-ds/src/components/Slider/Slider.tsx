import React, { FC, useReducer } from 'react'

import Bullets from './Bullets'
import reducer, { initialState } from './core/reducer'
import { ISlider } from './core/Slider.model'
import styles from './core/Slider.module.scss'

const Slider: FC<ISlider> = ({ children, bullets = false }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <div className={styles.container} data-testid="slider-container">
        {React.Children.map(children, (slide: React.ReactNode) => (
          <div className={styles.slide}>{slide}</div>
        ))}
      </div>
      {bullets && <Bullets />}
    </>
  )
}

export default Slider
