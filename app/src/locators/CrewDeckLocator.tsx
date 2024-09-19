import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class CrewDeckLocator extends DeckLocator {

  getCoordinates(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return { x: location.player === player ? -43 : 43 }
  }

  getRotateZ(location: Location, { rules, player = rules.players[0] }: MaterialContext) {
    return location.player === player ? 0 : 180
  }
}

export const crewDeckLocator = new CrewDeckLocator()
