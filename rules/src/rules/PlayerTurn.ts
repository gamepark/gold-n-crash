import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { DiscardCardRule } from './delegates/DiscardCardRule'
import { DrawCardRule } from './delegates/DrawCardRule'
import { PlayCardRule } from './delegates/PlayCardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayerTurn extends PlayerTurnRule {

  onRuleStart() {
    if ((this.remind(Memory.Actions) ?? 0) === 2) {
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
    if (isMoveItemType(MaterialType.CrewCard)(move) && move.location.type === LocationType.Column) {
      return new PlayCardRule(this.game).afterItemMove(move)
    }

    if (isMoveItemType(MaterialType.CrewCard)(move) && move.location.type === LocationType.Hand) {
      return new DrawCardRule(this.game).afterItemMove(move)
    }

    if (isMoveItemType(MaterialType.CrewCard)(move) && move.location.type === LocationType.Discard) {
      return new DiscardCardRule(this.game).afterItemMove(move)
    }

    return []
  }
}
