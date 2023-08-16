import React from 'react'

import { CardNoise, DataCard, DataRow } from './styled'
import styled from 'styled-components/macro'
import { Box } from 'rebass/styled-components'
import { RowBetween } from 'components/Row'
import { HRDark } from 'components/HR/HR'
import { TYPE } from '../../theme'
import { AutoColumn } from 'components/Column'
import { CurrencyLogoFromList } from 'components/CurrencyLogo/CurrencyLogoFromList'
import { CurrencyAmount, Token } from 'sdk-core/entities'
import JSBI from 'jsbi'
import { BIG_INT_SECONDS_IN_WEEK, BIG_INT_SECONDS_IN_DAY } from 'constants/misc'
import { CountUp } from 'use-count-up'
import usePrevious from '../../hooks/usePrevious'
import useMediaQuery from 'hooks/useMediaQuery'

interface FarmYieldProps {
  totalDeposits?: CurrencyAmount<Token>
  totalDepositsInUSD?: CurrencyAmount<Token> | null | undefined
  yourDeposits?: CurrencyAmount<Token>
  yourDepositsInUSD?: CurrencyAmount<Token> | null | undefined
  primaryEmissionPerSecond?: CurrencyAmount<Token> | null | undefined
  secondaryEmissionPerSecond?: CurrencyAmount<Token>
  emissionTimeframe?: 'weekly' | 'daily'
  apr?: JSBI
  apy?: JSBI
}

export function FarmYield({
  totalDeposits,
  totalDepositsInUSD,
  yourDeposits,
  yourDepositsInUSD,
  primaryEmissionPerSecond,
  secondaryEmissionPerSecond,
  apr,
  apy,
  emissionTimeframe = 'weekly',
}: FarmYieldProps) {
  const isMobile = useMediaQuery('(max-width: 720px)')

  const multiplier = emissionTimeframe === 'weekly' ? BIG_INT_SECONDS_IN_WEEK : BIG_INT_SECONDS_IN_DAY

  const countUpTotalDeposits = totalDeposits?.toFixed(6) ?? '0'
  const countUpTotalDepositsPrevious = usePrevious(countUpTotalDeposits) ?? '0'

  const countUpTotalDepositsUSD = totalDepositsInUSD?.toFixed(6) ?? '0'
  const countUpTotalDepositsUSDPrevious = usePrevious(countUpTotalDepositsUSD) ?? '0'

  const countUpYourDeposits = yourDeposits?.toFixed(6) ?? '0'
  const countUpYourDepositsPrevious = usePrevious(countUpYourDeposits) ?? '0'

  const countUpYourDepositsUSD = yourDepositsInUSD?.toFixed(6) ?? '0'
  const countUpYourDepositsUSDPrevious = usePrevious(countUpYourDepositsUSD) ?? '0'

  const countUpAPR = apr ? apr.toString() : '0'
  const countUpAPRPrevious = usePrevious(countUpAPR) ?? '0'

  const primaryEmissionPerSecondCountUp = primaryEmissionPerSecond
    ?.multiply(multiplier)
    ?.toFixed(0, { groupSeparator: '' })
  const primaryEmissionPerSecondCountUpPrevious = usePrevious(primaryEmissionPerSecondCountUp) ?? '0'
  return (
    <DataRow style={{ gap: '24px' }}>
      <PoolData>
        <RowBetween>
          <PoolHeading width={1.5 / 4} align="end">
            <TYPE.mediumHeader color={'primary1'} fontSize={isMobile ? 16 : 20}>
              Total deposits
            </TYPE.mediumHeader>
          </PoolHeading>
          <PoolHeading width={1.5 / 4} align="end">
            <TYPE.mediumHeader color={'primary1'} fontSize={isMobile ? 16 : 20}>
              Your Deposit
            </TYPE.mediumHeader>
          </PoolHeading>
          <PoolHeading width={1 / 4} align="end">
            {apr ? (
              <TYPE.mediumHeader color={'primary1'} fontSize={isMobile ? 16 : 20}>
                APR
              </TYPE.mediumHeader>
            ) : (
              <></>
            )}
            {apy ? (
              <TYPE.mediumHeader color={'primary1'} fontSize={isMobile ? 16 : 20}>
                APY
              </TYPE.mediumHeader>
            ) : (
              <></>
            )}
          </PoolHeading>
        </RowBetween>
        <HRDark style={{ margin: '0px' }} />
        <RowBetween>
          <PoolHeading width={1.5 / 4} align="right">
            {totalDeposits ? (
              <TYPE.body fontSize={20} fontWeight={500}>
                {totalDeposits ? (
                  <CountUp
                    key={totalDeposits.toFixed(0)}
                    isCounting
                    decimalPlaces={2}
                    start={parseFloat(countUpTotalDepositsPrevious)}
                    end={parseFloat(countUpTotalDeposits)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  <></>
                )}
              </TYPE.body>
            ) : (
              <></>
            )}
            <TYPE.body fontSize={isMobile ? 16 : 20} fontWeight={500} color={totalDeposits ? 'primary1' : 'white'}>
              <span>$</span>
              {totalDepositsInUSD ? (
                <CountUp
                  key={totalDepositsInUSD.toFixed(0)}
                  isCounting
                  decimalPlaces={2}
                  start={parseFloat(countUpTotalDepositsUSDPrevious)}
                  end={parseFloat(countUpTotalDepositsUSD)}
                  thousandsSeparator={','}
                  duration={1}
                />
              ) : (
                <></>
              )}
            </TYPE.body>
          </PoolHeading>
          <PoolHeading width={1.5 / 4} align="right">
            <TYPE.body fontSize={20} fontWeight={500}>
              {yourDeposits ? (
                <CountUp
                  key={yourDeposits.toFixed(0)}
                  isCounting
                  decimalPlaces={2}
                  start={parseFloat(countUpYourDepositsPrevious)}
                  end={parseFloat(countUpYourDeposits)}
                  thousandsSeparator={','}
                  duration={1}
                />
              ) : (
                <></>
              )}
            </TYPE.body>
            <TYPE.body fontSize={isMobile ? 16 : 20} fontWeight={500} color={totalDeposits ? 'primary1' : 'white'}>
              <span>$</span>
              {yourDepositsInUSD ? (
                <CountUp
                  key={yourDepositsInUSD.toFixed(0)}
                  isCounting
                  decimalPlaces={2}
                  start={parseFloat(countUpYourDepositsUSDPrevious)}
                  end={parseFloat(countUpYourDepositsUSD)}
                  thousandsSeparator={','}
                  duration={1}
                />
              ) : (
                <></>
              )}
            </TYPE.body>
          </PoolHeading>
          <PoolHeading width={1 / 4} align="end">
            {apr ? (
              <TYPE.body fontSize={isMobile ? 16 : 20} fontWeight={500}>
                {JSBI.GT(apr, JSBI.BigInt(0)) ? (
                  <CountUp
                    key={apr.toString()}
                    isCounting
                    decimalPlaces={0}
                    start={parseFloat(countUpAPRPrevious)}
                    end={parseFloat(countUpAPR)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                ) : (
                  <></>
                )}
                <span>%</span>
              </TYPE.body>
            ) : (
              <></>
            )}
            {apy ? (
              <TYPE.body fontSize={20} fontWeight={500}>
                {JSBI.GT(apy, JSBI.BigInt(0)) ? `${apy ? apy.toString() : '0'}%` : '-'}
              </TYPE.body>
            ) : (
              <></>
            )}
          </PoolHeading>
        </RowBetween>
        <CardNoise />
        <RowBetween>
          <RewardRate width={1 / 1} align="center">
            <AutoColumn justify={'stretch'}>
              <Heading>
                <CurrencyLogoFromList
                  currency={primaryEmissionPerSecond?.currency ?? undefined}
                  size={isMobile ? '16px' : '24px'}
                />
                <TYPE.body fontWeight={500} margin={'5px'} fontSize={isMobile ? 16 : 20}>
                  {/*{primaryEmissionPerSecond?.multiply(multiplier)?.toFixed(0, { groupSeparator: ',' }) ?? '-'}*/}

                  {primaryEmissionPerSecondCountUp ? (
                    <CountUp
                      key={primaryEmissionPerSecondCountUp}
                      isCounting
                      decimalPlaces={0}
                      start={parseFloat(primaryEmissionPerSecondCountUpPrevious)}
                      end={parseFloat(primaryEmissionPerSecondCountUp)}
                      thousandsSeparator={','}
                      duration={1}
                    />
                  ) : (
                    <></>
                  )}
                  <span style={{ color: '#27D2EA' }}> {` ${primaryEmissionPerSecond?.currency.symbol || ''}`}</span>
                  <span> / {emissionTimeframe === 'weekly' ? 'week' : 'day'}</span>
                </TYPE.body>
              </Heading>
              {secondaryEmissionPerSecond && secondaryEmissionPerSecond.greaterThan(0) && (
                <Heading>
                  <CurrencyLogoFromList
                    currency={secondaryEmissionPerSecond.currency ?? undefined}
                    size={isMobile ? '16px' : '24px'}
                  />
                  <TYPE.body fontWeight={500} margin={'5px'} fontSize={isMobile ? 16 : 20}>
                    {secondaryEmissionPerSecond?.multiply(multiplier)?.toFixed(0, { groupSeparator: ',' }) ?? '-'}
                    <span style={{ color: '#27D2EA' }}>{` ${secondaryEmissionPerSecond?.currency.symbol || ''}`}</span>
                    <span> / {emissionTimeframe === 'weekly' ? 'week' : 'day'}</span>
                  </TYPE.body>
                </Heading>
              )}
            </AutoColumn>
          </RewardRate>
        </RowBetween>
      </PoolData>
    </DataRow>
  )
}

const PoolHeading = styled(Box)<{ align?: string }>`
  text-align: ${({ align }) => align && align};
`

const RewardRate = styled(Box)<{ align?: string }>`
  text-align: ${({ align }) => align && align};
  margin-top: 7%;
`

const PoolData = styled(DataCard)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
  padding: 1.5rem 5rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 6px;
    padding: 1.5rem 1.5rem;
  `};
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
