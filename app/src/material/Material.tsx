import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { gameCardDescription } from './GameCardDescription'
import { zeppelinCardDescription } from './ZeppelinCardDescription'
import { flagCardDescription } from './FlagCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Card]: gameCardDescription,
  [MaterialType.ZeppelinCard]: zeppelinCardDescription,
  [MaterialType.FlagCard]: flagCardDescription,
}

