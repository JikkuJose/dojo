import React, { useState, useRef, useEffect } from "react"
import "./App.scss"
import Controls from "components/Controls"
import Board from "components/Board"
import { gridGenerator } from "utils/utils"
import { conway } from "conway"
import { useBoardGenerator } from "hooks/useBoardGenerator"
import { config } from "utils/config"

const {
  controls: { speed },
} = config

const App = () => {
  const gameBoardRef = useRef<HTMLElement>(null)
  const [grid, setGrid, dimension] = useBoardGenerator(gameBoardRef)
  const [frameRate, setFrameRate] = useState(speed)
  const frameRateRef = useRef(frameRate)
  const [isRunning, setisRunning] = useState(false)
  const isRunningRef = useRef(isRunning)
  isRunningRef.current = isRunning

  const toggleCellState = (x: number, y: number) => {
    const { row, column } = dimension
    const newGrid = gridGenerator(row, column)
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (i === x && j === y) newGrid[i][j] = grid[i][j] ? 0 : 1
        else newGrid[i][j] = grid[i][j]
      }
    }
    setGrid(newGrid)
  }

  const toggleCellStateHandler = (x, y) => toggleCellState(x, y)

  const runSimulation = () => {
    if (!isRunningRef.current) return
    setGrid((grid) => conway(grid))
    setTimeout(runSimulation, frameRateRef.current)
  }

  const toggleSimulationHandler = () => {
    setisRunning(!isRunning)
    if (!isRunning) {
      isRunningRef.current = true
      runSimulation()
    }
  }

  const clearBoardHandler = () => {
    setisRunning(false)
    setGrid(gridGenerator(dimension.row, dimension.column))
  }

  const setFrameRateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrameRate(+e.target.value)
  }

  useEffect(() => {
    frameRateRef.current = frameRate
  }, [frameRate])

  return (
    <div className="Main-container">
      <Controls
        isRunning={isRunning}
        toggleSimulation={toggleSimulationHandler}
        clearBoard={clearBoardHandler}
        frameRate={frameRate}
        setFrameRate={setFrameRateHandler}
      />
      <Board
        gameBoardRef={gameBoardRef}
        grid={grid}
        gridDimension={dimension}
        toggleCellState={toggleCellStateHandler}
      />
    </div>
  )
}

export default App