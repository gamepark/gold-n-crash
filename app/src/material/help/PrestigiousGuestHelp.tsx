/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'


export const HiddenPrestigiousGuestHelp: FC<MaterialHelpProps> = () => {
  return <></>
}

export const PrestigiousGuestHelp: FC<MaterialHelpProps> = () => {
  const { t } = useTranslation()
  //const { item } = props

  return (
    <>
      <h2>{t('help.prestigious.card')}</h2>
    </>
  )
}
