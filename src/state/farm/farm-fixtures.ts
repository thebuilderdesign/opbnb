export const hund = {}
// import { BigintIsh, CurrencyAmount, Token } from '@uniswap/sdk-core'
// import { BigNumber } from 'ethers'
// import JSBI from 'jsbi'

// type SerializedFarmResponse = GlobalFarmResponse & {
//   farms: Record<number, SerializedFarm>
// }

// type GlobalFarmResponse = {
//   diffusionPerSecond: SerializedBigNumber
//   totalAllocation: SerializedBigNumber
// }

// type SerializedFarm = {
//   poolId: number
//   lpTokenAddress: string
//   rewarderAddress?: string
//   poolInfo: SerializedPoolInfo

//   //   secondaryEmissionPerSecond?: SerializedCurrencyAmount
//   // secondaryPoolInfo?: SerializedPoolInfo
//   //   apr: string
//   //   pair: SerializedPair
// }

// type Farm = {
//   poolId: number
//   lpTokenAddress: string
//   rewarderAddress?: string
//   poolInfo: PoolInfo

//   // Computed
//   primaryEmissionPerSecondRaw: JSBI
//   totalAllocation: BigNumber
//   secondaryEmissionPerSecond?: CurrencyAmount<Token>
//   secondaryPoolInfo?: PoolInfo
//   apr: JSBI
//   pair: SerializedPair
// }

// export const data: Record<number, SerializedFarm> = {}

// function parseFarmResposne(resp: SerializedFarmResponse): Farm[] {
//   return Object.values(resp.farms).map((farm) => parseFarm(farm, resp))
// }

// function parseFarm(raw: SerializedFarm, rawGlobal: GlobalFarmResponse): Farm {
//   const totalAllocation = parseBigNumber(rawGlobal.totalAllocation)
//   const diffusionPerSecond = parseBigNumber(rawGlobal.diffusionPerSecond)

//   const poolInfo = parsePoolInfo(raw.poolInfo)

//   const primaryEmissionPerSecondRaw = JSBI.divide(
//     JSBI.multiply(JSBI.BigInt(diffusionPerSecond.toString()), JSBI.BigInt(poolInfo.allocPoint.toString())),
//     JSBI.BigInt(totalAllocation.toString())
//   )

//   return {
//     poolId: raw.poolId,
//     lpTokenAddress: raw.lpTokenAddress,

//     poolInfo: parsePoolInfo(raw.poolInfo),
//     primaryEmissionPerSecondRaw,

//     rewarderAddress: raw.rewarderAddress,
//     // secondaryEmissionPerSecond: raw.secondaryEmissionPerSecond
//     //   ? parseAmount(raw.secondaryEmissionPerSecond)
//     //   : undefined,
//     // secondaryPoolInfo: raw.secondaryPoolInfo ? parsePoolInfo(raw.secondaryPoolInfo) : undefined,
//     // apr: parseJSBI(raw.apr),
//     // pair: raw.pair,
//   }
// }

// interface PoolInfo {
//   accDiffusionPerShare: BigNumber
//   allocPoint: BigNumber
//   lastRewardTime: BigNumber
// }

// interface SerializedPoolInfo {
//   accDiffusionPerShare: SerializedBigNumber
//   allocPoint: SerializedBigNumber
//   lastRewardTime: SerializedBigNumber
// }
// function parsePoolInfo(raw: SerializedPoolInfo): PoolInfo {
//   return {
//     accDiffusionPerShare: parseBigNumber(raw.accDiffusionPerShare),
//     allocPoint: parseBigNumber(raw.allocPoint),
//     lastRewardTime: parseBigNumber(raw.lastRewardTime),
//   }
// }

// function parseJSBI(raw: BigintIsh): JSBI {
//   return JSBI.BigInt(raw)
// }

// interface SerializedBigNumber {
//   type: 'BigNumber'
//   hex: string
// }

// function parseBigNumber(raw: SerializedBigNumber) {
//   return BigNumber.from(raw)
// }

// interface SerializedCurrencyAmount {
//   rawAmount: BigintIsh
//   currency: SerializedCurrency
// }
// interface SerializedCurrency {
//   chainId: number
//   address: string
//   decimals: number
//   symbol?: string
//   name?: string
// }
// function parseAmount(raw: SerializedCurrencyAmount) {
//   const { rawAmount, currency } = raw
//   const token = new Token(currency.chainId, currency.address, currency.decimals, currency.symbol, currency.name)
//   return CurrencyAmount.fromRawAmount(token, rawAmount)
// }

// interface SerializedPair {
//   address: string
//   token0: string
//   token1: string
// }
