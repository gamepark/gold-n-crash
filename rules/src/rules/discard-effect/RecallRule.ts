import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class RecallRule extends PlayerTurnRule {
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
            type: LocationType.Hand,
            player: this.player
          })
        )
      }
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    return [
      this.rules().startRule(RuleId.PlayerTurn)
    ]
  }

  get columnCards() {
    return this.material(MaterialType.Card).location(LocationType.Column).player(this.player)
  }
}
