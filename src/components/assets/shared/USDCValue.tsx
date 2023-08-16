import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import React from 'react'

export const USDCValue = ({ amount }: { amount: CurrencyAmount<Currency> }) => {
  return (
    <span style={{ color: '#27D2EA', fontSize: '14px', paddingLeft: '5px' }}>
      <span>$</span>
      {amount ? <span>{amount.toFixed(2, { groupSeparator: ',' })}</span> : `     `}
    </span>
  )
}
