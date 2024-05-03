import { useContext } from 'react'
import { AuthContext } from './authProvider'
import { DataContext } from './dataProvider'

export const useAuth = () => useContext(AuthContext)
export const useData = () => useContext(DataContext)
