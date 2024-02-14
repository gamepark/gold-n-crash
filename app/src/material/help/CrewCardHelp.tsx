/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getColorText } from '../../utils/color.utils'
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
  const color = getColorText(t, item.id.front)

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
