/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Flag } from '@gamepark/gold-n-cash/material/Flag'
import { LocationType } from '@gamepark/gold-n-cash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-cash/material/MaterialType'
import { Memory } from '@gamepark/gold-n-cash/rules/Memory'
import { MaterialComponent, PlayMoveButton, RulesDialog, ThemeButton, useGame, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialRules, MoveItem } from '@gamepark/rules-api'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const ObserveHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<Flag, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const rules = useRules<MaterialRules>()!
  const legalMoves = useLegalMoves<MoveItem>(isMoveItemType(MaterialType.Card))
  const cards = rules.remind<number[]>(Memory.Observation) ?? []
  const playerName = usePlayerName(game.rule!.player!)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)

  console.log(rules.getActivePlayer())
  if (player && rules.getActivePlayer() === player) {
    return <>
      <Trans defaults="You must <0>decide</0> where to place your observations"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
      <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
        <div css={rulesCss}>
          <h2><Trans defaults="You must decide where to place your observations"><span/></Trans></h2>
          <ul css={observationListCss}>
          {cards.map((card) => {
            const item = rules.material(MaterialType.Card).getItem(card)!
            return (
              <li key={card}>
                <MaterialComponent css={css`font-size: 2em`} type={MaterialType.Card} itemId={item.id.front}/>
                <PlayMoveButton move={legalMoves.find(move => move.itemIndex === card && move.location.x === undefined)}>
                  {t(`Place on top of crew deck`)}
                </PlayMoveButton>
                <PlayMoveButton move={legalMoves.find(move => move.itemIndex === card && move.location.x === 0)}>
                  {t(`Place at the bottom of crew deck`)}
                </PlayMoveButton>
              </li>
            )
          })}
          </ul>
        </div>
      </RulesDialog>
      </>
  } else {
    return <>{t('{player} must choose where to place its observations', { player: playerName })}</>
  }
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`

const observationListCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  list-style-type: none;
  padding: 0;
  margin: 0;
  
  > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0.5em;
  }
  
  button {
    margin: 1em 0 0 0;
  }
`
