import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { DiscardCardRule } from './delegates/DiscardCardRule'
import { DrawCardRule } from './delegates/DrawCardRule'
import { PlaceCardRule } from './delegates/PlaceCardRule'
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
    const moves = [
      ...new DiscardCardRule(this.game).getPlayerMoves(),
      ...new DrawCardRule(this.game).getPlayerMoves(),
      ...new PlaceCardRule(this.game).getPlayerMoves()
    ]

    if (!moves.length) return this.goToNextPlayerMoves

    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []

    // Ignore prestigious guest
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Treasure) return []

    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Column) {
      moves.push(...new PlaceCardRule(this.game).afterItemMove(move))
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
    this.forget(Memory.PlayedCards)

    const last = this.lastPlayer
    if (last && this.player === last) {
      return [
        this.startRule(RuleId.Scoring)
      ]
    }

    return [
      this.startPlayerTurn(RuleId.PlayerTurn, this.nextPlayer)
    ]
  }

  get actions() {
    return this.remind(Memory.Actions) ?? 0
  }
}
