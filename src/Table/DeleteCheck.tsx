import React from 'react'
import { Check } from './style'

interface Props {
  isChecked: boolean
  onCheck: () => void
}

const DeleteCheck = ({ isChecked, onCheck }: Props) => {
  return <Check type='checkbox' onChange={onCheck} checked={isChecked} />
}

export default DeleteCheck
