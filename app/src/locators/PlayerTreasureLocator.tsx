import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerTreasureDescription } from './description/PlayerTreasureDescription'

export class PlayerTreasureLocator extends DeckLocator {

  locationDescription = new PlayerTreasureDescription()
  delta = { x: -0.05, y: -0.05, z: 0.05 }

  getCoordinates({ location }: MaterialItem, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: -33, y: -8.5, z: 0 }
    }

    return { x: 33, y: 8.5, z: 0 }
  }

  getRotateZ({ location }: MaterialItem, { rules, player }: ItemContext) {
    return (location.player === (player ?? rules.players[0]))? 90: -90
  }
}

export const playerTreasureLocator = new PlayerTreasureLocator()
