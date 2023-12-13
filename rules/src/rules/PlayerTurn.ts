import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { DiscardCardRule } from './delegates/DiscardCardRule'
import { DrawCardRule } from './delegates/DrawCardRule'
import { PlayCardRule } from './delegates/PlayCardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayerTurn extends PlayerTurnRule {

  onRuleStart() {
    if ((this.actions) === 2) {
      this.forget(Memory.Actions)
      return [
        this.rules().startPlayerTurn(RuleId.PlayerTurn, this.nextPlayer)
      ]
    }

    return []
  }

  getPlayerMoves() {
    return [
      ...new DiscardCardRule(this.game).getPlayerMoves(),
      ...new DrawCardRule(this.game).getPlayerMoves(),
      ...new PlayCardRule(this.game).getPlayerMoves()
    ]
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Column) {
      moves.push(...new PlayCardRule(this.game).afterItemMove(move))
    }

    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand) {
      moves.push(...new DrawCardRule(this.game).afterItemMove(move))
    }

    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard) {
      moves.push(...new DiscardCardRule(this.game).afterItemMove(move))
    }

    if (this.actions === 2) {
      return [
        this.rules().startPlayerTurn(RuleId.PlayerTurn, this.nextPlayer)
      ]
    }

    return []
  }

  get actions() {
    return this.remind(Memory.Actions) ?? 0
  }
}
