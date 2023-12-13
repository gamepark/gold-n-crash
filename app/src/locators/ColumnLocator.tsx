import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { zeppelinCardDescription } from '../material/ZeppelinCardDescription'
import { ColumnDescription } from './description/ColumnDescription'

export class ColumnLocator extends LineLocator {

  locationDescription = new ColumnDescription()

  getDeltaMax({ location }: MaterialItem, { rules, player }: ItemContext): Partial<Coordinates> {
    return { y: location.player === (player ?? rules.players[0])? 8.4: (!player? -8.4: -5)}
  }

  getDelta({ location }: MaterialItem, { rules, player }: ItemContext): Partial<Coordinates> {
    if (location.player === (player ?? rules.players[0])) {
      return {
        y: 1.5,
        z: 0.05
      }
    }

    return {
      y: -1.5,
      z: 0.05
    }
  }

  getCoordinates({ location }: MaterialItem, { rules, player }: ItemContext) {
    const x = -18.8
    if (location.player === (player ?? rules.players[0])) {
      return {
        x: x + ((zeppelinCardDescription.height + 1) * location.id - 1),
        y: 20.5,
        z: 0.05
      }
    }

    const baseX = x + (zeppelinCardDescription.height * 3 + 2)
    return {
      x: baseX - ((zeppelinCardDescription.height + 1) * (location.id - 1)),
      y: -20.5,
      z: 0.05
    }
  }

  getRotateZ({ location }: MaterialItem, { rules, player }: ItemContext): number {
    return location.player === (player ?? rules.players[0])? 0: 180
  }
}

export const columnLocator = new ColumnLocator()
