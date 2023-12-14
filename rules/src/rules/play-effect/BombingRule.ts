import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isRed } from '../../material/Card'
import { getOpponentColumnIndex } from '../../material/GetOpponentColumn'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getZeppelinStrength, ZeppelinState } from '../../material/Zeppelin'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class BombingRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const zeppelin = this.zeppelin
    moves.push(zeppelin.rotateItem(ZeppelinState.PENDING_REVELATION))
    return moves;
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.ZeppelinCard)(move)) return []

    const moves: MaterialMove[] = []

    if (move.location.rotation === ZeppelinState.PENDING_REVELATION) {
      const zeppelin = this.zeppelin
      const strength = this.strength
      const zeppelinStrength = getZeppelinStrength(zeppelin.getItem()!.id.front)
      if (zeppelinStrength === undefined) return []
      if (zeppelinStrength <= strength) {
        moves.push(zeppelin.rotateItem(ZeppelinState.VISIBLE))
        if (this.destroyedZeppelins === 2) {
          moves.push(this.rules().endGame())
          return moves;
        }
      } else {
        moves.push(zeppelin.rotateItem(ZeppelinState.VISIBLE_BY_ME))
      }
    }

    if (this.destroyedZeppelins < 3) {
      // If opponent zeppelins are crashed, the attacker wins
      moves.push(this.rules().startRule(RuleId.EndOfCardResolution))
    }

    return moves
  }

  get destroyedZeppelins() {
    return this.opponentZeppelins.rotation(ZeppelinState.VISIBLE).length
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
