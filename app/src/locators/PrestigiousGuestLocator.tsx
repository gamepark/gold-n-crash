import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { prestigiousGuestCardDescription } from '../material/PrestigiousGuestCardDescription'

export class PrestigiousGuestLocator extends ItemLocator {
  getPosition({ location }: MaterialItem, { rules, player }: ItemContext) {
    const x = -18.8
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: x + ((prestigiousGuestCardDescription.height + 1) * location.id - 1),
        y: prestigiousGuestCardDescription.height / 2 + 0.5,
        z: 0
      }
    }

    const baseX = x + (prestigiousGuestCardDescription.height * 3 + 2)
    return {
      x: baseX - ((prestigiousGuestCardDescription.height + 1) * (location.id - 1)),
      y: -(prestigiousGuestCardDescription.height / 2 + 0.5),
      z: 0
    }
  }
}

export const prestigiousGuestLocator = new PrestigiousGuestLocator()