/** @jsxImportSource @emotion/react */
import { DiscardColumn } from '@gamepark/gold-n-crash/rules/helper/DiscardColumn'
import { Memory } from '@gamepark/gold-n-crash/rules/Memory'
import { PrestigiousGuestRule } from '@gamepark/gold-n-crash/rules/prestigious-guests/PrestigiousGuestRule'
import { useRules } from '@gamepark/react-game'
import { MaterialRules } from '@gamepark/rules-api'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'


export const EndOfCardResolutionHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<MaterialRules>()!
  const column = rules.remind(Memory.Column)
  const securingGuest = useMemo(() => new PrestigiousGuestRule(rules.game, column), [rules.game])
  const discardColumn = useMemo(() => new DiscardColumn(rules.game, column), [rules.game])

  if (securingGuest.secureGuestMoves.length) {
    return <>{t('header.secure-guest')}</>
  }

  if (discardColumn.discardMoves.length) {
    return <>{t('header.discard-column')}</>
  }

  return <>...</>
}
