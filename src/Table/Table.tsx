import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchTable } from '../redux/ducks/table'

const Table = ({}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTable())
  }, [])

  return (
    <>
      <div>Table</div>
    </>
  )
}

export default Table
