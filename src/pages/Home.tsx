import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Table, { TableCell, Row } from '../Table'
import { RootState } from '../redux/types'
import {
  fetchTable,
  deleteElements,
  updateElement,
  updatePage,
} from '../redux/ducks/table'

const Home = () => {
  const { tableData, page } = useSelector((state: RootState) => state.table)
  const dispatch = useDispatch()
  const [titles] = useState([
    'Storyteller',
    'Daily Capacity',
    'Verification',
    'Tags',
  ])
  const [elementsEditing, setElementsEditing] = useState<number[]>([])

  useEffect(() => {
    dispatch(fetchTable())
  }, [])

  const handleDelete = (elementsToBeDeleted: number[]) => {
    dispatch(deleteElements(elementsToBeDeleted))
  }

  const renderRow = (data: any) => {
    const isEditing = elementsEditing.includes(data.id)
    return (
      <>
        <TableCell
          type={isEditing ? 'input' : 'text'}
          onChange={value => dispatch(updateElement({ id: data.id, value }))}
          value={data.info.userName}
        >
          {isEditing ? null : data.info.userName}
        </TableCell>
        <TableCell type='text'>
          <>{data.info.capacity} stories/day</>
        </TableCell>
        <TableCell type='button'>
          {data.info.verification ? 'Verified' : 'Not Verified'}
        </TableCell>
        <TableCell type='text'>{data.info.tags}</TableCell>
      </>
    )
  }

  return (
    <Table
      tableData={tableData}
      columnTitles={titles}
      renderRow={renderRow}
      onDelete={handleDelete}
      onEdit={setElementsEditing}
      page={page}
      onPageChange={value => dispatch(updatePage(value))}
    />
  )
}

export default Home
