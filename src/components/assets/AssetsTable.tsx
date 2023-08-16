import 'styled-components/macro'
import React from 'react'
import { Link } from 'react-router-dom'
import { DefaultTheme } from 'styled-components/macro'
import styled from 'styled-components'
import Column, { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
import { Glow } from '../../pages/AppBody'

export const AssetsContainer = styled(Column)`
  max-width: 1080px;
  width: 100%;
  //background: ${({ theme }: { theme: DefaultTheme }) => theme.secondary1_30};
  //box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
  //  0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  padding: 24px;
  //border: 1px solid blue;
  flex: 1 1;
  position: relative;

  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 35%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
  border-radius: 8px;
  margin-bottom: 50px;
  ${Glow}
`

export function AssetsTable({ headers, children }: { headers?: string[]; children?: React.ReactNode }) {
  return (
    <>
      <AssetsContainer>
        <AssetsTableHeader headersOverride={headers} />
        {children}
      </AssetsContainer>
    </>
  )
}

export const AssetsTableHeaderText = styled(AutoColumn)`
  font-size: 1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.primary1};
  text-align: center;
`

export const AssetsTableHeaderContainer = styled(AutoRow)`
  padding-left: 11%;
  padding-right: 5%;
  margin-bottom: 2%;
`

export const AssetRow = styled(Link)`
  text-decoration: none;
  border-radius: 10px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.text1};
  font-size: 1.1rem;
  //border: 1px solid rgba(12, 92, 146, 0.2);
  //box-shadow: 0 0 5px rgba(39, 210, 234, 0.05), 0 0 7px rgba(39, 210, 234, 0.05);
  :hover,
  :focus {
    color: ${({ theme }) => theme.text2};
    border: 1px solid rgba(12, 92, 146, 0.7);
    box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.1);
    background: linear-gradient(
      264deg,
      rgba(16, 16, 18, 0.1) 0%,
      rgba(39, 210, 234, 0.05) 25%,
      rgba(16, 16, 18, 0.1) 50%,
      rgba(39, 210, 234, 0.05) 75%,
      rgba(16, 16, 18, 0.1) 100%
    );
  }
  padding: 10px 30px;
  margin-top: 2%;
`

export function AssetsTableHeader({ headersOverride }: { headersOverride?: string[] | undefined }) {
  return (
    <AssetsTableHeaderContainer justify={'space-between'}>
      {headersOverride &&
        headersOverride.length &&
        headersOverride.map((header: string) => <AssetsTableHeaderText key={header}>{header}</AssetsTableHeaderText>)}
      {(!headersOverride || !headersOverride.length) && (
        <>
          <AssetsTableHeaderText>Asset</AssetsTableHeaderText>
          <AssetsTableHeaderText>Amount</AssetsTableHeaderText>
          <AssetsTableHeaderText>Position Value</AssetsTableHeaderText>
        </>
      )}
    </AssetsTableHeaderContainer>
  )
}
