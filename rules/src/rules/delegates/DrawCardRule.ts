import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export class DrawCardRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return this
      .crewDeck
      .maxBy((item) => item.location.x!)
      .moveItems({
        type: LocationType.Hand,
        player: this.player
      })
  }

  get crewDeck() {
    return this
      .material(MaterialType.Card)
      .player(this.player)
      .location(LocationType.CrewDeck)
  }

  afterItemMove(_move: ItemMove) {
    this.memorize(Memory.Actions, (action) => (action ?? 0) + 1)
    return []
  }
}
