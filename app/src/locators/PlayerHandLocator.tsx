import { DropAreaDescription, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new DropAreaDescription({ height: 12, width: 35, borderRadius: 0.5 })

  getCoordinates(location: Location, { rules, player = rules.players[0] }: ItemContext) {
    return location.player === player ? { x: -33, y: 20 } : { x: 33, y: -20 }

  }

  getBaseAngle(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }

  // The opponent's hand is displayed face down: do not lift/zoom its cards on hover.
  getHoverTransform(item: MaterialItem, context: ItemContext) {
    const { rules, player = rules.players[0] } = context
    if (item.location.player !== player) return []
    return super.getHoverTransform(item, context)
  }
}

export const playerHandLocator = new PlayerHandLocator()
