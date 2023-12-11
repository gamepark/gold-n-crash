import { LocationType } from '@gamepark/gold-n-cash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-cash/material/MaterialType'
import { Flag } from '@gamepark/gold-n-cash/material/Flag'
import { ItemLocator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, ItemLocator<Flag, MaterialType, LocationType>>> = {}
