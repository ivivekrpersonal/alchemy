import React from 'react'

import { ToolTipContent, ToolTipWrapper } from './styled'
export const ToolTip = ({
  children,
  content,
}: {
  children: React.ReactNode
  content: React.ReactNode
}) => {
  const [active, setActive] = React.useState(false)
  const showTip = () => {
    setActive(true)
  }
  const hideTip = () => {
    setActive(false)
  }

  return (
    <ToolTipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <ToolTipContent>{content}</ToolTipContent>}
    </ToolTipWrapper>
  )
}
