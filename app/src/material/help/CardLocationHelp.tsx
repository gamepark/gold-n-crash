/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GoldNCashRules } from '@gamepark/gold-n-crash/GoldNCashRules'
import { isPrestigiousGuest } from '@gamepark/gold-n-crash/material/Card'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { Score } from '@gamepark/gold-n-crash/rules/helper/Score'
import { MaterialHelpProps, PlayMoveButton, useLegalMove, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import IconGold from '../../images/help/icons/gold.png'

export const CardLocationHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerId = usePlayerId()
  const me = item.location?.player === playerId
  const name = usePlayerName(item.location?.player)
  switch (item.location?.type) {
    case LocationType.Hand:
      return <HandHelp {...props} me={me} name={name}/>
    case LocationType.Column:
      return <ColumnHelp {...props} me={me} name={name}/>
    case LocationType.Discard:
      return <DiscardHelp {...props} me={me} name={name}/>
    case LocationType.Treasure:
      return <TreasureHelp {...props} me={me} name={name}/>
    case LocationType.CrewDeck:
      return <CrewDeckHelp {...props} me={me} name={name}/>
    case LocationType.PrestigiousGuests:
      return <PrestigiousHelp {...props} me={me} name={name}/>
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
  const playerId = usePlayerId()
  const rules = useRules<GoldNCashRules>()!
  const cards = rules.material(MaterialType.Card).location(LocationType.Treasure).player(item.location?.player).length
  const itsMine = playerId && item.location?.player === playerId
  const isOver = rules.game.rule === undefined

  return (
    <div css={italic}>
      <Trans defaults={me ? 'help.location.treasure.me' : 'help.location.treasure'} values={{ player: name, cards }}>
        <strong/>
      </Trans>
      {isOver && <div css={goldIndicator}><p>{t(itsMine?'help.treasure.coins.me': 'help.treasure.coins', { player: name, coins: new Score(rules.game, item.location!.player!).gold })}</p></div>}
      {isPrestigiousGuest(item.id.back) && <div css={alertStyle}>{t('help.location.treasure.safe')}</div>}
    </div>
  )
}

export const DiscardHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { me, name } = props
  return (
    <div css={italic}>
      <Trans defaults={me ? 'help.location.discard.me' : 'help.location.discard'} values={{ player: name }}>
        <strong/>
      </Trans>
    </div>
  )
}

export const CrewDeckHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item, itemIndex, me, name, closeDialog } = props
  const rules = useRules<GoldNCashRules>()!
  const cards = rules.material(MaterialType.Card).location(LocationType.CrewDeck).player(item.location?.player).length
  const draw = useLegalMove<MoveItem>((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Hand && move.itemIndex === itemIndex)
  return (
    <>
      <div css={italic}>
        <Trans defaults={me ? 'help.location.crew-deck.me' : 'help.location.crew-deck'} values={{ player: name, cards }}>
          <strong/>
        </Trans>
      </div>
      {draw && <div css={helpButton}><PlayMoveButton move={draw} onPlay={closeDialog}>{t('help.move.draw')}</PlayMoveButton></div>}
    </>
  )
}

export const HandHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { t } = useTranslation()
  const { me, name, itemIndex, closeDialog } = props
  const legalMoves = useLegalMoves()
  const moveToColumn: MoveItem[] = legalMoves.filter((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Column && move.itemIndex === itemIndex)
  const moveToDeck: MoveItem[] = legalMoves.filter((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.CrewDeck && move.itemIndex === itemIndex)
  console.log(moveToDeck)
  return (
    <>
      <div css={italic}>
        <Trans defaults={me ? 'help.location.hand.me' : 'help.location.hand'} values={{ player: name }}>
          <strong/>
        </Trans>
      </div>
      <div>
        {moveToColumn.map((move, index) => (
          <div css={helpButton} key={index}>
            <PlayMoveButton move={move} onPlay={closeDialog}>{t('help.move.place', { column: move.location.id })}</PlayMoveButton>
          </div>
        ))}
        {moveToDeck.map((move, index) => (
          <div css={helpButton} key={index}>
            <PlayMoveButton move={move} onPlay={closeDialog}>
              {t(move.location.x === undefined? `header.observe.me.top`: `header.observe.me.bottom`)}
            </PlayMoveButton>
          </div>
        ))}
      </div>
    </>
  )
}

export const ColumnHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item, itemIndex, closeDialog } = props
  const { me, name } = props
  const moves = useLegalMoves<MaterialMove>(isMoveItemType(MaterialType.Card))
  const discard = moves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard && move.itemIndex === itemIndex)
  const secure = moves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Treasure && move.itemIndex === itemIndex)
  return (
    <>
      <div css={italic}>
        <Trans defaults={me ? 'help.location.column.me' : 'help.location.column'} values={{ player: name, column: item.location?.id }}>
          <strong/>
        </Trans>
      </div>
      {discard && <div css={helpButton}><PlayMoveButton move={discard} onPlay={closeDialog}>{t('help.move.discard')}</PlayMoveButton></div>}
      {secure && <div css={helpButton}><PlayMoveButton move={secure} onPlay={closeDialog}>{t('help.move.secure')}</PlayMoveButton></div>}
    </>

  )
}

export const PrestigiousHelp: FC<MaterialLocationHelpProps> = (props) => {
  const { me, name } = props
  return (
    <div css={italic}>
      <Trans defaults={me ? 'help.location.prestigious.me' : 'help.location.prestigious'} values={{ player: name }}>
        <strong/>
      </Trans>
    </div>
  )
}

export const italic = css`
  font-style: italic;
  font-size: 0.9em;
  margin-bottom: 0.5em;
`

export const alertStyle = css`
  font-style: italic;
  font-size: 0.9em;
  color: red;
`

const goldIndicator = css`
  font-style: italic;
  color: green;
  margin-top: 1em;
  padding-left: 1.5em;
  height: 1.3em;
  display: flex;
  align-items: center;
  
  
  background-image: url(${IconGold});
  background-size: contain;
  background-repeat: no-repeat;
  
  > p {
    font-size: 0.9em;
  }
`

export const helpButton = css`
  margin-bottom: 0.5em;
`