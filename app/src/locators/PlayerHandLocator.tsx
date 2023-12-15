import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerHandDescription } from './description/PlayerHandDescription'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new PlayerHandDescription()
  getCoordinates(location: Location, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: -33, y: 20, z: 0.05 }
    }

    return { x: 33, y: -20, z: 0.05 }
  }

  getBaseAngle(item: MaterialItem, { player, rules }: ItemContext): number {
    return item.location.player === (player ?? rules.players[0]) ? 0 : 180
  }
}

export const playerHandLocator = new PlayerHandLocator()
