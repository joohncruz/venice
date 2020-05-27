import React, { FC, useReducer, useEffect, useRef } from 'react'

import Bullets from './Bullets'
import Buttons from './Buttons'
import reducer, {
  initialState,
  startPlaying,
  forwardSlide,
  initialize,
  goToSlide,
  backwardSlide,
} from './core/reducer'
import { ISlide, ISlider } from './core/Slide.models'
import styles from './core/Slider.module.scss'

const Slide: FC<ISlide> = ({ content, idx }) => (
  <div data-testid={`slide-${idx}`} className={styles.slide}>
    {content}
  </div>
)

function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    } else {
      clearInterval(savedCallback.current)
    }
  }, [delay])
}

const Slider: FC<ISlider> = ({
  children,
  bullets = false,
  buttons = false,
  autoPlay = false,
  duration = 5000,
  width,
  height,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const sliderRef = useRef(null)

  const goTo = (slide: number) => dispatch(goToSlide(slide))

  const nextSlide = () => {
    //coloca na direita o atual
    sliderRef.current.children[
      state.currentSlide.content
    ].style.left = `+${state.sliderPosition + state.sliderWidth}px`
    sliderRef.current.children[state.currentSlide.content].style.zIndex = 1

    //coloca o próximo como visivel
    sliderRef.current.children[state.currentSlide.next?.content].style.left = 0
    sliderRef.current.children[
      state.currentSlide.next?.content
    ].style.zIndex = 2

    //coloca o proximo do próximo em posição
    sliderRef.current.children[
      state.currentSlide.next?.next?.content
    ].style.zIndex = 'unset'

    sliderRef.current.children[
      state.currentSlide.next?.next?.content
    ].style.left = `-${state.sliderPosition + state.sliderWidth}px`

    dispatch(forwardSlide())
  }

  const previousSlide = () => {
    //coloca o anterior como visivel
    sliderRef.current.children[
      state.currentSlide.previous?.content
    ].style.left = 0
    sliderRef.current.children[
      state.currentSlide.previous?.content
    ].style.zIndex = 2
    // coloca na esquerda o atual
    sliderRef.current.children[
      state.currentSlide.content
    ].style.left = `-${state.sliderPosition + state.sliderWidth}px`
    sliderRef.current.children[state.currentSlide.content].style.zIndex = 1

    //coloca o anterior do anterior em posição
    sliderRef.current.children[
      state.currentSlide.previous?.previous?.content
    ].style.zIndex = 'unset'
    sliderRef.current.children[
      state.currentSlide.previous?.previous?.content
    ].style.left = `+${state.sliderPosition + state.sliderWidth}px`

    dispatch(backwardSlide())
  }

  useEffect(() => {
    const slideWidth = width ? width : sliderRef.current.children[0].offsetWidth
    const slideHeight = height
      ? height
      : sliderRef.current.children[0].offsetHeight
    const posInitial = sliderRef.current.offsetLeft

    for (let idx = 1; idx < sliderRef.current.children.length; idx++) {
      sliderRef.current.children[idx].style.left = `-${slideWidth}px`
    }
    dispatch(
      initialize(
        slideWidth,
        slideHeight,
        posInitial,
        React.Children.toArray(children)
      )
    )
  }, [])

  useInterval(nextSlide, autoPlay ? state.interval : null)

  return (
    <>
      <Buttons nextFunc={nextSlide} prevFunc={previousSlide} active={buttons}>
        <div style={{ width: state.sliderWidth, height: state.sliderHeight }}>
          <div className={styles.wrapper} data-testid="slider-container">
            <div ref={sliderRef} className={styles.slides}>
              {React.Children.map(children, (slide: React.ReactNode, idx) => (
                <Slide content={slide} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </Buttons>
      {bullets && (
        <Bullets
        width={state.sliderWidth}
          slidesCount={React.Children.count(children)}
          current={state.currentSlide.content}
          goTo={goTo}
        />
      )}
    </>
  )
}

export default Slider
