/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { isPrestigiousGuest } from '@gamepark/gold-n-crash/material/Card'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const CardLocationHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerId = usePlayerId()
  const me = item.location?.player === playerId
  const name = usePlayerName(item.location?.player)
  switch (item.location?.type) {
    case LocationType.Hand: return <HandHelp { ...props } me={me} name={name} />
    case LocationType.Column: return <ColumnHelp { ...props } me={me} name={name} />
    case LocationType.Discard: return <DiscardHelp { ...props } me={me} name={name} />
    case LocationType.Treasure: return <TreasureHelp { ...props } me={me} name={name} />
    case LocationType.CrewDeck: return <CrewDeckHelp { ...props } me={me} name={name} />
    case LocationType.PrestigiousGuests: return <PrestigiousHelp { ...props } me={me} name={name} />
  }

  return null
}

type MaterialLocationHelpProps = MaterialHelpProps & {
  me: boolean,
  name: string
}

export const TreasureHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item, me, name } = props
  const rules = useRules<GoldNCashRules>()!
  const cards = rules.material(MaterialType.Card).location(LocationType.CrewDeck).player(item.location?.player).length
  return (
    <div css={italic}>
      <Trans defaults={me? "help.location.treasure.me": "help.location.treasure"} values={{ player: name, cards }}>
        <strong />
      </Trans>
      {isPrestigiousGuest(item.id.back) && <div css={alertStyle}>{t('help.location.treasure.safe')}</div> }
    </div>
  )
}

export const DiscardHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { me, name } = props
  return (
    <div css={italic}>
      <Trans defaults={me? "help.location.discard.me": "help.location.discard"} values={{ player: name }}>
        <strong />
      </Trans>
    </div>
  )
}

export const CrewDeckHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { item, me, name } = props
  const rules = useRules<GoldNCashRules>()!
  const cards = rules.material(MaterialType.Card).location(LocationType.CrewDeck).player(item.location?.player).length
  return (
    <div css={italic}>
      <Trans defaults={me? "help.location.crew-deck.me": "help.location.crew-deck"} values={{ player: name, cards }}>
        <strong />
      </Trans>
    </div>
  )
}

export const HandHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { me, name } = props
  return (
    <div css={italic}>
      <Trans defaults={me? "help.location.hand.me": "help.location.hand"} values={{ player: name }}>
        <strong />
      </Trans>
    </div>
  )
}

export const ColumnHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { item } = props
  const { me, name } = props
  return (
    <div css={italic}>
      <Trans defaults={me? "help.location.column.me": "help.location.column"} values={{ player: name, column: item.location?.id }}>
        <strong />
      </Trans>
    </div>
  )
}

export const PrestigiousHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { me, name } = props
  return (
    <div css={italic}>
      <Trans defaults={me? "help.location.prestigious.me": "help.location.prestigious"} values={{ player: name }}>
        <strong />
      </Trans>
    </div>
  )
}

export const italic = css`
  font-style: italic;
  font-size: 0.9em;
`

export const alertStyle = css`
  font-style: italic;
  font-size: 0.9em;
  color: red;
`
