import { ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export class DiscardCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    const columnCards = this.columnCards
    for (let id = 1; id <= 3; id++) {
      const card = columnCards
        .locationId(id)
        .maxBy((item) => item.location.x!)

      if (card.length) {
        moves.push(
          card.moveItem({
            type: LocationType.Discard,
            player: this.player
          })
        )
      }
    }

    return moves
  }

  get columnCards() {
    return this.material(MaterialType.Card).location(LocationType.Column).player(this.player)
  }

  afterItemMove(_move: ItemMove) {
    this.memorize(Memory.Actions, (action) => (action ?? 0) + 1)
    return []
  }
}
