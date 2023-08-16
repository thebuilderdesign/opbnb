import { AutoColumn } from 'components/Column'
import { CurrencyLogoFromList } from 'components/CurrencyLogo/CurrencyLogoFromList'
import { HRDark } from 'components/HR/HR'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow } from 'components/Row'
import { useEarnedDiff } from 'components/stake/stake-hooks'
import { TokenAndUSDCBalance, TokenLogo } from 'components/stake/StakingBalance'
import { DIFFUSION, XDIFFUSION } from 'constants/tokens'
import usePrevious from 'hooks/usePrevious'
import { useUSDCValue } from 'hooks/useUSDCPrice'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { useTokenBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme'
import { CountUp } from 'use-count-up'
import { AssetRow, AssetsContainer, AssetsTableHeaderContainer, AssetsTableHeaderText } from '../AssetsTable'

export const StakedAssetRow = ({
  asset,
  assetName,
  assetHelper,
  amount,
  positionValue,
}: {
  asset: React.ReactNode | any | undefined
  assetName: string
  amount: any
  positionValue: any
  assetHelper?: string
}) => (
  <AssetRow to="/stake">
    <AutoRow gap="0%" justify={'space-between'}>
      <AutoColumn justify="start" style={{ width: '33%' }}>
        <TokenLogo>
          <CurrencyLogoFromList currency={asset ?? undefined} size={'24px'} />
          <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
            {assetName}
          </TYPE.body>
          {!!assetHelper && <QuestionHelper text={assetHelper} />}
        </TokenLogo>
      </AutoColumn>
      <AutoColumn justify="center" style={{ width: '33%' }}>
        <TokenAndUSDCBalance>{amount}</TokenAndUSDCBalance>
      </AutoColumn>
      <AutoColumn justify="end" style={{ width: '33%' }}>
        <TokenAndUSDCBalance>{positionValue}</TokenAndUSDCBalance>
      </AutoColumn>
    </AutoRow>
    <HRDark />
  </AssetRow>
)

const StakedAssetsTable = () => {
  const { account, chainId } = useActiveWeb3React()
  const token = chainId ? DIFFUSION[chainId] : undefined
  const xToken = chainId ? XDIFFUSION[chainId] : undefined
  const xdiffBalance = useTokenBalance(account ?? undefined, xToken)
  const earnedDiff = useEarnedDiff(xdiffBalance)
  const earnedDiffUSDCValue = useUSDCValue(earnedDiff)

  const countUpXDiffBalance = xdiffBalance?.toSignificant() ?? '0'
  const countUpXDiffBalancePrevious = usePrevious(countUpXDiffBalance) ?? '0'
  const countUpEarnedDiffBalanceUSDC = earnedDiffUSDCValue?.toSignificant() ?? '0'
  const countUpEarnedDiffBalanceUSDCPrevious = usePrevious(countUpEarnedDiffBalanceUSDC) ?? '0'

  const countUpEarnedDiffBalance = earnedDiff?.toSignificant() ?? '0'
  const countUpEarnedDiffBalancePrevious = usePrevious(countUpEarnedDiffBalance) ?? '0'

  return (
    <AssetsContainer>
      <AssetsTableHeaderContainer justify={'space-between'}>
        <AssetsTableHeaderText>Staked Asset</AssetsTableHeaderText>
        <AssetsTableHeaderText>Equivalent Amount</AssetsTableHeaderText>
        <AssetsTableHeaderText>Position Value</AssetsTableHeaderText>
      </AssetsTableHeaderContainer>
      <AssetRow to="/stake" style={{ cursor: 'pointer' }}>
        <AutoRow gap="0%" justify={'space-between'}>
          <AutoColumn justify="start" style={{ width: '33%', display: 'flex' }}>
            <TokenLogo>
              <CurrencyLogoFromList currency={xToken ?? undefined} size={'24px'} />
              <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                xDiff
              </TYPE.body>
              {/* {!!assetHelper && <QuestionHelper text={assetHelper} />} */}
            </TokenLogo>
            <TokenAndUSDCBalance>
              <CountUp
                key={xdiffBalance?.toFixed(0)}
                isCounting
                decimalPlaces={2}
                start={parseFloat(countUpXDiffBalancePrevious)}
                end={parseFloat(countUpXDiffBalance)}
                thousandsSeparator={','}
                duration={1}
              />
            </TokenAndUSDCBalance>
          </AutoColumn>
          <AutoColumn justify="center" style={{ width: '33%', display: 'flex' }}>
            <TokenLogo>
              <CurrencyLogoFromList currency={token ?? undefined} size={'24px'} />
              <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                Staked DIFF
              </TYPE.body>
              <QuestionHelper
                text={`${earnedDiff?.toFixed(
                  2
                )} DIFF is available upon unstaking ${xdiffBalance?.toSignificant()} xDIFF.`}
              />
            </TokenLogo>
            <TokenAndUSDCBalance style={{ marginLeft: 12 }}>
              {earnedDiff ? (
                <CountUp
                  key={earnedDiff?.toFixed(0)}
                  isCounting
                  decimalPlaces={2}
                  start={parseFloat(countUpEarnedDiffBalancePrevious)}
                  end={parseFloat(countUpEarnedDiffBalance)}
                  thousandsSeparator={','}
                  duration={1}
                />
              ) : (
                `     `
              )}
            </TokenAndUSDCBalance>
          </AutoColumn>
          <AutoColumn justify="end" style={{ width: '33%' }}>
            <TokenAndUSDCBalance>
              {' '}
              <span style={{ color: '#27D2EA', fontSize: '14px', paddingLeft: '5px' }}>
                <span>$</span>
                {earnedDiffUSDCValue ? (
                  <CountUp
                    key={earnedDiffUSDCValue?.toFixed(0)}
                    isCounting
                    decimalPlaces={2}
                    start={parseFloat(countUpEarnedDiffBalanceUSDCPrevious)}
                    end={parseFloat(countUpEarnedDiffBalanceUSDC)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  `     `
                )}
              </span>
            </TokenAndUSDCBalance>
          </AutoColumn>
        </AutoRow>
        <HRDark />
      </AssetRow>
    </AssetsContainer>
  )
}

export default StakedAssetsTable
