import React, { useState, FC } from "react"
import { config } from "utils/config"
import useWindowResize from "hooks/useWindowResize"

const { controls } = config

interface ControlsProps {
  isRunning: boolean
  tick: number
  toggleSimulation: () => void
  clearBoard: () => void
  setTick: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Controls: FC<ControlsProps> = ({
  isRunning,
  toggleSimulation,
  clearBoard,
  tick,
  setTick,
}) => {
  const [showSettings, setShowSettings] = useState(false)
  let { windowWidth } = useWindowResize()
  return (
    <nav className="Nav-container">
      {!(showSettings && windowWidth < 582) && (
        <h2 className="Nav-title">conway's game of life</h2>
      )}
      <p className="Nav-desc">{controls.gameDescription}</p>
      <div className="Nav-controls">
        <span className="btn" onClick={toggleSimulation}>
          <span
            style={{
              background: !isRunning
                ? controls.startBtnColor
                : controls.stopBtnColor,
            }}
          >
            {!isRunning ? "play" : "stop"}
          </span>
        </span>
        <span className="btn">
          <span
            onClick={clearBoard}
            style={{
              background: controls.resetBtnColor,
            }}
          >
            reset
          </span>
        </span>
        <span className="btn" onClick={() => setShowSettings(!showSettings)}>
          <span
            style={{
              background: !showSettings
                ? controls.showSettingsColor
                : controls.hideSettingsColor,
            }}
          >
            {!showSettings ? "settings" : "done"}
          </span>
        </span>
        {showSettings && (
          <div className="Nav-settings-container">
            <div className="Nav-setting">
              <label>simulation speed</label>
              <span className="btn">
                <input
                  type="text"
                  style={{ width: 25 }}
                  value={tick}
                  onChange={setTick}
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Controls
