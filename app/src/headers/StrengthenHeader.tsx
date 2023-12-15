/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'


export const StrengthenHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const me = playerId && rules.getActivePlayer() === playerId
  const name = usePlayerName(rules.getActivePlayer())

  if (me) {
    return <Trans defaults="header.strengthen.me"><strong /></Trans>
  }

  return <Trans defaults="header.strengthen" values={{ player: name }}><strong /></Trans>
}
