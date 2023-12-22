/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '@gamepark/gold-n-crash/material/Card'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import BoardingIcon from '../../images/help/icons/play/boarding.jpg'
import BombardIcon from '../../images/help/icons/play/bombard.jpg'
import FishingIcon from '../../images/help/icons/play/fishing.jpg'
import GoldIcon from '../../images/help/icons/play/gold.jpg'
import SecureIcon from '../../images/help/icons/play/secure.jpg'
import StrengthenIcon from '../../images/help/icons/play/strengthen.jpg'


export const PlayEffectHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const cardId = item.id.front
  return (
    <>
      <h4 css={title}>{t('help.play.title')}</h4>
      {isRed(cardId) && <BombardHelp { ...props } />}
      {isBlue(cardId) && <BoardingHelp { ...props } />}
      {isPurple(cardId) && <FishingHelp { ...props } />}
      {isGreen(cardId) && <StrengthenHelp { ...props } />}
      {isBrown(cardId) && <SecureHelp { ...props } />}
      {isGold(cardId) && <GoldHelp { ...props } />}
    </>
  )
}

const BombardHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={BombardIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.play.bombard">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const BoardingHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={BoardingIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.play.boarding">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const FishingHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={FishingIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.play.fishing">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const StrengthenHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={StrengthenIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.play.strengthen">
            <strong />
          </Trans>
        </div>
      </div>
    </>
  )
}

const SecureHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <div css={effectGrid}>
        <div css={image}>
          <Picture src={SecureIcon} />
        </div>
        <div css={description}>
          <Trans defaults="help.play.secure">
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
          <Trans defaults="help.play.gold">
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
