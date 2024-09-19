import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { zeppelinLocator } from './ZeppelinLocator'

export class PrestigiousGuestLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const { x } = zeppelinLocator.getCoordinates(location, context)
    const y = gameCardDescription.height / 2 + 0.2
    const player = context.player ?? context.rules.players[0]
    return location.player === player ? { x, y } : { x, y: -y }
  }

  getRotateZ(location: Location, { rules, player = rules.game.players[0] }: MaterialContext): number {
    return location.player === player ? 0 : 180
  }

  getHoverTransform(item: MaterialItem, { rules, player = rules.players[0] }: ItemContext) {
    const transform = ['translateZ(10em)', 'scale(2)']
    if (item.location.player !== player) transform.push('rotateZ(180deg)')
    return transform
  }
}

export const prestigiousGuestLocator = new PrestigiousGuestLocator()