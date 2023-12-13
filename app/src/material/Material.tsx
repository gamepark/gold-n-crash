import { MaterialType } from '@gamepark/gold-n-cash/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { crewCardDescription } from './CrewCardDescription'
import { zeppelinCardDescription } from './ZeppelinCardDescription'
import { flagCardDescription } from './FlagCardDescription'
import { prestigiousGuestCardDescription } from './PrestigiousGuestCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.CrewCard]: crewCardDescription,
  [MaterialType.ZeppelinCard]: zeppelinCardDescription,
  [MaterialType.FlagCard]: flagCardDescription,
  [MaterialType.PrestigiousGuestCard]: prestigiousGuestCardDescription,
}

