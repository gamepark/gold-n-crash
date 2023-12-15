/** @jsxImportSource @emotion/react */
import { ManoeuvreRule } from '@gamepark/gold-n-crash/rules/discard-effect/ManoeuvreRule'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'


export const FishingHeader = () => {
  const rules = useRules<ManoeuvreRule>()!
  const playerId = usePlayerId()
  const me = playerId && rules.getActivePlayer() === playerId
  const opponent = usePlayerName(rules.game.players.find((p) => p !== rules.getActivePlayer()))


  if (me) {
    return <Trans defaults="header.fishing.me" values={{ player: opponent }}><strong /></Trans>
  }

  return <Trans defaults="header.fishing"><strong /></Trans>

}
