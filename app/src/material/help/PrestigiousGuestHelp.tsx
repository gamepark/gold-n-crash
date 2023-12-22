/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Card } from '@gamepark/gold-n-crash/material/Card'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import BombIcon from '../../images/help/icons/types/bomb.jpg'
import ChestIcon from '../../images/help/icons/types/chest.jpg'
import FishIcon from '../../images/help/icons/types/fish.jpg'
import GoldIcon from '../../images/help/icons/types/gold.jpg'
import StrengthIcon from '../../images/help/icons/types/strength.jpg'
import SwordIcon from '../../images/help/icons/types/sword.jpg'
import PrestigiousGuest1 from '../../images/help/icons/guest/guest1.jpg'
import PrestigiousGuest2 from '../../images/help/icons/guest/guest2.jpg'
import PrestigiousGuest3 from '../../images/help/icons/guest/guest3.jpg'
import PrestigiousGuest4 from '../../images/help/icons/guest/guest4.jpg'
import PrestigiousGuest5 from '../../images/help/icons/guest/guest5.jpg'
import PrestigiousGuest6 from '../../images/help/icons/guest/guest6.jpg'
import PrestigiousGuest7 from '../../images/help/icons/guest/guest7.jpg'
import PrestigiousGuest8 from '../../images/help/icons/guest/guest8.jpg'
import { CardLocationHelp } from './CardLocationHelp'


export const HiddenPrestigiousGuestHelp: FC<MaterialHelpProps> = () => {
  return <></>
}

export const PrestigiousGuestHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props

  return (
    <>
      <h2>{t('help.prestigious-guest.title')}</h2>
      <p>
        <Trans defaults="help.prestigious-guest">
          <strong/>
        </Trans>
      </p>
      {!!item.id.front && (
        <>
          <h4 css={title}>{t('help.prestigious-guest.condition')}</h4>
          <div css={effectGrid}>
            <div css={image}>
              <Picture src={GuestIcon[item.id.front]}/>
            </div>
            <div css={[description, alignIconText]}>
              {GuestText[item.id.front]}
            </div>
          </div>
        </>
      )}
      <hr/>
      <CardLocationHelp {...props}/>
    </>
  )
}

export const iconStyle = (image: string) => css`
  flex: 1;
  align-self: center;
  background-image: url(${image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 1.2em;
  height: 1.2em;
  display: inline-block;
`

const GuestIcon = {
  [Card.PrestigiousGuest1]: PrestigiousGuest1,
  [Card.PrestigiousGuest2]: PrestigiousGuest2,
  [Card.PrestigiousGuest3]: PrestigiousGuest3,
  [Card.PrestigiousGuest4]: PrestigiousGuest4,
  [Card.PrestigiousGuest5]: PrestigiousGuest5,
  [Card.PrestigiousGuest6]: PrestigiousGuest6,
  [Card.PrestigiousGuest7]: PrestigiousGuest7,
  [Card.PrestigiousGuest8]: PrestigiousGuest8
}

const GuestText = {
  [Card.PrestigiousGuest1]: <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest1}`}><strong/></Trans>,
  [Card.PrestigiousGuest2]: <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest2}`}><strong/></Trans>,
  [Card.PrestigiousGuest3]: (
    <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest3}`}>
      <strong/>
      <div css={iconStyle(StrengthIcon)}/>
    </Trans>
  ),
  [Card.PrestigiousGuest4]: <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest4}`}><strong/></Trans>,
  [Card.PrestigiousGuest5]: (
    <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest5}`}>
      <strong/>
      <div css={iconStyle(BombIcon)}/>
      <div css={iconStyle(SwordIcon)}/>
      <div css={iconStyle(FishIcon)}/>
      <div css={iconStyle(StrengthIcon)}/>
      <div css={iconStyle(ChestIcon)}/>
      <div css={iconStyle(GoldIcon)}/>
    </Trans>
  ),
  [Card.PrestigiousGuest6]: (
    <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest6}`}>
      <strong/>
      <div css={iconStyle(FishIcon)}/>
    </Trans>
  ),
  [Card.PrestigiousGuest7]: (
    <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest7}`}>
      <strong/>
      <div css={iconStyle(GoldIcon)}/>
    </Trans>
  ),
  [Card.PrestigiousGuest8]: (
    <Trans defaults={`help.prestigious-guest.${Card.PrestigiousGuest8}`}>
      <strong/>
      <div css={iconStyle(SwordIcon)}/>
    </Trans>
  )
}

export const alignIconText = css`
  > * {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 2em;
    margin-right: 0.1em;
  }
`


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
