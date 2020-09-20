import React, { useState, ReactElement } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import {
  Container,
  TableWrapper,
  TableHeader,
  TableBody,
  Row,
  Cell,
  ButtonWrapper,
  PaginationButtonsWrapper,
  PaginationButton,
} from './style'
import DeleteCheck from './DeleteCheck'
import Button from '../components/Button'

interface Props {
  tableData: any
  columnTitles: string[]
  renderRow: (rowData: any) => ReactElement
  onDelete: (elementsToBeDeleted: number[]) => void
  onEdit: (elementsToEdit: number[]) => void
  page: number
  onPageChange: (value: 1 | -1) => void
}

const Table = ({
  tableData,
  columnTitles,
  renderRow,
  onDelete,
  onEdit,
  page,
  onPageChange,
}: Props) => {
  const [elementsSelected, setElementsSelected] = useState<number[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleSelectElement = (id: number) => {
    if (elementsSelected.includes(id)) {
      setElementsSelected(elementsSelected.filter(element => element !== id))
      setIsAllSelected(false)
      return
    }

    setElementsSelected([...elementsSelected, id])
  }

  const handleSelectAll = () => {
    if (isAllSelected) {
      setElementsSelected([])
      setIsAllSelected(false)
      return
    }

    setIsAllSelected(true)
    setElementsSelected(tableData.map((data: any) => data.id))
  }

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false)
      setElementsSelected([])
      onEdit([])
      setIsAllSelected(false)
      return
    }

    onEdit(elementsSelected)
    setIsEditing(true)
  }

  return (
    <Container>
      <TableWrapper>
        <TableHeader>
          <tr>
            <th>
              <DeleteCheck
                onCheck={() => handleSelectAll()}
                isChecked={isAllSelected}
              />
            </th>
            {columnTitles.map(title => (
              <th>{title}</th>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {tableData.slice(0 + 10 * page, 10 + 10 * page).map((data: any) => (
            <Row id={data.id}>
              <>
                <Cell>
                  <DeleteCheck
                    onCheck={() => handleSelectElement(data.id)}
                    isChecked={elementsSelected.includes(data.id)}
                  />
                </Cell>
                {renderRow(data)}
              </>
            </Row>
          ))}
        </TableBody>
      </TableWrapper>
      <ButtonWrapper>
        <Button onClick={() => onDelete(elementsSelected)}>Delete</Button>
        <Button onClick={handleEdit} secondary>
          {isEditing ? 'Confirm' : 'Edit'}
        </Button>
        <PaginationButtonsWrapper>
          <PaginationButton onClick={() => onPageChange(-1)}>
            <MdKeyboardArrowLeft size={24} />
          </PaginationButton>
          <span>{page + 1}</span>
          <PaginationButton onClick={() => onPageChange(1)}>
            <MdKeyboardArrowRight size={24} />
          </PaginationButton>
        </PaginationButtonsWrapper>
      </ButtonWrapper>
    </Container>
  )
}

export default Table
