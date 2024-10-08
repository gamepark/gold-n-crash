import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class StrengthenRule extends PlayerTurnRule {

  onRuleStart() {
    const deck = this.deck
    const times = this.times

    const moves: MaterialMove[] = deck
      .sort((item) => -item.location.x!)
      .limit(times)
      .moveItems({
        type: LocationType.Hand,
        player: this.player
      })
    moves.push(this.startRule(RuleId.EndOfCardResolution))

    return moves
  }

  get times() {
    return this.remind(Memory.NumberOfEffect) ?? 1
  }

  afterItemMove() {
    if (!this.deck.length && !this.lastPlayer) {
      this.memorize(Memory.LastPlayer, this.game.players.find((p) => p !== this.player))
    }

    return []
  }

  get deck() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(this.player)
  }

  get lastPlayer() {
    return this.remind(Memory.LastPlayer)
  }
}
