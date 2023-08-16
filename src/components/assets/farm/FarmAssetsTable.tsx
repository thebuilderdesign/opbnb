// import { HRDark } from 'components/HR/HR'
// import { useToken } from 'hooks/Tokens'
// import { useActiveWeb3React } from 'hooks/web3'
// import { PoolRow } from 'pages/Farm/FarmList'
import React, { Fragment } from 'react'
import { MinichefRawPoolInfo, usePools } from 'state/farm/farm-hooks'
// import { useTokenBalance } from 'state/wallet/hooks'
import { AssetsContainer, AssetsTableHeaderContainer, AssetsTableHeaderText } from '../AssetsTable'
import FarmAssetRow from './FarmAssetRow'

const FarmAssetsTable = () => {
  const { pools } = usePools()

  return (
    <AssetsContainer>
      <AssetsTableHeaderContainer justify={'space-between'}>
        <AssetsTableHeaderText>Farm</AssetsTableHeaderText>
        <AssetsTableHeaderText>LP Amount</AssetsTableHeaderText>
        <AssetsTableHeaderText>Farm Reward</AssetsTableHeaderText>
        <AssetsTableHeaderText>Position Value</AssetsTableHeaderText>
      </AssetsTableHeaderContainer>
      {pools.map((pool: MinichefRawPoolInfo) => (
        <Fragment key={pool.poolId}>
          <FarmAssetRow {...pool} />
        </Fragment>
      ))}
    </AssetsContainer>
  )
}

export default FarmAssetsTable
