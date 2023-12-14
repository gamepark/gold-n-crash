import { hideFront, hideFrontToOthers, MaterialItem, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { Flag } from './material/Flag'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ZeppelinState } from './material/Zeppelin'
import { CrackTheTreasureChestRule } from './rules/discard-effect/CrackTheTreasureChestRule'
import { LootRule } from './rules/discard-effect/LootRule'
import { ManeuverRule } from './rules/discard-effect/ManeuverRule'
import { ObserveRule } from './rules/discard-effect/ObserveRule'
import { BoardingRule } from './rules/play-effect/BoardingRule'
import { BombingRule } from './rules/play-effect/BombingRule'
import { EndOfCardResolutionRule } from './rules/play-effect/EndOfCardResolutionRule'
import { FishingRule } from './rules/play-effect/FishingRule'
import { SecureRule } from './rules/play-effect/SecureRule'
import { StrengthenRule } from './rules/play-effect/StrengthenRule'
import { PlayerTurn } from './rules/PlayerTurn'
import { RecallRule } from './rules/discard-effect/RecallRule'
import { RuleId } from './rules/RuleId'

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


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class GoldNCashRules extends SecretMaterialRules<Flag, MaterialType, LocationType> {

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
      [LocationType.Treasure]: hideFront,
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
    [RuleId.Maneuver]: ManeuverRule,
    [RuleId.Recall]: RecallRule,
    [RuleId.Observe]: ObserveRule,
    [RuleId.Loot]: LootRule,
    [RuleId.EndOfCardResolution]: EndOfCardResolutionRule
  }
}
