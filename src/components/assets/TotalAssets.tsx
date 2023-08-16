import 'styled-components/macro'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { DefaultTheme } from 'styled-components/macro'

import { AssetContext } from 'contexts/assets/AssetContext'
import Loader from 'components/Loader'

const TotalAssetsContainer = styled.div`
  max-width: 1080px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  margin-bottom: 50px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ContentTitle = styled.h2`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
  margin-bottom: 12px;
`

const ContentValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`

export const TotalAssets = ({
  isBalanceLoading,
  stakedBalance,
}: {
  stakedBalance: number
  isBalanceLoading: boolean
}) => {
  const { state: assetsState } = useContext(AssetContext)
  const { tokenValues, farmValues, liquidityValues } = assetsState

  const sumOfValues = (obj: any) =>
    Object.values(obj).reduce<number>((acc, curr) => {
      const accNumber: number = acc ?? 0
      const parsedCurr: number = curr ? parseFloat(curr as string) : 0
      return accNumber + parsedCurr
    }, 0)

  const tokensBalance = sumOfValues(tokenValues)
  const farmsBalance = sumOfValues(farmValues)
  const liquidityBalance = sumOfValues(liquidityValues)

  const total = (tokensBalance as number) + stakedBalance + (farmsBalance as number) + (liquidityBalance as number)
  console
  return (
    <TotalAssetsContainer>
      <ContentContainer>
        <ContentTitle>Total Assets</ContentTitle>
        <ContentValue>{isBalanceLoading ? <Loader /> : `$${total.toLocaleString()}`}</ContentValue>
      </ContentContainer>
      <ContentContainer>
        <ContentTitle>Token</ContentTitle>
        <ContentValue>{isBalanceLoading ? <Loader /> : `$${(tokensBalance as number).toLocaleString()}`}</ContentValue>
      </ContentContainer>
      <ContentContainer>
        <ContentTitle>Liquidity</ContentTitle>
        <ContentValue>
          {isBalanceLoading ? <Loader /> : `$${(liquidityBalance as number).toLocaleString()}`}
        </ContentValue>
      </ContentContainer>
      <ContentContainer>
        <ContentTitle>Farms</ContentTitle>
        <ContentValue>{isBalanceLoading ? <Loader /> : `$${(farmsBalance as number).toLocaleString()}`}</ContentValue>
      </ContentContainer>
      <ContentContainer>
        <ContentTitle>Staked</ContentTitle>
        <ContentValue>{isBalanceLoading ? <Loader /> : `$${stakedBalance.toLocaleString()}`}</ContentValue>
      </ContentContainer>
    </TotalAssetsContainer>
  )
}
