/** @jsxImportSource @emotion/react */
import { getOpponentColumnIndex } from '@gamepark/gold-n-crash/material/GetOpponentColumn'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { ZeppelinState } from '@gamepark/gold-n-crash/material/Zeppelin'
import { Memory } from '@gamepark/gold-n-crash/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const BombingHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const player = rules.getActivePlayer()
  const me = playerId && player === playerId
  const column = rules.remind(Memory.Column)
  const oppositeColumn = getOpponentColumnIndex(column)
  const zeppelin = rules
    .material(MaterialType.ZeppelinCard)
    .location(LocationType.Zeppelins)
    .locationId(oppositeColumn)
    .player((p) => p !== player)
    .getItem()!

  const name = usePlayerName(rules.getActivePlayer())
  const opponentName = usePlayerName(zeppelin.location.player)

  if (!playerId) {
    if (zeppelin.location.rotation === ZeppelinState.VISIBLE) {
      return <Trans defaults="header.bombing.destroy" values={{ player: name, opponent: opponentName}}><strong /></Trans>
    } else {
      return <Trans defaults="header.bombing.pending" values={{ player: name, opponent: opponentName}}><strong /></Trans>
    }
  }


  if (!me) {
    if (zeppelin.location.rotation === ZeppelinState.VISIBLE) {
      return <Trans defaults="header.bombing.destroy.target-me" values={{ player: name }}><strong /></Trans>
    } else {
      return <Trans defaults="header.bombing.pending.target-me" values={{ player: name }}><strong /></Trans>
    }
  }

  if (me) {
    if (zeppelin.location.rotation === ZeppelinState.VISIBLE) {
      return <Trans defaults="header.bombing.destroy.me" values={{ player: opponentName }}><strong /></Trans>
    } else {
      return <Trans defaults="header.bombing.pending.me" values={{ player: opponentName}}><strong /></Trans>
    }
  }

  return null
}
