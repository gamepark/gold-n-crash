/** @jsxImportSource @emotion/react */
import { Card, isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '@gamepark/gold-n-crash/material/Card'
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CardLocationHelp } from './CardLocationHelp'
import { DiscardEffectHelp } from './DiscardEffectHelp'
import { PlayEffectHelp } from './PlayEffectHelp'


export const HiddenCrewCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const playerId = usePlayerId()
  const me = item.id.back === playerId
  const name = usePlayerName(item.id.back)

  if (me) {
    return (
      <>
        <h2>{t('help.crew-card.hidden.title', { flag: t(`player.${item.id.back}`)})}</h2>
        <p>
          <Trans defaults="help.crew-card.me" values={{ player: name }}>
            <strong />
          </Trans>
        </p>
        <hr />
        <CardLocationHelp { ...props }/>
      </>
    )
  }

  return (
    <>
      <h2>{t('help.crew-card.hidden.title', { flag: t(`player.${item.id.back}`)})}</h2>
      <p>
        <Trans defaults="help.crew-card" values={{ player: name }}>
          <strong />
        </Trans>
      </p>
      <hr />
      <CardLocationHelp { ...props }/>
    </>
  )

}

export const CrewCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const playerId = usePlayerId()
  const me = item.id.back === playerId
  const name = usePlayerName(item.id.back)
  const color = getColor(t, item.id.front)

  if (me) {
    return (
      <>
        <h2>{t('help.crew-card.title', { flag: t(`player.${item.id.back}`), color: color})}</h2>
        <p>
          <Trans defaults="help.crew-card.me" values={{ player: name }}>
            <strong />
          </Trans>
        </p>
        <PlayEffectHelp { ...props } />
        <DiscardEffectHelp { ...props } />
        <hr />
        <CardLocationHelp { ...props }/>
      </>
    )
  }

  return (
    <>
      <h2>{t('help.crew-card.title', { flag: t(`player.${item.id.back}`), color: color})}</h2>
      <p>
        <Trans defaults="help.crew-card" values={{ player: name }}>
          <strong />
        </Trans>
      </p>
      <PlayEffectHelp { ...props } />
      <DiscardEffectHelp { ...props } />
      <hr />
      <CardLocationHelp { ...props }/>
    </>
  )
}

const getColor = (t: TFunction, c: Card) => {
  if (isGold(c)) return t('color.gold')
  if (isGreen(c)) return t('color.green')
  if (isRed(c)) return t('color.red')
  if (isBlue(c)) return t('color.blue')
  if (isPurple(c)) return t('color.purple')
  if (isBrown(c)) return t('color.brown')

  return ''
}
