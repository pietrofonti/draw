import React, {
  useState,
  useLayoutEffect,
  useMemo,
  useCallback,
  memo,
  RefObject,
  TransitionEvent,
} from 'react'
import styled from 'styled-components'

import Team from 'model/team'
import Club from 'model/team/Club'

import getTeamCountryName from 'utils/getTeamCountryName'

import FixedOverlay from 'ui/FixedOverlay'
import ContentWithFlag from 'ui/table/ContentWithFlag'

const ContentWithFlagFixed = styled(ContentWithFlag)`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 1000;
  user-select: none;
  pointer-events: none;
`

type El = RefObject<HTMLElement | null> | string

const getElement = (i: El) =>
  typeof i === 'string'
    ? document.querySelector(i)
    : i.current

const getTransition = (duration: number) =>
  `transform ${duration}ms ease-in-out, color ${duration / 2}ms ease-out`

function getPosTransform(posCell: HTMLElement) {
  const { left, top } = posCell.getBoundingClientRect()
  return `translate3d(${left}px, ${top}px, 0px)`
}

interface Props {
  from: El,
  to: El,
  duration: number,
  team: Team,
  onAnimationEnd?: () => void,
}

const MovingContent = ({
  from,
  to,
  duration,
  team,
  onAnimationEnd,
}: Props) => {
  const fromCell = useMemo(() => getElement(from), [from])
  const toCell = useMemo(() => getElement(to), [to])

  const [posCell, setPosCell] = useState(fromCell)

  useLayoutEffect(() => {
    if (posCell === fromCell) {
      setPosCell(toCell)
    }
  }, [posCell])

  const style = useMemo(() => ({
    transform: posCell instanceof HTMLElement ? getPosTransform(posCell) : '',
    transition: posCell === toCell ? getTransition(duration) : '',
    color: posCell === toCell ? '' : 'blue',
  }), [posCell, toCell, duration])

  const onTransitionEnd = useCallback((e: TransitionEvent<HTMLSpanElement>) => {
    if (e.propertyName === 'transform') {
      onAnimationEnd?.()
    }
  }, [onAnimationEnd])

  return posCell && (
    <FixedOverlay>
      <ContentWithFlagFixed
        country={getTeamCountryName(team)}
        style={style}
        onTransitionEnd={onTransitionEnd}
      >
        {(team as Club).shortName ?? team.name}
      </ContentWithFlagFixed>
    </FixedOverlay>
  )
}

export default memo(MovingContent)
