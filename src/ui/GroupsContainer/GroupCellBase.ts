import styled, { css, keyframes } from 'styled-components'

import Cell from 'ui/table/Cell'

const PossibleLight = keyframes`
  from {
    box-shadow: 0 0 20px #08f;
  }
  to {}
`

const PossibleDark = keyframes`
  from {
    background-color: rgba(255, 255, 255, 0.5);
  }
  to {}
`

const AppearLight = keyframes`
  from {
    background-color: rgba(255, 255, 0, 0.5);
  }
  to {}
`

const AppearDark = keyframes`
  from {
    background-color: rgba(192, 224, 255, 0.5);
  }
  to {}
`

const Possible = css`
  position: relative; /* enables glow */
  animation: ${props => props.theme.isDarkMode ? PossibleDark : PossibleLight} 1s ease;
  ${props => props.theme.isDarkMode ? css`
    background-color: rgba(255, 255, 255, 0.35);
  ` : css`
    box-shadow: 0 0 5px #6af;
  `}
`

const Picked = css`
  animation: ${props => props.theme.isDarkMode ? AppearDark : AppearLight} 3s ease-out normal forwards;
`

interface Props {
  possible: boolean,
  picked: boolean,
}

const GroupCellBase = styled(Cell)<Props>`
  ${props => props.possible && Possible}
  ${props => props.picked && Picked}
`

export default GroupCellBase
