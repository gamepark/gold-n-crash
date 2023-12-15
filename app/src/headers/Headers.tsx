/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/gold-n-crash/rules/RuleId'
import { ComponentType } from 'react'
import { BoardingHeader } from './BoardingHeader'
import { BombingHeader } from './BombingHeader'
import { CrackTheTreasureChestHeader } from './CrackTheTreasureChestHeader'
import { EndOfCardResolutionHeader } from './EndOfCardResolutionHeader'
import { FishingHeader } from './FishingHeader'
import { LootHeader } from './LootHeader'
import { ManoeuvreHeader } from './ManoeuvreHeader'
import { ObserveHeader } from './ObserveHeader'
import { PlayerTurnHeader } from './PlayerTurnHeader'
import { RecallHeader } from './RecallHeader'
import { ScoringHeader } from './ScoringHeader'
import { SecureHeader } from './SecureHeader'
import { StrengthenHeader } from './StrengthenHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.Observe]: ObserveHeader,
  [RuleId.PlayerTurn]: PlayerTurnHeader,
  [RuleId.Bombing]: BombingHeader,
  [RuleId.Boarding]: BoardingHeader,
  [RuleId.Fishing]: FishingHeader,
  [RuleId.Strengthen]: StrengthenHeader,
  [RuleId.Secure]: SecureHeader,
  [RuleId.CrackTheTreasureChest]: CrackTheTreasureChestHeader,
  [RuleId.Manoeuvre]: ManoeuvreHeader,
  [RuleId.Recall]: RecallHeader,
  [RuleId.Loot]: LootHeader,
  [RuleId.EndOfCardResolution]: EndOfCardResolutionHeader,
  [RuleId.Scoring]: ScoringHeader
}
