import React from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { AutoColumn } from './Column'
import { CardBGImage, CardNoise, CardSection, DataCard } from './farm/styled'
import { RowBetween } from './Row'
import { Glow } from '../pages/AppBody'

const VoteCard = styled(DataCard)`
  overflow: hidden;
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
  white-space: pre-line;
  backdrop-filter: blur(4px) saturate(150%);
  // ${Glow}
`

export function InfoCard({
  title,
  description,
  style,
}: {
  title: string
  description: string | React.ReactNode
  style?: any
}) {
  return (
    <VoteCard style={style}>
      <CardBGImage />
      <CardSection>
        <AutoColumn gap="md">
          <RowBetween>
            <TYPE.white fontSize={18} fontWeight={600}>
              {title}
            </TYPE.white>
          </RowBetween>
          <RowBetween>
            <TYPE.white fontSize={14}>{description}</TYPE.white>
          </RowBetween>
        </AutoColumn>
      </CardSection>
      <CardBGImage />
      <CardNoise />
    </VoteCard>
  )
}
