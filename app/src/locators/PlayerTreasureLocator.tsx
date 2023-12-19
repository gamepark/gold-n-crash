import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'
import { PlayerTreasureDescription } from './description/PlayerTreasureDescription'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'

export class PlayerTreasureLocator extends DeckLocator {

  locationDescription = new PlayerTreasureDescription()
  delta = { x: -0.05, y: -0.05, z: gameCardDescription.thickness }

  getCoordinates({ location }: MaterialItem, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: -33, y: -8.5, z: 0.05 }
    }

    return { x: 33, y: 8.5, z: 0.05 }
  }

  getRotateZ({ location }: MaterialItem, { rules, player }: ItemContext) {
    return (location.player === (player ?? rules.players[0]))? -90: 90
  }

  getRotations(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): string[] {
    const rotateZ = this.getRotateZ(item, context)
    if (item.location.type === LocationType.Treasure && item.location.rotation) {
      const rotations = [`rotateY(180deg)`]
      return rotateZ ? [`rotateZ(${rotateZ}${this.rotationUnit})`, ...rotations] : rotations
    }

    const rotations = context.material[context.type]?.getRotations(item, context) ?? []
    return rotateZ ? [`rotateZ(${rotateZ}${this.rotationUnit})`, ...rotations] : rotations
  }


}

export const playerTreasureLocator = new PlayerTreasureLocator()
