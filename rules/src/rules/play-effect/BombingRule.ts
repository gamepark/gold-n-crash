import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isRed } from '../../material/Card'
import { getOpponentColumnIndex } from '../../material/GetOpponentColumn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getZeppelinStrength } from '../../material/Zeppelin'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class BombingRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

    const zeppelin = this.zeppelin
    const strength = this.strength
    const zeppelinStrength = getZeppelinStrength(zeppelin.getItem()!.id.front)
    if (zeppelinStrength === undefined) {
      return []
    }

    if (zeppelinStrength <= strength) {
      moves.push(zeppelin.rotateItem(false))
    }

    if (!moves.length) {
      moves.push(this.rules().startRule(RuleId.CardPlaced))
    }

    return moves;
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.ZeppelinCard)(move)) return []

    const moves: MaterialMove[] = []
    // If opponent zeppelins are crashed, the attacker wins
    if (!this.opponentZeppelins.rotation(true).length) {
      moves.push(this.rules().endGame())
    } else {
      moves.push(this.rules().startRule(RuleId.CardPlaced))
    }

    return moves
  }

  get opponentZeppelins() {
    return this
      .material(MaterialType.ZeppelinCard)
      .location(LocationType.Zeppelins)
      .player((player) => player !== this.player)
  }

  get zeppelin() {
    return this.opponentZeppelins
      .locationId(getOpponentColumnIndex(this.column))
  }

  get strength() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.column)
      .player(this.player)
      .filter((item) => isRed(item.id.front))
      .length
  }

  get column() {
    return this.remind(Memory.Column)
  }
}
