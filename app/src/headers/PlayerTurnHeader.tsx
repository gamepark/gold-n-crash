/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { Memory } from '@gamepark/gold-n-crash/rules/Memory'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, isStartPlayerTurn, isStartRule, MaterialRules } from '@gamepark/rules-api'
import { FC, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const PlayerTurnHeader: FC = () => {
  const { t } = useTranslation()
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const legalMoves = useLegalMoves()
  const discardMove = useMemo(() => legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType
    .Discard), [legalMoves])
  const drawMove = useMemo(() => legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand), [legalMoves])
  const placeMove = useMemo(() => legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Column), [legalMoves])
  const me = playerId && rules.getActivePlayer() === playerId
  const name = usePlayerName(rules.getActivePlayer())
  const action = 2 - (rules.remind(Memory.Actions) ?? 0)
  const passMove = legalMoves.find((move) => isStartRule(move) || isStartPlayerTurn(move))

  if (!me) return <>{t('header.player-turn.other', { player: name, action })}</>

  // IN RARE CASE, NO ACTION POSSIBLE
  if (passMove) return <Trans defaults="header.play-turn.pass.me"><PlayMoveButton move={passMove}/></Trans>

  // DRAW, DISCARD & PLACE
  if (drawMove && discardMove && placeMove) return <Trans defaults="header.play-turn.all.me"><PlayMoveButton move={drawMove}/></Trans>

  // DRAW & DISCARD
  if (drawMove && discardMove) return <Trans defaults="header.play-turn.draw-discard.me"><PlayMoveButton move={drawMove}/> </Trans>

  // DRAW & PLACE
  if (drawMove && placeMove) return <Trans defaults="header.play-turn.draw-place.me"><PlayMoveButton move={drawMove}/></Trans>

  // DISCARD & PLACE
  if (discardMove && placeMove) return <>{t(me ? 'header.play-turn.discard-place.me' : 'header.play-turn.discard-place')}</>

  // ONLY DISCARD
  if (discardMove) return <>{t(me ? 'header.play-turn.discard.me' : 'header.play-turn.discard')}</>

  // ONLY DRAW
  if (drawMove) return me ? <Trans defaults="header.play-turn.draw.me"><PlayMoveButton move={drawMove}/></Trans> : <>t('header.play-turn.draw')</>

  // ONLY PLACE
  if (placeMove) return <>{t(me ? 'header.play-turn.place.me' : 'header.play-turn.place')}</>

  return null

}
