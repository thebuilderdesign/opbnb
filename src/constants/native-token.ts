import { ChainId } from './chains'
import { Token } from '../sdk-core/entities/token'
import { NativeCurrency } from '../sdk-core/entities/nativeCurrency'
import invariant from 'tiny-invariant'
import { WETH9_ADDRESS } from './addresses'

export const WBNB = {
  // Mainly for unit tests
  1: new Token(1, WETH9_ADDRESS[4], 18, 'WBNB', 'WBNB'),
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, WETH9_ADDRESS[ChainId.MAINNET], 18, 'WBNB', 'WBNB'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, WETH9_ADDRESS[ChainId.TESTNET], 18, 'WBNB', 'WBNB'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, WETH9_ADDRESS[ChainId.RINKEBY], 18, 'WBNB', 'WBNB'),
}
export const WETH9 = WBNB

export class Evmos extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'BNB', 'BNB')
  }

  public get wrapped(): Token {
    const weth9 = WBNB[this.chainId as ChainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Evmos } = {}

  public static onChain(chainId: number): Evmos {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Evmos(chainId))
  }

  public equals(other: NativeCurrency | Token): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
