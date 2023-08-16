import React, { useCallback, useMemo, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import JSBI from 'jsbi'
import { Token, CurrencyAmount } from '@uniswap/sdk-core'
import { RouteComponentProps } from 'react-router-dom'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'

import CurrencyLogo from 'components/CurrencyLogo'
import { AutoRow, RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage, DataButtonRow } from '../../components/farm/styled'
import { ButtonPrimary } from '../../components/Button'
import StakingModal from '../../components/farm/StakingModal'
import UnstakingModal from '../../components/farm/UnstakingModal'
import ClaimRewardModal from '../../components/farm/ClaimRewardModal'
import { useActiveWeb3React } from '../../hooks/web3'
import { CountUp } from 'use-count-up'

import { currencyId } from '../../utils/currencyId'
import usePrevious from '../../hooks/usePrevious'
import { BIG_INT_ZERO } from '../../constants/misc'
import {
  usePairTokens,
  useRewardInfos,
  usePool,
  useOwnWeeklyEmission,
  useCalculateAPR,
  useFarmTVL,
  NOMAD_POOLS,
} from 'state/farm/farm-hooks'
import { PotionIcon4 } from '../../components/Potions/Potions'

import { HRDark } from '../../components/HR/HR'

import { useUSDCValue } from 'hooks/useUSDCPrice'
import { FarmYield } from 'components/farm/FarmYield'
import { Glow } from '../AppBody'
import { NomadWarningBanner } from 'components/WarningBanner/NomadWarningBanner'
import { unwrappedToken } from 'utils/wrappedCurrency'
import { useTotalSupply } from 'hooks/useTotalSupply'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`

const BottomSection = styled(AutoColumn)`
  border-radius: 8px;
  width: 100%;
  position: relative;
  ${Glow}
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  //margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

const VoteCard = styled(DataCard)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 35%, ${theme.darkTransparent} 100%);`};
  overflow: hidden;
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const YourDeposits = styled(RowBetween)`
  align-items: baseline;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
  `};
`

const YourDepositsHeading = styled(RowBetween)`
  align-items: baseline;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: center;
  `};
`

const PageHeading = styled(TYPE.largeHeader)`
  display: flex;
  margin: 0;
  gap: 5px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: center;
  `};
`

export default function Manage({ match: { params } }: RouteComponentProps<{ poolId?: string }>) {
  const { account } = useActiveWeb3React()

  const poolId = params.poolId ? parseInt(params.poolId) : 0

  const pool = usePool(poolId)
  const { lpTokenAddress, pendingAmount, stakedRawAmount, rewarderAddress, poolEmissionAmount } = pool || {}
  const { token0, token1, availableLPAmount, lpToken, totalPoolStaked, pair } = usePairTokens(lpTokenAddress)
  const { pendingAmount: pendingRewardAmount, rewardPerSecondAmount } = useRewardInfos(poolId, rewarderAddress)
  const stakedAmount = lpToken ? CurrencyAmount.fromRawAmount(lpToken, stakedRawAmount || 0) : undefined
  const totalPoolTokens = useTotalSupply(lpToken ?? undefined)

  const currency0 = token0 ? unwrappedToken(token0) : token0
  const currency1 = token1 ? unwrappedToken(token1) : token1

  const ownPrimaryWeeklyEmission = useOwnWeeklyEmission(poolEmissionAmount, stakedAmount, totalPoolStaked)

  const ownSecondaryWeeklyEmission = useOwnWeeklyEmission(rewardPerSecondAmount, stakedAmount, totalPoolStaked)

  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = availableLPAmount
  const isNomad = NOMAD_POOLS.includes(poolId)
  const showAddLiquidityButton = Boolean(stakedAmount?.equalTo('0') && userLiquidityUnstaked?.equalTo('0')) && !isNomad

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false)

  const valueOfTotalStakedAmountInUSDC = useFarmTVL(pair ?? undefined, totalPoolStaked)
  const primaryAPR = useCalculateAPR(poolEmissionAmount, valueOfTotalStakedAmountInUSDC)
  const secondaryAPR = useCalculateAPR(rewardPerSecondAmount, valueOfTotalStakedAmountInUSDC)
  const totalAPR = JSBI.add(primaryAPR || JSBI.BigInt(0), secondaryAPR || JSBI.BigInt(0))

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!stakedAmount &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, stakedAmount.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, stakedAmount, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, stakedAmount, false),
        ]
      : [undefined, undefined]

  const token0Value = useUSDCValue(token0Deposited)
  const token1Value = useUSDCValue(token1Deposited)

  const positionValue = token0Value?.multiply(2) || token1Value?.multiply(2)

  const toggleWalletModal = useWalletModalToggle()

  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true)
    } else {
      toggleWalletModal()
    }
  }, [account, toggleWalletModal])

  // Just to match the API for the Modals
  const stakingInfo = useMemo(() => {
    if (!stakedAmount || !pendingAmount || !token0 || !token1) {
      return null
    }
    return {
      poolId,
      tokens: [token0, token1] as [Token, Token],
      stakedAmount: stakedAmount!,
      earnedAmount: pendingAmount!,
      earnedAmountSecondary: pendingRewardAmount!,
      lpTokenAddress,
    }
  }, [lpTokenAddress, pendingAmount, poolId, stakedAmount, pendingRewardAmount, token0, token1])
  return (
    <PageWrapper gap="lg" justify="center">
      <AutoRow justify={'space-between'}>
        <Heading>
          <PotionIcon4 width={60} height={60} />
          <PageHeading>
            <span>
              {currency0?.symbol}-{currency1?.symbol}
            </span>
            <span>Liquidity Mining</span>
          </PageHeading>
        </Heading>
        <DoubleCurrencyLogo
          currency0={currency0 ?? undefined}
          currency1={currency1 ?? undefined}
          size={48}
          margin={true}
        />
      </AutoRow>
      {NOMAD_POOLS.includes(poolId) && <NomadWarningBanner />}

      <FarmYield
        apr={totalAPR}
        primaryEmissionPerSecond={poolEmissionAmount}
        secondaryEmissionPerSecond={rewardPerSecondAmount}
        // totalDeposits={totalPoolStaked}
        totalDepositsInUSD={valueOfTotalStakedAmountInUSDC}
        yourDepositsInUSD={positionValue}
      />

      {showAddLiquidityButton && (
        <VoteCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Step 1. Get Diffusion Liquidity tokens</TYPE.white>
              </RowBetween>
              <RowBetween style={{ marginBottom: '1rem' }}>
                <TYPE.white fontSize={14}>
                  {`Diffusion LP tokens are required. Once you've added liquidity to the ${token0?.symbol}-${token1?.symbol} pool you can stake your liquidity tokens on this page.`}
                </TYPE.white>
              </RowBetween>
              <ButtonPrimary
                padding="8px"
                borderRadius="8px"
                width={'fit-content'}
                as={Link}
                to={`/add/v2/${token0 && currencyId(token0)}/${token1 && currencyId(token1)}`}
              >
                {`Add ${currency0?.symbol}-${currency1?.symbol} liquidity`}
              </ButtonPrimary>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </VoteCard>
      )}

      {stakingInfo && (
        <>
          <StakingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingInfo={stakingInfo}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
          <UnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            stakingInfo={stakingInfo}
          />
          <ClaimRewardModal
            isOpen={showClaimRewardModal}
            onDismiss={() => setShowClaimRewardModal(false)}
            stakingInfo={stakingInfo}
          />
        </>
      )}

      <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
        <BottomSection gap="lg" justify="center">
          <StyledBottomCard dim={stakingInfo?.stakedAmount?.equalTo(JSBI.BigInt(0))}>
            {/*<CardSection>*/}
            {/*<CardBGImage desaturate />*/}
            <CardNoise />
            <AutoColumn gap="md">
              <YourDepositsHeading>
                <TYPE.white fontWeight={600}>Your liquidity deposits</TYPE.white>
              </YourDepositsHeading>
              <YourDeposits>
                <TYPE.white fontSize={36} fontWeight={600}>
                  {stakingInfo?.stakedAmount?.toSignificant(6) ?? '-'}
                </TYPE.white>
                <TYPE.white>
                  DIFF-LP {currency0?.symbol}-{currency1?.symbol}
                </TYPE.white>
              </YourDeposits>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.white>Underlying {token0Deposited?.currency.symbol}</TYPE.white>
                <TYPE.white>
                  {token0Deposited?.toSignificant(6) ?? '-'}
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={token0Deposited?.currency} />
                </TYPE.white>
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.white>Underlying {token1Deposited?.currency.symbol}</TYPE.white>
                <TYPE.white>
                  {token1Deposited?.toSignificant(6) ?? '-'}
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={token1Deposited?.currency} />
                </TYPE.white>
              </RowBetween>
            </AutoColumn>
            <HRDark />
            {/*</CardSection>*/}

            {/*<CardBGImage desaturate />*/}
            <CardNoise />
            <RewardRow
              pendingAmount={pendingAmount}
              ownWeeklyEmission={ownPrimaryWeeklyEmission}
              action={
                stakingInfo?.earnedAmount &&
                JSBI.notEqual(BIG_INT_ZERO, stakingInfo?.earnedAmount?.quotient) && (
                  <ButtonPrimary
                    padding="8px"
                    borderRadius="8px"
                    width="fit-content"
                    onClick={() => setShowClaimRewardModal(true)}
                  >
                    Claim
                  </ButtonPrimary>
                )
              }
            />
            <HRDark />
            {rewardPerSecondAmount && rewardPerSecondAmount.greaterThan(0) && (
              <RewardRow
                pendingAmount={pendingRewardAmount ?? undefined}
                ownWeeklyEmission={ownSecondaryWeeklyEmission}
                style={{ paddingTop: 16 }}
              />
            )}
          </StyledBottomCard>
        </BottomSection>
        <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
          <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
            ⭐️
          </span>
          When you withdraw, the contract will automagically claim all rewards on your behalf!
        </TYPE.main>

        {!showAddLiquidityButton && (
          <DataButtonRow style={{ marginBottom: '1rem' }}>
            {stakingInfo && !isNomad && (
              <ButtonPrimary padding="8px" borderRadius="8px" width="360px" onClick={handleDepositClick}>
                {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) ? 'Deposit' : 'Deposit Diffusion LP Tokens'}
              </ButtonPrimary>
            )}

            {stakedAmount?.greaterThan(JSBI.BigInt(0)) && (
              <>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="8px"
                  width="160px"
                  onClick={() => setShowUnstakingModal(true)}
                >
                  Withdraw
                </ButtonPrimary>
              </>
            )}
          </DataButtonRow>
        )}
        {!userLiquidityUnstaked || userLiquidityUnstaked.equalTo('0') ? null : (
          <TYPE.main>{userLiquidityUnstaked.toSignificant(6)} Diffusion LP tokens available</TYPE.main>
        )}
      </PositionInfo>
    </PageWrapper>
  )
}

type RewardRowProps = {
  action?: React.ReactNode
  ownWeeklyEmission?: CurrencyAmount<Token>
  pendingAmount?: CurrencyAmount<Token>
  style?: React.CSSProperties
}
function RewardRow({ action, ownWeeklyEmission, pendingAmount, style }: RewardRowProps) {
  const countUpAmount = pendingAmount?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'
  return (
    <AutoColumn gap="sm" style={style}>
      <RowBetween>
        <div>
          <TYPE.black>Your unclaimed {pendingAmount?.currency.symbol}</TYPE.black>
        </div>
        {action}
      </RowBetween>
      <RowBetween style={{ alignItems: 'baseline' }}>
        <TYPE.largeHeader fontSize={36} fontWeight={600}>
          <CountUp
            key={countUpAmount}
            isCounting
            decimalPlaces={4}
            start={parseFloat(countUpAmountPrevious)}
            end={parseFloat(countUpAmount)}
            thousandsSeparator={','}
            duration={6}
          />
        </TYPE.largeHeader>
        {ownWeeklyEmission?.greaterThan(0) && (
          <TYPE.black fontSize={16} fontWeight={500}>
            <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px ' }}>
              ⚡
            </span>
            {ownWeeklyEmission?.toFixed(0, { groupSeparator: ',' }) ?? '-'} {pendingAmount?.currency.symbol}
            {' / week'}
          </TYPE.black>
        )}
      </RowBetween>
    </AutoColumn>
  )
}
