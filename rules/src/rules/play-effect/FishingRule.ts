import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class FishingRule extends PlayerTurnRule {
  onRuleStart() {
    const discard = this.discard
    const times = this.times

    const moves: MaterialMove[] = discard
      .limit(times)
      .moveItems({
        type: LocationType.Hand,
        player: this.player
      })

    moves.push(this.rules().startRule(RuleId.CardPlaced))
    return moves
  }

  get times() {
    return this.remind(Memory.NumberOfEffect) ?? 1
  }

  get discard() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Discard)
      .player(this.player)
  }
}
