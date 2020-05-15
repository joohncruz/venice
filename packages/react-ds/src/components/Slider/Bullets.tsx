import React, { FC } from 'react'

const Bullet = () => <li></li>

const Bullets: FC<{}> = () => {
  return (
    <ul>
      <Bullet />
    </ul>
  )
}

export default Bullets
