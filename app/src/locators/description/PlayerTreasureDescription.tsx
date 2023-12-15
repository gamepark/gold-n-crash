/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../../material/GameCardDescription'

export class PlayerTreasureDescription extends LocationDescription {

  height = gameCardDescription.height + 1.5
  width = gameCardDescription.width + 1.5
  borderRadius = gameCardDescription.borderRadius

  getLocations({ player }: MaterialContext): Location[] {
    if (!player) return []
    return [{
      type: LocationType.Treasure,
      player
    }]
  }

  rotateZ = 90

  coordinates = { x: -33, y: -8.5, z: 20 }
}
