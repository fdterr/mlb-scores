export interface Game {
  gamePk: number
  status: {
    abstractGameState: string
    detailedState: string
  }
  teams: {
    away: {
      team: {
        id: number
        name: string
      }
      score?: number
    }
    home: {
      team: {
        id: number
        name: string
      }
      score?: number
    }
  }
  linescore?: {
    currentInningOrdinal: string
    inningState: string
    teams: {
      away: {
        runs: number
      }
      home: {
        runs: number
      }
    }
  }
}