import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'

import StakingModal from './StakingModal'
import UnstakingModal from './UnstakingModal'
import styled from 'styled-components'

import { DIFFUSION, XDIFFUSION } from 'constants/tokens'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useState } from 'react'
import { useTokenBalance } from 'state/wallet/hooks'
import { TYPE } from '../../theme'
import { AutoRow, RowBetween } from '../../components/Row'
import { CurrencyLogoFromList } from '../../components/CurrencyLogo/CurrencyLogoFromList'
import { HRDark } from '../../components/HR/HR'

import { useEarnedDiff, useStakingAPY } from 'components/stake/stake-hooks'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { CurrencyAmount } from 'sdk-core/entities'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import { FarmYield } from '../farm/FarmYield'
import JSBI from 'jsbi'
import { CountUp } from 'use-count-up'
import QuestionHelper from '../QuestionHelper'
import { Glow } from '../../pages/AppBody'
import usePrevious from '../../hooks/usePrevious'

export const TokenAndUSDCBalance = styled.div`
  display: flex;
  align-items: center;
`

export function StakingBalance() {
  const { account, chainId } = useActiveWeb3React()
  const token = chainId ? DIFFUSION[chainId] : undefined
  const xToken = chainId ? XDIFFUSION[chainId] : undefined
  const diffusionBalance = useTokenBalance(account ?? undefined, token)
  const diffusionUSDCValue = useUSDCValue(diffusionBalance)
  const xdiffBalance = useTokenBalance(account ?? undefined, xToken)
  const earnedDiff = useEarnedDiff(xdiffBalance)
  const earnedDiffUSDCValue = useUSDCValue(earnedDiff)
  const xDiffContractBalance = useTokenBalance(chainId ? XDIFFUSION[chainId].address : undefined, token)
  const xDiffContractUSDCBalance = useUSDCValue(xDiffContractBalance)
  const emission = token ? CurrencyAmount.fromRawAmount(token, 62500e18) : undefined

  const emissionPerSecond = token ? CurrencyAmount.fromRawAmount(token, 0.72337962963e18) : undefined

  const apr =
    emission && xDiffContractBalance
      ? emission
          ?.divide(xDiffContractBalance ? xDiffContractBalance : JSBI.BigInt(1))
          .multiply(100)
          .multiply(365).quotient
      : JSBI.BigInt(0)

  const ratio = useEarnedDiff(xToken ? CurrencyAmount.fromRawAmount(xToken, 10 ** xToken.decimals) : undefined)
  const ratioPrevious = usePrevious(parseFloat(ratio ? ratio?.toSignificant() : '0'))
  const apy = useStakingAPY()

  const countUpDiffusionBalance = diffusionBalance?.toSignificant() ?? '0'
  const countUpDiffusionBalancePrevious = usePrevious(countUpDiffusionBalance) ?? '0'

  const countUpDiffusionBalanceUSDC = diffusionUSDCValue?.toSignificant() ?? '0'
  const countUpDiffusionBalanceUSDCPrevious = usePrevious(countUpDiffusionBalanceUSDC) ?? '0'

  const countUpXDiffBalance = xdiffBalance?.toSignificant() ?? '0'
  const countUpXDiffBalancePrevious = usePrevious(countUpXDiffBalance) ?? '0'

  const countUpEarnedDiffBalanceUSDC = earnedDiffUSDCValue?.toSignificant() ?? '0'
  const countUpEarnedDiffBalanceUSDCPrevious = usePrevious(countUpEarnedDiffBalanceUSDC) ?? '0'

  const countUpEarnedDiffBalance = earnedDiff?.toSignificant() ?? '0'
  const countUpEarnedDiffBalancePrevious = usePrevious(countUpEarnedDiffBalance) ?? '0'

  const [stakingModalOpen, setStakingModalOpen] = useState(false)
  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false)
  console.log(apy)
  return (
    <>
      <FarmYield
        apr={apr}
        totalDeposits={xDiffContractBalance}
        totalDepositsInUSD={xDiffContractUSDCBalance}
        yourDeposits={earnedDiff}
        yourDepositsInUSD={earnedDiffUSDCValue}
        primaryEmissionPerSecond={emissionPerSecond}
        emissionTimeframe={'daily'}
      />

      <BalanceRow>
        <BalanceColumn justify={`stretch`}>
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TYPE.largeHeader color={'primary1'} marginBottom={`15px`}>
                Your Balances
              </TYPE.largeHeader>
            </AutoColumn>
            <AutoColumn justify={'end'}>
              <TYPE.largeHeader color={'primary1'} marginBottom={`10px`}>
                <TokenLogo>
                  <DoubleCurrencyLogo currency0={xToken} currency1={token} size={16} />
                  <TYPE.body fontSize={16} fontWeight={500} margin={'10px'}>
                    DIFF / xDIFF Ratio:{' '}
                    <span style={{ color: '#27D2EA', fontSize: '14px', paddingLeft: '7px' }}>
                      {ratio ? (
                        <CountUp
                          key={ratio?.toSignificant()}
                          isCounting
                          decimalPlaces={4}
                          start={ratioPrevious}
                          end={parseFloat(ratio?.toSignificant())}
                          thousandsSeparator={','}
                          duration={1}
                        />
                      ) : (
                        `     `
                      )}
                    </span>
                  </TYPE.body>
                  <QuestionHelper text={`Unstaking 1 xDIFF will earn ${ratio?.toSignificant()} DIFF`} />
                </TokenLogo>
              </TYPE.largeHeader>
            </AutoColumn>
          </RowBetween>
          <HRDark />
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TokenLogo>
                <CurrencyLogoFromList currency={token ?? undefined} size={'24px'} />
                <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                  DIFF
                </TYPE.body>
              </TokenLogo>
            </AutoColumn>
            <AutoColumn justify={'end'}>
              <TokenAndUSDCBalance>
                {diffusionBalance?.toSignificant() ? (
                  <CountUp
                    key={diffusionBalance?.toSignificant()}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpDiffusionBalancePrevious)}
                    end={parseFloat(countUpDiffusionBalance)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  <></>
                )}
                <span style={{ color: '#27D2EA', fontSize: '14px', paddingLeft: '5px' }}>
                  <span>$</span>
                  {diffusionUSDCValue ? (
                    <CountUp
                      key={diffusionUSDCValue?.toFixed(0)}
                      isCounting
                      decimalPlaces={2}
                      start={parseFloat(countUpDiffusionBalanceUSDCPrevious)}
                      end={parseFloat(countUpDiffusionBalanceUSDC)}
                      thousandsSeparator={','}
                      duration={1}
                    />
                  ) : (
                    `     `
                  )}
                </span>
              </TokenAndUSDCBalance>
            </AutoColumn>
          </RowBetween>
          <HRDark />
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TokenLogo>
                <CurrencyLogoFromList currency={xToken ?? undefined} size={'24px'} />
                <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                  xDIFF
                </TYPE.body>
              </TokenLogo>
            </AutoColumn>

            <AutoColumn justify={'end'}>
              <TokenAndUSDCBalance>
                {xdiffBalance ? (
                  <CountUp
                    key={xdiffBalance?.toFixed(0)}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpXDiffBalancePrevious)}
                    end={parseFloat(countUpXDiffBalance)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  `     `
                )}
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
          </RowBetween>
          <HRDark />
          <RowBetween>
            <AutoColumn justify={'start'}>
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
            </AutoColumn>

            <AutoColumn justify={'end'}>
              <TokenAndUSDCBalance>
                {earnedDiff ? (
                  <CountUp
                    key={earnedDiff?.toFixed(0)}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpEarnedDiffBalancePrevious)}
                    end={parseFloat(countUpEarnedDiffBalance)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  `     `
                )}
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
          </RowBetween>
        </BalanceColumn>
      </BalanceRow>

      <ButtonRow justify={'space-between'}>
        <AutoColumn justify={'stretch'}>
          <ButtonPrimary
            padding="8px"
            borderRadius="8px"
            width="140px"
            disabled={!diffusionBalance?.greaterThan('0')}
            onClick={() => setStakingModalOpen(true)}
          >
            Stake
          </ButtonPrimary>
        </AutoColumn>
        <AutoColumn justify={'stretch'}>
          <ButtonPrimary
            padding="8px"
            borderRadius="8px"
            width="140px"
            disabled={!xdiffBalance?.greaterThan('0')}
            onClick={() => setUnstakeModalOpen(true)}
          >
            Unstake
          </ButtonPrimary>
        </AutoColumn>
      </ButtonRow>

      <StakingModal
        isOpen={stakingModalOpen}
        onDismiss={() => setStakingModalOpen(false)}
        availableAmount={diffusionBalance}
        currencyToAdd={xToken}
      />
      <UnstakingModal
        isOpen={unstakeModalOpen}
        onDismiss={() => setUnstakeModalOpen(false)}
        availableAmount={xdiffBalance}
      />
    </>
  )
}

const BalanceRow = styled(RowBetween)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
  border-radius: 8px;
  padding: 2% 5%;
  font-size: 22px;
  backdrop-filter: blur(4px) saturate(150%);
  ${Glow}
`

const BalanceColumn = styled(AutoColumn)`
  width: 100%;
`

export const TokenLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonRow = styled(AutoRow)`
  width: 50%;
`
