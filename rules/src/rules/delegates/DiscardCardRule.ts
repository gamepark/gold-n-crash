import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Memory } from '../Memory'

export class DiscardCardRule extends PlayerTurnRule {
  
  afterItemMove(_move: ItemMove) {
    this.memorize(Memory.Actions, (action) => (action ?? 0) + 1)
    return []
  }
}
