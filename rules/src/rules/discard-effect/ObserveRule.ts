import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export class ObserveRule extends PlayerTurnRule {

  onRuleStart() {
    const observations = this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(this.player)
      .sort((item) => -item.location.x!)
      .limit(2)

    this.memorize(Memory.Observation, observations.getIndexes())

    return observations.moveItems({
      type: LocationType.Hand,
      player: this.player
    })
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const observations = this
      .material(MaterialType.Card)
      .player(this.player)
      .index((index) => this.observations.includes(index))

    return [
      // BOTTOM
      ...observations.moveItems({
        type: LocationType.CrewDeck,
        player: this.player,
        x: 0
      }),

      // TOP
      ...observations.moveItems({
        type: LocationType.CrewDeck,
        player: this.player,
      }),
    ]
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.CrewDeck) return []
    this.memorize(Memory.Observation, (observations) => observations.filter((observation: number) => observation !== move.itemIndex))

    if (!this.observations.length) {
      return [
        this.rules().startRule(RuleId.PlayerTurn)
      ]
    }

    return []
  }

  onRuleEnd() {
    this.forget(Memory.Observation)
    return []
  }

  get observations() {
    return this.remind(Memory.Observation)
  }
}
