import Column from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import { Balance, currencyKey } from 'components/SearchModal/CurrencyList'

import { useIsUserAddedToken } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import React, { CSSProperties, useContext, useEffect } from 'react'
import { Text } from 'rebass'
import { Currency, CurrencyAmount, Token } from 'sdk-core/entities'
import { useCombinedActiveList } from 'state/lists/hooks'

import { TYPE } from '../../../theme'
import { isTokenOnList } from 'utils'
import Row from 'components/Row'
import Loader from 'components/Loader'
import { useUSDCValue } from 'hooks/useUSDCPrice'

import { AssetContext } from 'contexts/assets/AssetContext'
import { AssetActions } from 'contexts/assets/assets.constants'

const TokenAssetRow = ({
  amount,
  style,
}: {
  amount: CurrencyAmount<Token>
  onSelect?: () => void
  isSelected?: boolean
  otherSelected?: boolean
  style?: CSSProperties
}) => {
  const currency = amount.currency
  const { dispatch: assetsDispatch } = useContext(AssetContext)
  const { account } = useActiveWeb3React()
  const key = currencyKey(currency)
  const selectedTokenList = useCombinedActiveList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency.isToken ? currency : undefined)
  const customAdded = useIsUserAddedToken(currency)
  const balance = amount
  const positionValue = useUSDCValue(balance)

  useEffect(() => {
    if (balance?.greaterThan(0)) {
      assetsDispatch({
        type: AssetActions.ADD_VALUE,
        list: 'tokenValues',
        payload: { [currency.symbol ?? 'Token']: positionValue?.toSignificant(4) },
      })
    }
  }, [assetsDispatch, balance, currency.symbol, positionValue])

  if (!balance?.greaterThan(0)) return null

  const USDCValue = ({ amount }: { amount: CurrencyAmount<Currency> }) => {
    return (
      <span style={{ color: '#27D2EA', fontSize: '14px', paddingLeft: '5px' }}>
        <span>$</span>
        {amount ? <span>{amount.toSignificant(4, { groupSeparator: ',' })}</span> : `     `}
      </span>
    )
  }

  // only show add or remove buttons if not on selected list
  return (
    <Row style={style} className={`token-item-${key}`}>
      <Row>
        <CurrencyLogo currency={currency} size={'24px'} style={{ marginRight: '12px' }} />
        <Column>
          <Text title={currency.name} fontWeight={500}>
            {currency.symbol}
          </Text>
          <TYPE.darkGray ml="0px" fontSize={'12px'} fontWeight={300}>
            {currency.name} {!currency.isNative && !isOnSelectedList && customAdded && '• Added by user'}
          </TYPE.darkGray>
        </Column>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </Row>
      <Row style={{ justifyContent: 'flex-end' }}>
        {positionValue ? <USDCValue amount={positionValue} /> : account ? <Loader /> : null}
      </Row>
    </Row>
  )
}

export default TokenAssetRow
