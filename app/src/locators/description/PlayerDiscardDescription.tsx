/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { ItemContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../../material/GameCardDescription'

export class PlayerDiscardDescription extends LocationDescription {

  height = gameCardDescription.height + 1.5
  width = gameCardDescription.width + 1.5
  borderRadius = gameCardDescription.borderRadius

  getLocations({ rules, player }: MaterialContext): Location[] {
    if (!player) return []
    return rules.players.map((p) => ({
      type: LocationType.Discard,
      player: p
    }))
  }

  getCoordinates(location: Location, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: -23, y: 0, z: 20 }
    }

    return { x: 23, y: -0, z: 20 }
  }
}
