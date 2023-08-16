import Card from 'components/Card'

import { Dots } from 'components/swap/styleds'

import { PairState } from 'hooks/useV2Pairs'
import { useActiveWeb3React } from 'hooks/web3'

import { EmptyProposals } from 'pages/Pool/v2'
import React, { useContext } from 'react'
import { StakingInfo } from 'state/stake/hooks'
import { ThemeContext } from 'styled-components'
import { TYPE } from 'theme'
import { Pair } from '@uniswap/v2-sdk'
import { AssetsTable } from '../AssetsTable'
import LiquidityAssetRow from './LiquidityAssetRow'

const LiquidityAssetsTable = ({
  allV2PairsWithLiquidity,
  stakingInfosWithBalance,
  v2IsLoading,
  v2PairsWithoutStakedAmount,
  stakingPairs,
}: {
  allV2PairsWithLiquidity: Pair[]
  stakingInfosWithBalance: StakingInfo[]
  v2IsLoading: boolean
  v2PairsWithoutStakedAmount: Pair[]
  stakingPairs: [PairState, Pair | null][]
}) => {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  return (
    <AssetsTable>
      {!account ? (
        <Card padding="40px">
          <TYPE.body color={theme.text3} textAlign="center">
            Connect to a wallet to view your liquidity.
          </TYPE.body>
        </Card>
      ) : v2IsLoading ? (
        <EmptyProposals>
          <TYPE.body color={theme.text3} textAlign="center">
            <Dots>Loading</Dots>
          </TYPE.body>
        </EmptyProposals>
      ) : allV2PairsWithLiquidity?.length > 0 || stakingPairs?.length > 0 ? (
        <>
          {v2PairsWithoutStakedAmount.map((v2Pair) => (
            <LiquidityAssetRow
              style={{ padding: '4px 50px 4px 20px', height: '56px' }}
              key={v2Pair.liquidityToken.address}
              pair={v2Pair}
            />
          ))}
          {stakingPairs.map(
            (stakingPair, i) =>
              stakingPair[1] && ( // skip pairs that arent loaded
                <LiquidityAssetRow
                  style={{ padding: '4px 50px 4px 20px', height: '56px' }}
                  key={stakingInfosWithBalance[i].stakingRewardAddress}
                  pair={stakingPair[1]}
                  stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                />
              )
          )}
        </>
      ) : (
        <EmptyProposals>
          <TYPE.body color={theme.text3} textAlign="center">
            No liquidity found.
          </TYPE.body>
        </EmptyProposals>
      )}
    </AssetsTable>
  )
}

export default LiquidityAssetsTable
