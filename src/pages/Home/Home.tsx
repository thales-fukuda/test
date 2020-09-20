import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Table, { TableCell } from '../../Table'
import { RootState } from '../../redux/types'
import {
  fetchTable,
  deleteElements,
  updateElement,
  updatePage,
  updateVerification,
} from '../../redux/ducks/table'

import { VerifiedBadge, LoadingSpinner } from './style'

const Home = () => {
  const { isLoading, tableData, page } = useSelector(
    (state: RootState) => state.table
  )
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
  }, [dispatch])

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
          {data.info.verification ? (
            <VerifiedBadge verified>Verified</VerifiedBadge>
          ) : (
            <VerifiedBadge
              onClick={() =>
                dispatch(
                  updateVerification({ id: data.id, verification: true })
                )
              }
            >
              Verify
            </VerifiedBadge>
          )}
        </TableCell>
        <TableCell type='text'>{data.info.tags}</TableCell>
      </>
    )
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table
          tableData={tableData}
          columnTitles={titles}
          renderRow={renderRow}
          onDelete={handleDelete}
          onEdit={setElementsEditing}
          page={page}
          onPageChange={value => dispatch(updatePage(value))}
        />
      )}
    </>
  )
}

export default Home
