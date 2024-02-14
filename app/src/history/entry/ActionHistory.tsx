/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { HistoryEntry, HistoryEntryContext, Picture, PlayerHistoryEntry } from '@gamepark/react-game'
import { FC } from 'react'

type ActionHistoryProps = {
  consequence?: boolean
  picture: string
  pictureCss?: any
  context: HistoryEntryContext
}

export const ActionHistory: FC<ActionHistoryProps> = (props) => {
  const { consequence, picture, pictureCss, context, children } = props
  const Component = consequence? HistoryEntry: PlayerHistoryEntry
  return (
    <Component border context={context}>
      <div css={flex}>
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

const actionPicture = css`
  padding-left: 0.3em;
  border-radius: 0.5em;
`