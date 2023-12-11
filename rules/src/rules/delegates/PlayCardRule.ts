import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from '../Memory'

export class PlayCardRule extends PlayerTurnRule {

  afterItemMove(_move: ItemMove) {
    this.memorize(Memory.Actions, (action) => (action ?? 0) + 1)
    return []
  }
}
