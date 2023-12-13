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
    if (this.actions === 2) {
      return this.goToNextPlayerMoves
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
      this.memorize(Memory.Column, move.location.id)
      moves.push(...new PlayCardRule(this.game).afterItemMove(move))
    }

    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand) {
      moves.push(...new DrawCardRule(this.game).afterItemMove(move))
    }

    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard) {
      moves.push(...new DiscardCardRule(this.game).afterItemMove(move))
    }

    if (moves.length) {
      return moves;
    }

    if (this.actions === 2) {
      moves.push(...this.goToNextPlayerMoves)
    }

    return moves
  }

  get lastPlayer() {
    return this.remind(Memory.LastPlayer)
  }

  get goToNextPlayerMoves() {
    this.forget(Memory.Actions)
    this.forget(Memory.Column)

    const last = this.lastPlayer
    if (last && this.player === last) {
      return [
        this.rules().endGame()
      ]
    }

    return [
      this.rules().startPlayerTurn(RuleId.PlayerTurn, this.nextPlayer)
    ]
  }

  get actions() {
    return this.remind(Memory.Actions) ?? 0
  }
}
