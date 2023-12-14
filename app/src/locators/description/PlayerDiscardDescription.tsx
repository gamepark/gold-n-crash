/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gold-n-cash/material/LocationType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../../material/GameCardDescription'

export class PlayerDiscardDescription extends LocationDescription {

  height = gameCardDescription.height + 1.5
  width = gameCardDescription.width + 1.5
  borderRadius = gameCardDescription.borderRadius

  getLocations({ player }: MaterialContext): Location[] {
    if (!player) return []
    return [{
      type: LocationType.Discard,
      player
    }]
  }

  coordinates = { x: -23, y: 0, z: 20 }
}
