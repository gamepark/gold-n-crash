/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'


export const LootHeader = () => {
  const rules = useRules<MaterialRules>()!
  const playerId = usePlayerId()
  const player = rules.getActivePlayer()
  const me = player === playerId
  const name = usePlayerName(playerId)
  const opponent = usePlayerName(rules.game.players.find((p) => p !== player ))



  if (me) {
    return <Trans defaults="header.loot.me" values={{ opponent: opponent }}><strong /></Trans>
  }

  return <Trans defaults="header.loot" values={{ player: name, opponent: opponent }}><strong /></Trans>
}
