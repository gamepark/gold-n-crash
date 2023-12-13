import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class PlayerDiscardLocator extends DeckLocator {
  delta = { x: -0.05, y: -0.05, z: 0.05 }

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
