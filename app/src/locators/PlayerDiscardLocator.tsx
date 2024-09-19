import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerDiscardLocator extends DeckLocator {
  limit = 10

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: location.player === player ? -23 : 23 }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }
}

export const playerDiscardLocator = new PlayerDiscardLocator()
