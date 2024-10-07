import React, { useState, useEffect } from 'react'
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react'
import GameCard from './components/GameCard'
import ErrorBoundary from './components/ErrorBoundary'
import { Game } from './types'

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchGames(currentDate)
  }, [currentDate])

  const fetchGames = async (date: Date) => {
    setIsLoading(true)
    try {
      const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      const response = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${formattedDate}&hydrate=linescore`)
      const data = await response.json()
      setGames(data.dates[0]?.games || [])
    } catch (error) {
      console.error('Error fetching games:', error)
      setGames([])
    } finally {
      setIsLoading(false)
    }
  }

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">MLB Scores</h1>
      <div className="flex justify-center items-center mb-6">
        <button
          onClick={() => changeDate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="bg-white px-4 py-2 font-semibold">
          {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <button
          onClick={() => changeDate(1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : games.length === 0 ? (
        <p className="text-center text-gray-600">No games scheduled for this date.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <ErrorBoundary key={game.gamePk}>
              <GameCard game={game} />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </div>
  )
}

export default App