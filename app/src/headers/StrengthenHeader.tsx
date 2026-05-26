import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'


export const StrengthenHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const player = rules.getActivePlayer()
  const me = player === playerId
  const name = usePlayerName(player)

  if (me) {
    return <Trans i18nKey="header.strengthen.me"><strong /></Trans>
  }

  return <Trans i18nKey="header.strengthen" values={{ player: name }}><strong /></Trans>
}
