import { Pair } from '@uniswap/v2-sdk'
import { Balance, currencyKey } from 'components/SearchModal/CurrencyList'
import { useActiveWeb3React } from 'hooks/web3'
import React, { CSSProperties, useContext, useEffect } from 'react'
import { Text } from 'rebass'
import { CurrencyAmount, Token } from 'sdk-core/entities'
import { useTokenBalance } from 'state/wallet/hooks'
import Row from 'components/Row'
import Loader from 'components/Loader'
import { useUSDCValue } from 'hooks/useUSDCPrice'
import { unwrappedToken } from 'utils/wrappedCurrency'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { Dots } from 'components/swap/styleds'
import { useTotalSupply } from 'hooks/useTotalSupply'
import JSBI from 'jsbi'
import { AssetContext } from 'contexts/assets/AssetContext'
import { AssetActions } from 'contexts/assets/assets.constants'
import { USDCValue } from '../shared/USDCValue'

const LiquidityAssetRow = ({
  pair,
  stakedBalance,
  style,
}: {
  pair: Pair
  stakedBalance?: CurrencyAmount<Token>
  style?: CSSProperties
}) => {
  const { account } = useActiveWeb3React()
  const { dispatch: assetsDispatch } = useContext(AssetContext)

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)
  const key = currencyKey(currency0)

  const userDefaultPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const userPoolBalance = stakedBalance ? userDefaultPoolBalance?.add(stakedBalance) : userDefaultPoolBalance

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  const token0Value = useUSDCValue(token0Deposited)
  const token1Value = useUSDCValue(token1Deposited)

  const positionValue = token0Value?.multiply(2) || token1Value?.multiply(2)

  const tokenAddress = pair?.liquidityToken?.address
  const positionValueNumber = positionValue?.toSignificant(4) ?? 0

  useEffect(() => {
    if (tokenAddress) {
      assetsDispatch({
        type: AssetActions.ADD_VALUE,
        list: 'liquidityValues',
        payload: { [tokenAddress]: positionValueNumber },
      })
    }
  }, [tokenAddress, positionValueNumber, assetsDispatch])

  if (!userPoolBalance?.greaterThan(0)) return null

  // only show add or remove buttons if not on selected list
  return (
    <Row style={style} className={`token-item-${key}`}>
      <Row>
        <DoubleCurrencyLogo currency0={currency1} currency1={currency0} size={20} />
        <Text fontWeight={500} fontSize={20}>
          {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
        </Text>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        {userPoolBalance ? <Balance balance={userPoolBalance} /> : account ? <Loader /> : null}
      </Row>
      <Row style={{ justifyContent: 'flex-end' }}>
        {positionValue ? <USDCValue amount={positionValue} /> : account ? <Loader /> : null}
      </Row>
    </Row>
  )
}

export default LiquidityAssetRow
