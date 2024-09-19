import { DropAreaDescription, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new DropAreaDescription({ height: 12, width: 35, borderRadius: 0.5 })

  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return location.player === player ? { x: -33, y: 20 } : { x: 33, y: -20 }

  }

  getBaseAngle(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }
}

export const playerHandLocator = new PlayerHandLocator()
