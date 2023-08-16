import React from 'react'
import { InfoCard } from 'components/InfoCard'

export function NomadWarningBanner({ style }: { style?: any }) {
  return (
    <InfoCard
      style={style}
      title="Nomad Assets on Evmos"
      description={
        <ol>
          <li>
            The Nomad Bridge contract on Ethereum mainnet was exploited. We are working with the Nomad and Evmos teams
            and will keep you updated.
          </li>
          <li>
            The USD prices on Diffusion are derived from madUSDC. Given the exploit Nomad assets might not have their
            expected value.
          </li>
        </ol>
      }
    />
  )
}
