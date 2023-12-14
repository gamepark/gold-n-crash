import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerDiscardDescription } from './description/PlayerDiscardDescription'

export class PlayerDiscardLocator extends DeckLocator {
  limit = 10
  delta = { x: -0.05, y: -0.05, z: 0.05 }

  locationDescription = new PlayerDiscardDescription()

  getCoordinates({ location }: MaterialItem, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: -23, y: 0, z: 0 }
    }

    return { x: 23, y: -0, z: 0 }
  }

  getRotateZ({ location }: MaterialItem, { rules, player }: ItemContext) {
    return (location.player === (player ?? rules.players[0]))? 0: 180
  }
}

export const playerDiscardLocator = new PlayerDiscardLocator()
