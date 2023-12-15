import {
  CompetitiveRank,
  hideFront,
  hideFrontToOthers,
  HidingStrategy,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules
} from '@gamepark/rules-api'
import { Flag } from './material/Flag'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ZeppelinState } from './material/Zeppelin'
import { CrackTheTreasureChestRule } from './rules/discard-effect/CrackTheTreasureChestRule'
import { LootRule } from './rules/discard-effect/LootRule'
import { ManoeuvreRule } from './rules/discard-effect/ManoeuvreRule'
import { ObserveRule } from './rules/discard-effect/ObserveRule'
import { RecallRule } from './rules/discard-effect/RecallRule'
import { Score } from './rules/helper/Score'
import { BoardingRule } from './rules/play-effect/BoardingRule'
import { BombingRule } from './rules/play-effect/BombingRule'
import { EndOfCardResolutionRule } from './rules/play-effect/EndOfCardResolutionRule'
import { FishingRule } from './rules/play-effect/FishingRule'
import { SecureRule } from './rules/play-effect/SecureRule'
import { StrengthenRule } from './rules/play-effect/StrengthenRule'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'
import { ScoringRule } from './rules/ScoringRule'

const zeppelinStrategy = (item: MaterialItem, player?: Flag) => {
  switch (item.location.rotation) {
    case ZeppelinState.PENDING_REVELATION:
      return player === item.location.player? []: ['id.front']
    case ZeppelinState.VISIBLE_BY_ME:
      return player === item.location.player? []: ['id.front']
    case ZeppelinState.VISIBLE:
      return []
    default:
      return ['id.front']
  }
}

export const hideCardWhenRotated: HidingStrategy = (item: MaterialItem) => {
  return item.location.rotation? ['id.front']: []
}


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class GoldNCashRules extends SecretMaterialRules<Flag, MaterialType, LocationType>
  implements CompetitiveRank<MaterialGame<Flag, MaterialType, LocationType>, MaterialMove<Flag, MaterialType, LocationType>, Flag>{
  rankPlayers(playerA: Flag, playerB: Flag): number {
    const playerAScore = new Score(this.game, playerA)
    const playerBScore = new Score(this.game, playerB)

    if (playerBScore.hasAllZeppelinDestroyed) return -1
    if (playerAScore.hasAllZeppelinDestroyed) return 1
    return playerBScore.gold - playerAScore.gold
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.CrewDeck]: new PositiveSequenceStrategy(),
      [LocationType.Column]: new PositiveSequenceStrategy(),
      [LocationType.Treasure]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Hand]: hideFrontToOthers,
      [LocationType.CrewDeck]: hideFront,
      [LocationType.Treasure]: hideCardWhenRotated,
    },
    [MaterialType.ZeppelinCard]: {
      [LocationType.Zeppelins]: zeppelinStrategy
    }
  }

  rules = {
    [RuleId.PlayerTurn]: PlayerTurn,
    [RuleId.Bombing]: BombingRule,
    [RuleId.Boarding]: BoardingRule,
    [RuleId.Fishing]: FishingRule,
    [RuleId.Strengthen]: StrengthenRule,
    [RuleId.Secure]: SecureRule,
    [RuleId.CrackTheTreasureChest]: CrackTheTreasureChestRule,
    [RuleId.Manoeuvre]: ManoeuvreRule,
    [RuleId.Recall]: RecallRule,
    [RuleId.Observe]: ObserveRule,
    [RuleId.Loot]: LootRule,
    [RuleId.EndOfCardResolution]: EndOfCardResolutionRule,
    [RuleId.Scoring]: ScoringRule
  }
}
