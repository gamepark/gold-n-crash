/** @jsxImportSource @emotion/react */
import { GoldNCashOptionsSpec } from '@gamepark/gold-n-crash/GoldNCashOptions'
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { GoldNCashSetup } from '@gamepark/gold-n-crash/GoldNCashSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="gold-n-crash"
      Rules={GoldNCashRules}
      optionsSpec={GoldNCashOptionsSpec}
      GameSetup={GoldNCashSetup}
      material={Material}
      locators={Locators}
      animations={new MaterialGameAnimations()}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
