import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

export class ZeppelinLocator extends Locator {
  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    const x = (gameCardDescription.height + 1) * (location.id - 2)
    const y = 12.6
    return location.player === player ? { x, y } : { x: -x, y: -y }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? -90 : 90
  }
}

export const zeppelinLocator = new ZeppelinLocator()