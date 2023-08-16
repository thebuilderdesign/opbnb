import React, { useState } from 'react'
import Modal from 'components/Modal'
import styled from 'styled-components/macro'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import { TYPE } from 'theme'
import { Checkbox } from 'components/SearchModal/styleds'
import { ButtonPrimary } from 'components/Button'

const LS_KEY = 'diff:disclaimer-accepted'

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(!localStorage.getItem(LS_KEY))
  const [confirmed, setConfirmed] = useState(false)
  if (!isOpen) {
    return null
  }
  return (
    <Modal
      isOpen
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onDismiss={() => {}}
      maxHeight={90}
      css={`
        max-width: 550px;
      `}
    >
      <Wrapper
        css={`
          overflow: scroll;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        `}
      >
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Before we begin</TYPE.mediumHeader>
          </RowBetween>
          <RowBetween>
            <div
              css={`
                font-size: 12px;
              `}
            >
              <p>
                Diffusion Finance is a decentralized peer-to-peer protocol that people can use to create liquidity and
                trade ERC-20 tokens on Evmos, the Cosmos EVM. Diffusion is a public, open-source or source-available
                software including a set of smart contracts that are deployed on the Evmos Blockchain. Your use of the
                Diffusion protocol involves various risks, including, but not limited to, losses while digital assets
                are being supplied to the Diffusion protocol and losses due to the fluctuation of prices of tokens in a
                trading pair or liquidity pool. Before using the Diffusion protocol, you should review the relevant
                documentation to make sure you understand how the Diffusion protocol works. Additionally, just as you
                can access email email protocols such as SMTP through multiple email clients, you can access the
                Diffusion protocol through dozens of web or mobile interfaces. You are responsible for doing your own
                diligence on those interfaces to understand the fees and risks they present.
              </p>
              <p>
                THE Diffusion PROTOCOL IS PROVIDED &quot;AS IS&quot;, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY
                KIND. The Diffusion protocol is not owned by anyone, it is run by smart contracts deployed on the Evmos
                blockchain. No developer or entity involved in creating the Diffusion protocol will be liable for any
                claims or damages whatsoever associated with your use, inability to use, or your interaction with other
                users of, the Diffusion protocol, including any direct, indirect, incidental, special, exemplary,
                punitive or consequential damages, or loss of profits, cryptocurrencies, tokens, or anything else of
                value.
              </p>
            </div>
          </RowBetween>
          <RowBetween>
            <div
              css={`
                display: flex;
              `}
            >
              <Checkbox
                name="confirmed"
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
              />
              <TYPE.body ml="10px" fontSize="16px" fontWeight={500}>
                I understand the risks and would like to proceed
              </TYPE.body>
            </div>
          </RowBetween>
          <RowBetween>
            <ButtonPrimary
              disabled={!confirmed}
              onClick={() => {
                localStorage.setItem(LS_KEY, 'true')
                setIsOpen(false)
              }}
            >
              Proceed
            </ButtonPrimary>
          </RowBetween>
        </ContentWrapper>
      </Wrapper>
    </Modal>
  )
}

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`
