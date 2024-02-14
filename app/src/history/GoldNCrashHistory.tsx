/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { RuleId } from '@gamepark/gold-n-crash/rules/RuleId'
import { linkButtonCss, MaterialHistoryProps } from '@gamepark/react-game'
import { isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove, MoveKind, RuleMoveType } from '@gamepark/rules-api'
import { FC } from 'react'
import { BoardingRuleHistory } from './entry/BoardingRuleHistory'
import { BombingRuleHistory } from './entry/BombingRuleHistory'
import { CrackTheTreasureRuleHistory } from './entry/CrackTheTreasureRuleHistory'
import { EndGameHistory } from './entry/EndGameHistory'
import { FishingRuleHistory } from './entry/FishingRuleHistory'
import { LootRuleHistory } from './entry/LootRuleHistory'
import { ManoeuvreRuleHistory } from './entry/ManoeuvreRuleHistory'
import { ObserveRuleHistory } from './entry/ObserveRuleHistory'
import { NewRoundHistory } from './entry/NewRoundHistory'
import { PlayerTurnRuleHistory } from './entry/PlayerTurnRuleHIstory'
import { RecallRuleHistory } from './entry/RecallRuleHistory'
import { SecureRuleHistory } from './entry/SecureRuleHistory'
import { StrengthenRuleHistory } from './entry/StrengthenRuleHistory'

export type GoldNCrashHistoryProps = {
  game: MaterialGame
} & MaterialHistoryProps

export const GoldNCrashHistory: FC<MaterialHistoryProps<MaterialGame, MaterialMove, Flag>> = (props) => {
  const { move, context } = props
  const game = context.game

  if (isStartPlayerTurn(move) && move.id === RuleId.PlayerTurn && move.player === game.players[0]) {
    return <NewRoundHistory />
  }

  if (isStartRule(move) && move.id === RuleId.Strengthen) {
    return <StrengthenRuleHistory move={move} context={context} />
  }

  if (isStartRule(move) && move.id === RuleId.Fishing) {
    return <FishingRuleHistory move={move} context={context} />
  }
  if (isStartRule(move) && move.id === RuleId.Boarding) {
    return <BoardingRuleHistory move={move} context={context} />
  }

  if ((isStartRule(move) && move.id === RuleId.Observe) || game.rule?.id === RuleId.Observe) {
    return <ObserveRuleHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.CrackTheTreasureChest) {
    return <CrackTheTreasureRuleHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Recall) {
    return <RecallRuleHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Loot) {
    return <LootRuleHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Manoeuvre) {
    return <ManoeuvreRuleHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Secure) {
    return <SecureRuleHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.Bombing) {
    return <BombingRuleHistory move={move} context={context} />
  }

  if (game.rule?.id === RuleId.PlayerTurn) {
    return <PlayerTurnRuleHistory move={move} context={context} />
  }

  if (move.kind === MoveKind.RulesMove && move.type === RuleMoveType.EndGame) {
    return <EndGameHistory move={move} context={context}/>
  }

  return <></>
}

export const rulesLinkButton = [linkButtonCss, css`
  color: inherit;
  background-color: transparent;
  font-style: italic;
`]