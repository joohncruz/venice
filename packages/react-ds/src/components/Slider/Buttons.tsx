import React, { FC } from 'react'

import styles from './core/Slider.module.scss'

interface IButtons {
  next?: string | React.ReactNode | HTMLElement
  previous?: string | React.ReactNode | HTMLElement
  active: boolean
  nextFunc: React.MouseEvent<HTMLButtonElement>
  prevFunc: React.MouseEvent<HTMLButtonElement>
}
const Buttons: FC<IButtons> = ({ children, nextFunc, prevFunc, active }) => {
  return active ? (
    <div className={styles.buttons}>
      <button
        data-testid="slider-previous"
        className={styles.prev}
        onClick={prevFunc}
      ></button>
      {children}
      <button
        data-testid="slider-next"
        className={styles.next}
        onClick={nextFunc}
      ></button>
    </div>
  ) : (
    <> {children}</>
  )
}

export default Buttons
