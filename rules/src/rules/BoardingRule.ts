import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { MaterialType } from '../material/MaterialType'

export class BoardingRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = this.lastOpponentCard
      .maxBy((item) => item.location.x!)
      .moveItems({
        type: LocationType.Hand,
        player: this.player
      })

    moves.push(
      this.rules().startPlayerTurn(RuleId.PlayerTurn, this.player)
    )

    return moves
  }

  get lastOpponentCard() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.opponentColumnIndex)
      .player((player) => player !== this.player)
      .maxBy((item) => item.location.x!)
  }

  get opponentColumnIndex() {
    const id = this.remind(Memory.Column)
    if (id === 1) return 3
    if (id === 3) return 1
    return 2
  }

  onRuleEnd() {
    this.forget(Memory.Column)
    return []
  }
}
