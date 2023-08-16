import { Token } from '@uniswap/sdk-core'

import { WBNB, Evmos } from './native-token'

import { ChainId } from 'constants/chains'
import { MAINNET, TESTNET } from './periphery'

export { WBNB, Evmos }

export const EVMOS = Evmos.onChain(ChainId.MAINNET)

/**
 * Grav Tokens (from tokenlist)
 */

export const GRAV = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd',
    18,
    'GRAV',
    'Graviton - channel-8'
  ),
}

export const gWETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xc03345448969Dd8C00e9E4A85d2d9722d093aF8E',
    18,
    'gWETH',
    'Wrapped Ether - Gravity'
  ),
}

export const gUSDC = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687',
    6,
    'gUSDC',
    'Gravity USDC'
  ),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, TESTNET.mockUSDC, 18, 'MUSDC', 'Mock USDC'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xB2E91f27a9766bFD925D66D88B78D2cE64a846b6', 18, 'MUSDC', 'Mock USDC'),
}

export const USDC = gUSDC

export const gWBTC = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x1d54ecb8583ca25895c512a8308389ffd581f9c9',
    8,
    'gWBTC',
    'Wrapped BTC - Gravity'
  ),
}

export const gDAI = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75',
    18,
    'gDAI',
    'Wrapped DAI - Gravity'
  ),
}

export const gUSDT = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xeceeefcee421d8062ef8d6b4d814efe4dc898265',
    6,
    'gUSDT',
    'USDT - Gravity'
  ),
}

/** ---------- NOMAD TOKENS
 * https://docs.nomad.xyz/bridge/domains.html#milkomeda-c1
 * ----------- */
export const madWETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x5842C5532b61aCF3227679a8b1BD0242a41752f2',
    18,
    'WETH',
    'Wrapped Ether - Nomad'
  ),
}

export const madWBTC = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xF80699Dc594e00aE7bA200c7533a07C1604A106D',
    8,
    'madWBTC',
    'Wrapped BTC - Nomad'
  ),
}

export const madDAI = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x63743ACF2c7cfee65A5E356A4C4A005b586fC7AA',
    18,
    'madDAI',
    'Dai Stablecoin - Nomad'
  ),
}

export const madUSDC = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x51e44FfaD5C2B122C8b635671FCC8139dc636E82',
    6,
    'madUSDC',
    'USD Coin - Nomad'
  ),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, TESTNET.mockUSDC, 18, 'MUSDC', 'Mock USDC'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xB2E91f27a9766bFD925D66D88B78D2cE64a846b6', 18, 'MUSDC', 'Mock USDC'),
}

export const TETHER = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x7FF4a56B32ee13D7D4D405887E0eA37d61Ed919e',
    6,
    'madUSDT',
    'Tether USD - Nomad'
  ),
}

export const FRAX = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x28eC4B29657959F4A5052B41079fe32919Ec3Bd3', 18, 'madFRAX', 'FRAX'),
}

export const FXS = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xd0ec216A38F199B0229AE668a96c3Cd9F9f118A6', 18, 'madFXS', 'FXS'),
}

/**
 * ------------ IBC Tokens
 */

export const ATOM = {
  //@TODO: FIX MAINNET
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x5eF9501fE659b97C45f3A7efD298c14405b454D1', 18, 'MATOM', 'Mock ATOM'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, TESTNET.mockATOM, 18, 'MATOM', 'Mock ATOM'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xC97D061637D6b3a3E54AC76537B2635B112ecdad', 18, 'MATOM', 'Mock ATOM'),
}

export const MEVMOS = makeToken('EVMOS', 'MEVMOS', 18, {
  /**
   * THis is just some mock token
   * Dont use for main net
   */
  [ChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [ChainId.TESTNET]: TESTNET.mockEVMOS,
  [ChainId.RINKEBY]: '0xDfbBc5573024984ddac30BbE632fa3DAA821aBaD',
} as any)

export const OSMOSIS = makeToken('Osmosis', 'OSMOSIS', 18, {
  //@TODO: FIX MAINNET
  [ChainId.MAINNET]: '0x067eC87844fBD73eDa4a1059F30039584586e09d',
  [ChainId.TESTNET]: TESTNET.mockOSMOSIS,
  [ChainId.RINKEBY]: '0x7F2D8c2bb0cD4368C9f44198e0Cd1486cD5Ae1aA',
})
export const DIFFUSION = makeToken('Diffusion', 'DIFF', 18, {
  [ChainId.MAINNET]: '0x3f75ceabCDfed1aCa03257Dc6Bdc0408E2b4b026',
  [ChainId.TESTNET]: TESTNET.diffusion || '0x067eC87844fBD73eDa4a1059F30039584586e09d',
  // Minichef Main Reward
  [ChainId.RINKEBY]: '0x655dfdd82cb10dc7fb931fd85d69887756b922fd',
})

export const XDIFFUSION = makeToken('xDiffusion', 'XDIFF', 18, {
  [ChainId.MAINNET]: MAINNET.diffusionbar,
  [ChainId.TESTNET]: TESTNET.diffusionbar,
  [ChainId.RINKEBY]: /*@TODO: WRONG */ '0x655dfdd82cb10dc7fb931fd85d69887756b922fd',
})

function makeToken(name: string, symbol: string, decimals: number, addresses: Record<ChainId, string>) {
  return {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, addresses[ChainId.MAINNET], decimals, symbol, name),
    [ChainId.TESTNET]: new Token(ChainId.TESTNET, addresses[ChainId.TESTNET], decimals, `M${symbol}`, `Mock ${name}`),
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, addresses[ChainId.TESTNET], decimals, `M${symbol}`, `Mock ${name}`),
  }
}
