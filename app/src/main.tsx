import { GoldNCashOptionsSpec } from '@gamepark/gold-n-crash/GoldNCashOptions'
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { GoldNCashSetup } from '@gamepark/gold-n-crash/GoldNCashSetup'
import { GameProvider, MaterialGameAnimations } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GoldNCrashHistory } from './history/GoldNCrashHistory'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="gold-n-crash"
      Rules={GoldNCashRules}
      optionsSpec={GoldNCashOptionsSpec}
      GameSetup={GoldNCashSetup}
      material={Material}
      locators={Locators}
      logs={new GoldNCrashHistory()}
      animations={new MaterialGameAnimations()}
      tutorial={new Tutorial()}
      theme={{
        root: {
          background: {
            image: '/background.jpg',
            overlay: 'rgba(0, 0, 0, 0.8)'
          }
        }
      }}
    >
      <App/>
    </GameProvider>
  </StrictMode>
)
