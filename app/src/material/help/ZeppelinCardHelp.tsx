/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ZeppelinState } from '@gamepark/gold-n-crash/material/Zeppelin'
import { MaterialHelpProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'


export const ZeppelinCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props;
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const me = playerId === item.location?.player
  const owner = usePlayerName(item.location?.player)
  return (
    <>
      <h2>{t('help.zeppelin.title')}</h2>
      <p>
        <Trans
          defaults={me? 'help.zeppelin.text.me': 'help.zeppelin.text'}
          values={{ owner }}
        >
          <strong />
        </Trans>
      </p>
      {item.location?.rotation === ZeppelinState.VISIBLE && (
        <>
          <hr />
          <p css={alertMessage}>
            <Trans
              defaults="help.zeppelin.destroyed">
              <strong />
            </Trans>

          </p>
        </>
      )}
    </>
  )
}

const alertMessage = css`
  color: red;
  font-style: italic;
`
