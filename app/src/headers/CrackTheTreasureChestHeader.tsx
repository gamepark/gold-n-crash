/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'


export const CrackTheTreasureChestHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const player = rules.getActivePlayer()
  const me = player === playerId
  const opponent = usePlayerName(rules.game.players.find((p) => p !== player))

  if (playerId && !me) {
    return <Trans defaults="header.crack.me"><strong /></Trans>
  }

  if (!playerId || me) {
    return <Trans defaults="header.crack" values={{ player: opponent }}><strong /></Trans>
  }
  return null
}
