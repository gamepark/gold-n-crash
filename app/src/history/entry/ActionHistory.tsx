/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { ActionHistoryEntry, ActionHistoryEntryProps } from '@gamepark/react-game'
import { FC } from 'react'
import { playerColorCode } from '../../panels/PlayerPanels'


export const ActionHistory: FC<ActionHistoryEntryProps> = (props) => {
  const { context, children, ...rest } = props
  return (
    <ActionHistoryEntry context={context} getColor={getColor} {...rest}>
      {children}
    </ActionHistoryEntry>
  )
}

const getColor = (flag: Flag) => playerColorCode[flag]