/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { HistoryEntry, HistoryEntryContext, Picture, PlayerHistoryEntry } from '@gamepark/react-game'
import { FC } from 'react'
import { playerColorCode } from '../../panels/PlayerPanels'

type ActionHistoryProps = {
  consequence?: boolean
  picture?: string
  pictureCss?: any
  context: HistoryEntryContext
}


export const ActionHistory: FC<ActionHistoryProps> = (props) => {
  const { consequence, picture, pictureCss, context, children } = props
  const Component = consequence? HistoryEntry: PlayerHistoryEntry
  return (
    <Component context={context} css={[color(context.action.playerId)]}>
      <div css={flex}>
        {consequence && (
          <div css={consequenceIcon}>⤷</div>
        )}
        <div css={growth}>
          {children}
        </div>
        {picture && (
          <div css={actionPicture}>
            <Picture css={[pictureStyle, pictureCss]} src={picture}/>
          </div>
        )}
      </div>
    </Component>
  )
}

const flex = css`
  display: flex;
  width: 100%;
  align-items: center;
`

const growth = css`
  flex: 1;
`

const pictureStyle = css`
  height: 2.5em; 
  border-radius: 0.5em; 
  border: 0.1em solid black
`

const color = (flag: Flag) => css`
  background-color: ${playerColorCode[flag]}20;
`

const actionPicture = css`
  padding-left: 0.3em;
  border-radius: 0.5em;
`

const consequenceIcon = css`
  font-size: 1.5em;
  margin-right: 0.4em;
  margin-left: 0.5em;
`