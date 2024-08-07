import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

export class PrestigiousGuestLocator extends ItemLocator {
  getPosition({ location }: MaterialItem, { rules, player }: ItemContext) {
    const x = -18.8
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: x + ((gameCardDescription.height + 1) * location.id - 1),
        y: gameCardDescription.height / 2 + 0.2,
        z: 0
      }
    }

    const baseX = x + (gameCardDescription.height * 3 + 2)
    return {
      x: baseX - ((gameCardDescription.height + 1) * (location.id - 1)),
      y: -(gameCardDescription.height / 2 + 0.2),
      z: 0
    }
  }

  getRotateZ(item: MaterialItem, { player, rules }: ItemContext): number {
    return (player ?? rules.game.players[0]) === item.location.player ? 0 : 180
  }
}

export const prestigiousGuestLocator = new PrestigiousGuestLocator()