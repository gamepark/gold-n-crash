/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'


export const ManoeuvreHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const player = rules.getActivePlayer()
  const me = player === playerId
  const name = usePlayerName(playerId)

  if (me) {
    return <Trans defaults="header.manoeuvre.me"><strong /></Trans>
  }
  return <Trans defaults="header.manoeuvre" values={{ player: name }}><strong /></Trans>
}
