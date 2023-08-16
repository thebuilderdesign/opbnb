import { AssetActions } from './assets.constants'
import { AssetAction } from './assets.types'

export const initialState: { [key: string]: { [address: string]: string | undefined | null } } = {
  tokenValues: {},
  liquidityValues: {},
  farmValues: {},
}

const reducer = (state: any, action: AssetAction) => {
  // console.log('action', action)
  // console.log('state', state)

  switch (action.type) {
    case AssetActions.ADD_VALUE: {
      return {
        ...state,
        [action.list]: {
          ...state[action.list],
          ...action.payload,
        },
      }
    }
    default:
      return state
  }
}
export default reducer
