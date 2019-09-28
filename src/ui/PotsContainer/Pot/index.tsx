import React, { memo } from 'react'

import Team from 'model/team'
import GSTeam from 'model/team/GSTeam'
import Body from 'ui/table/Body'

import Header from '../PotHeader'
import PotCell from '../PotCell'

import Root from './Root'

interface Props {
  isCurrent: boolean,
  potNum: number,
  teams: Team[],
  pickedTeams: Team[],
  selectedTeams: Team[] | null,
  background?: string,
  color?: string,
}

const Pot = ({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  background,
  color,
}: Props) => {
  return (
    <Root highlighted={isCurrent}>
      <Header
        highlighted={isCurrent}
        depleted={!teams || pickedTeams.length === teams.length}
        background={background}
        color={color}
      >
        Pot {potNum + 1}
      </Header>
      <Body>
        {teams && teams.map(team => {
          const {
            name,
            country,
            shortName,
            pairing,
          } = team as GSTeam

          return (
            <PotCell
              key={team.id}
              data-cellid={team.id}
              title={pairing && `paired with ${pairing.shortName || pairing.name}`}
              selected={!!selectedTeams && selectedTeams.includes(team)}
              picked={pickedTeams.includes(team)}
              country={country || name}
            >
              {shortName || name}
            </PotCell>
          )
        })}
      </Body>
    </Root>
  )
}

export default memo(Pot)