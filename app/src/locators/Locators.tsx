import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { Locator } from '@gamepark/react-game'
import { playerHandLocator } from './PlayerHandLocator'
import { playerTreasureLocator } from './PlayerTreasureLocator'
import { zeppelinLocator } from './ZeppelinLocator'
import { crewDeckLocator } from './CrewDeckLocator'
import { prestigiousGuestLocator } from './PrestigiousGuestLocator'
import { flagCardLocator } from './FlagCardLocator'
import { playerDiscardLocator } from './PlayerDiscardLocator'
import { columnLocator } from './ColumnLocator'

export const Locators: Partial<Record<LocationType, Locator<Flag, MaterialType, LocationType>>> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.Zeppelins]: zeppelinLocator,
  [LocationType.CrewDeck]: crewDeckLocator,
  [LocationType.PrestigiousGuests]: prestigiousGuestLocator,
  [LocationType.Flag]: flagCardLocator,
  [LocationType.Discard]: playerDiscardLocator,
  [LocationType.Column]: columnLocator,
  [LocationType.Treasure]: playerTreasureLocator,
}
