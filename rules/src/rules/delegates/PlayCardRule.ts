import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export class PlayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    const hand = this.hand
    for (let id = 1; id <= 3; id++) {
      moves.push(
        ...hand
          .moveItems({
            type: LocationType.Column,
            id,
            player: this.player
          })
      )
    }

    return moves
  }

  get hand() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Hand)
      .player(this.player)
  }

  afterItemMove(_move: ItemMove) {
    this.memorize(Memory.Actions, (action) => (action ?? 0) + 1)
    return []
  }
}
