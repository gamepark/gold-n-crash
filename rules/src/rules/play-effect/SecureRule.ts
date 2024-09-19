import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class SecureRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    for (const other of this.otherColumns) {
      const cardInColumn = this
        .material(MaterialType.Card)
        .location(LocationType.Column)
        .locationId(other)
        .player(this.player)
        .maxBy((item) => item.location.x!)
        .moveItems({
          type: LocationType.Treasure,
          player: this.player,
          rotation: true
        })

      if (cardInColumn.length) {
        moves.push(...cardInColumn)
      }
    }

    return moves
  }

  get otherColumns() {
    const columns = []
    for (let id = 1; id <= 3; id++) {
      if (id !== this.column && Math.abs(id - this.column) === 1) {
        columns.push(id)
      }
    }

    return columns
  }

  get column() {
    return this.remind(Memory.Column)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Treasure) return []
    this.memorize(Memory.EffectPlayed, (e) => (e ?? 0) + 1)
    if (this.times !== this.effectPlayed && this.getPlayerMoves().length > 0) return []

    return [
      this.startRule(RuleId.EndOfCardResolution)
    ]
  }
  get times() {
    return this.remind(Memory.NumberOfEffect) ?? 1
  }

  get effectPlayed() {
    return this.remind(Memory.EffectPlayed) ?? 0
  }

  onRuleEnd() {
    this.forget(Memory.EffectPlayed)
    this.forget(Memory.NumberOfEffect)
    return []
  }
}
