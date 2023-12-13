import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class FlagCardLocator extends ItemLocator {

  getPosition(item: MaterialItem, { rules, player }: ItemContext) {
    if (item.id === (player ?? rules.players[0])) {
      return { x: -33, y: 0, z: 0 }
    }

    return { x: 33, y: -0, z: 0 }
  }
}

export const flagCardLocator = new FlagCardLocator()