import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core'
import { BreakLineComponent, currencyKey, isBreakLine } from 'components/SearchModal/CurrencyList'

import React, { useCallback, useRef, useContext } from 'react'
import { FixedSizeList } from 'react-window'
import { AssetsTable } from '../AssetsTable'

import TokenAssetRow from './TokenAssetRow'
import { EmptyProposals } from 'pages/Pool/v2'
import { TYPE } from 'theme'
import { ThemeContext } from 'styled-components'
import { Dots } from 'components/swap/styleds'

const TokensAssetsTable = ({
  currencyAmountsWithBalance,
  sumOfBalances,
  isBalancesLoading,
}: {
  currencyAmountsWithBalance: CurrencyAmount<Token | Currency>[]
  sumOfBalances: number
  isBalancesLoading: boolean
}) => {
  const theme = useContext(ThemeContext)
  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()
  const BREAK_LINE = 'BREAK'

  const itemKey = useCallback((index: number, data: typeof currencyAmountsWithBalance) => {
    const amount = data[index]
    if (isBreakLine(amount)) return BREAK_LINE
    return currencyKey(amount.currency)
  }, [])

  return (
    <AssetsTable headers={['Asset', 'Amount', 'Position Value']}>
      {!(sumOfBalances > 0) && (
        <EmptyProposals>
          <TYPE.body color={theme.text3} textAlign="center">
            {isBalancesLoading ? <Dots>Loading</Dots> : 'No tokens found.'}
          </TYPE.body>
        </EmptyProposals>
      )}
      {sumOfBalances > 0 && (
        <FixedSizeList
          height={250}
          ref={fixedList as any}
          width="100%"
          itemData={currencyAmountsWithBalance}
          itemCount={currencyAmountsWithBalance.length}
          itemSize={56}
          itemKey={itemKey}
        >
          {TokenRow}
        </FixedSizeList>
      )}
    </AssetsTable>
  )
}

function TokenRow({ data, index, style }: { data: any; index: number; style: any }) {
  const amount: CurrencyAmount<Token> | 'BREAK' = data[index]
  if (isBreakLine(amount)) {
    return <BreakLineComponent style={style} />
  }
  const currency = amount.currency
  if (currency) {
    return <TokenAssetRow style={{ ...style, padding: '4px 50px 4px 20px' }} amount={amount} />
  } else {
    return null
  }
}

export default TokensAssetsTable
