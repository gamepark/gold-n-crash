import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class FlagCardLocator extends Locator {

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: location.player === player ? -33 : 33 }
  }

  getRotateZ(location: Location, { rules, player = rules.game.players[0] }: MaterialContext) {
    return location.player === player ? 90 : -90
  }
}

export const flagCardLocator = new FlagCardLocator()