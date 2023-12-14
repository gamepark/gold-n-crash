import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getOpponentColumnIndex } from '../../material/GetOpponentColumn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class BoardingRule extends PlayerTurnRule {
  onRuleStart() {
    const times = this.times
    const moves: MaterialMove[] = this.lastOpponentCard
      .sort((item) => -item.location.x!)
      .limit(times)
      .moveItems((item) => ({
        type: LocationType.Discard,
        player: item.location.player
      }))

    moves.push(this.rules().startRule(RuleId.EndOfCardResolution))

    return moves
  }

  get lastOpponentCard() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(getOpponentColumnIndex(this.column))
      .player((player) => player !== this.player)
      .maxBy((item) => item.location.x!)
  }

  get times() {
    return this.remind(Memory.NumberOfEffect) ?? 1
  }

  get column() {
    return this.remind(Memory.Column)
  }

  onRuleEnd() {
    this.forget(Memory.Column)
    return []
  }
}
