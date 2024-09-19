import { DropAreaDescription, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { zeppelinLocator } from './ZeppelinLocator'

export class ColumnLocator extends ListLocator {
  locationDescription = new DropAreaDescription({ width: 6.5, height: 17.6, borderRadius: 0.4 })

  getGap(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { y: location.player === player ? 1.5 : -1.5 }
  }

  getMaxGap(location: Location, { rules, player }: MaterialContext) {
    return { y: location.player === (player ?? rules.players[0]) ? 8.4 : (!player ? -8.4 : -5) }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x } = zeppelinLocator.getCoordinates(location, context)
    const y = 20.5
    const player = context.player ?? context.rules.players[0]
    return location.player === player ? { x, y } : { x, y: -y }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }

  getHoverTransform(item: MaterialItem, { rules, player = rules.players[0] }: ItemContext) {
    const transform = ['translateZ(10em)', 'scale(2)']
    if (item.location.player !== player) transform.push('rotateZ(180deg)')
    return transform
  }
}

export const columnLocator = new ColumnLocator()
