/** @jsxImportSource @emotion/react */
import { ManoeuvreRule } from '@gamepark/gold-n-crash/rules/discard-effect/ManoeuvreRule'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'


export const FishingHeader = () => {
  const rules = useRules<ManoeuvreRule>()!
  const playerId = usePlayerId()
  const activePlayer = rules.getActivePlayer()
  const me = playerId && activePlayer === playerId
  const player = usePlayerName(activePlayer)


  if (me) {
    return <Trans defaults="header.fishing.me"><strong /></Trans>
  }

  return <Trans defaults="header.fishing" values={{ player: player }}><strong /></Trans>

}
