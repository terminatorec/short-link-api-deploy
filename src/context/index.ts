import React, {createContext} from 'react'

type LoadContextType = {
    isAuth?: any // Not sure what these are, type it appropriately
    setIsAuth?: any
    theme?:any
    setTheme?:any
  }

export const AuthContext = createContext<LoadContextType | null>(null);