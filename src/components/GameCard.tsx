import React from 'react'
import { Game } from '../types'

interface GameCardProps {
  game: Game
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { teams, status, linescore, gameDate } = game

  const getScoreDisplay = (team: 'away' | 'home') => {
    if (linescore && linescore.teams) {
      return linescore.teams[team].runs
    }
    return teams[team].score !== undefined ? teams[team].score : '-'
  }

  const formatGameTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    })
  }

  const TeamInfo: React.FC<{ team: 'away' | 'home' }> = ({ team }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={`https://www.mlbstatic.com/team-logos/${teams[team].team.id}.svg`}
          alt={`${teams[team].team.name} logo`}
          className="w-8 h-8 mr-2"
        />
        <span className="text-lg font-semibold">{teams[team].team.name}</span>
      </div>
      <div className="text-2xl font-bold">{getScoreDisplay(team)}</div>
    </div>
  )

  const getGameStatus = () => {
    if (status.abstractGameState === 'Live') {
      return `${linescore?.inningState} ${linescore?.currentInningOrdinal}`
    } else if (status.abstractGameState === 'Final') {
      return 'Final'
    } else if (status.abstractGameState === 'Preview') {
      return `Starts at ${formatGameTime(gameDate)}`
    } else {
      return status.detailedState
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TeamInfo team="away" />
      <div className="my-4 border-t border-gray-200"></div>
      <TeamInfo team="home" />
      <div className="mt-4 text-sm text-gray-600">
        {getGameStatus()}
      </div>
    </div>
  )
}

export default GameCard