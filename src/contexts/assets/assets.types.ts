import { AssetActions } from './assets.constants'

export type AssetAction = {
  payload: any
  type: AssetActions
  list: string
}
