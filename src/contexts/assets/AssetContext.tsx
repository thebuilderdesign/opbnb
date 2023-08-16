import React, { createContext, useMemo, useReducer } from 'react'
import reducer, { initialState } from './assets.reducer'

export const AssetContext = createContext<{ state?: any; dispatch?: any }>({})

export const AssetContextConsumer = AssetContext.Consumer
export const AssetContextProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <AssetContext.Provider value={contextValue}>{children}</AssetContext.Provider>
}

export default AssetContextProvider
