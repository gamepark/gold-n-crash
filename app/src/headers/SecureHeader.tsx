/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'


export const SecureHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const player = rules.getActivePlayer()
  const me = player === playerId
  const name = usePlayerName(player)


  if (me) {
    return <Trans defaults="header.secure.me"><strong /></Trans>
  }

  return <Trans defaults="header.secure" values={{ player: name }}><strong /></Trans>
}
