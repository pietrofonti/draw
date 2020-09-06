import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from 'react'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import usePrevious from 'utils/hooks/usePrevious'
import getTeamCountryName from 'utils/getTeamCountryName'

import ContentWithFlag from 'ui/table/ContentWithFlag'
import DummyContent from 'ui/table/DummyContent'
import MovingContent from 'ui/MovingContent'

import GroupCellBase from './GroupCellBase'

type Team = Club | NationalTeam

interface Props {
  team?: Team,
  possible: boolean,
}

const GroupCellDeferred = ({
  team,
  possible,
}: Props) => {
  const prevTeam = usePrevious(team)
  const [displayedTeam, setDisplayedTeam] = useState(team)
  const to = useRef<HTMLElement | null>(null)

  useEffect(() => {
    console.log('changed to', team)
    if (!team) {
      setDisplayedTeam(undefined)
    }
  }, [team])

  const fill = useCallback(() => {
    console.log('filling', team)
    if (!team) {
      return
    }
    setDisplayedTeam(team)
  }, [team])

  return (
    <>
      <GroupCellBase
        hasTeam={!!displayedTeam}
        possible={possible}
      >
        {displayedTeam ? (
          <ContentWithFlag country={getTeamCountryName(displayedTeam)}>
            {(displayedTeam as Club).shortName ?? displayedTeam.name}
          </ContentWithFlag>
        ) : (
          <DummyContent ref={to} />
        )}
      </GroupCellBase>
      {team && team !== prevTeam && (
        <MovingContent
          from={`[data-cellid='${team.id}']`}
          to={to}
          duration={350}
          team={team}
          onAnimationEnd={fill}
        />
      )}
    </>
  )
}

export default memo(GroupCellDeferred)
