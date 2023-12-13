import { ItemContext, LineLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { zeppelinCardDescription } from '../material/ZeppelinCardDescription'
import { ColumnDescription } from './description/ColumnDescription'

export class ColumnLocator extends LineLocator {

  locationDescription = new ColumnDescription()

  getCoordinates({ location }: MaterialItem, { rules, player }: ItemContext) {
    const x = -18.8
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: x + ((zeppelinCardDescription.height + 1) * location.id - 1),
        y: 13.5,
        z: 0
      }
    }

    const baseX = x + (zeppelinCardDescription.height * 3 + 2)
    return {
      x: baseX - ((zeppelinCardDescription.height + 1) * (location.id - 1)),
      y: -13.5,
      z: 0 }
  }
}

export const columnLocator = new ColumnLocator()