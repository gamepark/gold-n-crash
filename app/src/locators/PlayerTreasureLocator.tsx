import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerTreasureLocator extends DeckLocator {

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? { x: -33, y: -8.5 } : { x: 33, y: 8.5 }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? -90 : 90
  }
}

export const playerTreasureLocator = new PlayerTreasureLocator()
