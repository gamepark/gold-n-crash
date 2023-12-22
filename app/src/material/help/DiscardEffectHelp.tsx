/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '@gamepark/gold-n-crash/material/Card'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import CrackIcon from '../../images/help/icons/discard/crack.jpg'
import ManoeuvreIcon from '../../images/help/icons/discard/manoeuvre.jpg'
import RecallIcon from '../../images/help/icons/discard/recall.jpg'
import ObserveIcon from '../../images/help/icons/discard/observe.jpg'
import LootIcon from '../../images/help/icons/discard/loot.jpg'
import GoldIcon from '../../images/help/icons/play/gold.jpg'


export const DiscardEffectHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const cardId = item.id.front
  return (
    <>
      <h4 css={title}>{t('help.discard.title')}</h4>
      {isRed(cardId) && <CrackTheChestHelp { ...props } />}
      {isBlue(cardId) && <ManoeuvreHelp { ...props } />}
      {isPurple(cardId) && <RecallHelp { ...props } />}
      {isGreen(cardId) && <ObserveHelp { ...props } />}
      {isBrown(cardId) && <LootHelp { ...props } />}
      {isGold(cardId) && <GoldHelp { ...props } />}
    </>
  )
}

const CrackTheChestHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={CrackIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.discard.crack">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const ManoeuvreHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={ManoeuvreIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.discard.manoeuvre">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const RecallHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={RecallIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.discard.recall">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const ObserveHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={ObserveIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.discard.observe">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const LootHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={LootIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.discard.loot">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const GoldHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={GoldIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.discard.gold">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}


const effectGrid = css`
  display: flex;
  min-height: 2em;
`

const image = css`
  & > Picture > img {
    max-width: 7em;
    border: 0.1em solid black;
  }
`

const description = css`
  flex: 4;
  padding-left: 1em;
  white-space: break-spaces;
  font-size: 0.9em;
`

const title = css`
  text-decoration: underline;
  margin-bottom: 0.5em;
`
