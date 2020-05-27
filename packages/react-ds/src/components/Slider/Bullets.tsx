import React, { FC } from 'react'

import styles from './core/Slider.module.scss'

const Bullet: FC<{
  slide: number
  onClickFunc: Function
  isCurrent: boolean
}> = ({ onClickFunc, slide, isCurrent }) => (
  <li
    className={`${styles.bullet} ${isCurrent && styles.active}`}
    onClick={() => onClickFunc(slide)}
  />
)

const Bullets: FC<{
  slidesCount: number
  current: number
  goTo: Function
  width: number
}> = ({ slidesCount, current, goTo, width }) => {
  return (
    <ul style={{ width }} className={styles.bullets}>
      {Array.from({ length: slidesCount }, (_, i) => (
        <Bullet isCurrent={current === i} slide={i} onClickFunc={goTo} />
      ))}
    </ul>
  )
}

export default Bullets
