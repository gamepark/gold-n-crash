/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { RuleId } from '@gamepark/gold-n-crash/rules/RuleId'
import { MaterialHistoryProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, isStartRule, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import IconObserve from '../../images/help/icons/discard/observe.jpg'
import { ActionHistory } from './ActionHistory'

export type ObserveRuleHistoryProps = {

} & MaterialHistoryProps

export const  ObserveRuleHistory: FC<ObserveRuleHistoryProps> = (props) => {
  const { move, context } = props
  const action = context.action
  const actionPlayer = action.playerId
  const name = usePlayerName(actionPlayer)
  const opponent = context.game.players.find((p: Flag) => p !== actionPlayer)!
  const opponentName = usePlayerName(opponent)

  if (isStartRule(move) && move.id === RuleId.Observe) {
    return <StartManoeuvreRuleHistory move={move} context={context} playerName={name} />
  }

  if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CrewDeck && move.location.x === 0) {
    if (move.location.x === 0) {
      return <PlaceAtBottomHistory move={move} context={context} playerName={name} opponentName={opponentName}/>
    }

    return <PlaceOnTopHistory move={move} context={context} playerName={name} opponentName={opponentName} />
  }

  return null
}

type StartObserveRuleHistory = {
  playerName: string
} & ObserveRuleHistoryProps

const StartManoeuvreRuleHistory: FC<StartObserveRuleHistory> = (props) => {
  const { context, playerName } = props
  const { action } = context
  const actionPlayer = action.playerId
  const playerId = usePlayerId()
  const itsMyAction = playerId && actionPlayer === playerId

  return (
    <ActionHistory consequence picture={IconObserve} context={context}>
      <Trans defaults={itsMyAction ? 'history.observe.me' : 'history.observe'} values={{
        player: playerName,
        count: action.consequences.filter((m) => isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Hand).length
      }}>
        <strong/>
      </Trans>
    </ActionHistory>
  )
}

type MoveItemHistoryProps = {
  move: MoveItem
  playerName: string
  opponentName: string
} & Omit<ObserveRuleHistoryProps, 'move'>

const PlaceOnTopHistory: FC<MoveItemHistoryProps> = (props) => {
  const { context, playerName } = props
  const { action } = context
  const actionPlayer = action.playerId
  const playerId = usePlayerId()
  const itsMyAction = playerId && actionPlayer === playerId

  return (
    <ActionHistory consequence picture={IconObserve} context={context}>
      <Trans defaults={itsMyAction ? 'history.observe.top.me' : 'history.observe.top'} values={{
        player: playerName
      }}>
        <strong/>
      </Trans>
    </ActionHistory>
  )
}

const PlaceAtBottomHistory: FC<MoveItemHistoryProps> = (props) => {
  const { context, playerName } = props
  const { action } = context
  const actionPlayer = action.playerId
  const playerId = usePlayerId()
  const itsMyAction = playerId && actionPlayer === playerId

  return (
    <ActionHistory consequence picture={IconObserve} context={context}>
      <Trans defaults={itsMyAction ? 'history.observe.bottom.me' : 'history.observe.bottom'} values={{
        player: playerName
      }}>
        <strong/>
      </Trans>
    </ActionHistory>
  )
}
