/** @jsxImportSource @emotion/react */
import { GameTemplateOptionsSpec } from '@gamepark/gold-n-cash/GoldNCashOptions'
import { GoldNCashRules } from '@gamepark/gold-n-cash/GoldNCashRules'
import { GoldNCashSetup } from '@gamepark/gold-n-cash/GoldNCashSetup'
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
    <GameProvider game="gold-n-cash" Rules={GoldNCashRules} optionsSpec={GameTemplateOptionsSpec} GameSetup={GoldNCashSetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
