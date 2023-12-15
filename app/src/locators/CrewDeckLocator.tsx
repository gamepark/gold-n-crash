import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { gameCardDescription } from '../material/GameCardDescription'

export class CrewDeckLocator extends DeckLocator {


  delta = { x: -0.05, y: -0.05, z: gameCardDescription.thickness }
    
  getCoordinates({ location }: MaterialItem, { rules, player }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: -43, y: 0, z: 0 }
    }

    return { x: 43, y: -0, z: 0 }
  }

  getRotateZ({ location }: MaterialItem, { rules, player }: ItemContext): number {
    return (location.player === (player ?? rules.players[0]))? 0: 180
  }
}

export const crewDeckLocator = new CrewDeckLocator()
