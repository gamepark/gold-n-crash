import { LocationType } from '@gamepark/gold-n-cash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-cash/material/MaterialType'
import { Flag } from '@gamepark/gold-n-cash/material/Flag'
import { ItemLocator } from '@gamepark/react-game'
import { playerHandLocator } from './PlayerHandLocator'
import { zeppelinLocator } from './ZeppelinLocator'
import { crewDeckLocator } from './CrewDeckLocator'
import { prestigiousGuestLocator } from './PrestigiousGuestLocator'
import { flagCardLocator } from './FlagCardLocator'
import { playerDiscardLocator } from './PlayerDiscardLocator'
import { columnLocator } from './ColumnLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<Flag, MaterialType, LocationType>>> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.Zeppelins]: zeppelinLocator,
  [LocationType.CrewDeck]: crewDeckLocator,
  [LocationType.PrestigiousGuests]: prestigiousGuestLocator,
  [LocationType.Flag]: flagCardLocator,
  [LocationType.Discard]: playerDiscardLocator,
  [LocationType.Column]: columnLocator,
}
