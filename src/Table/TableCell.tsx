import React from 'react'

import { Cell } from '../Table/style'

interface Props {
  type: 'text' | 'label' | 'button' | 'input'
  onClick?: () => void
  onChange?: (value: string) => void
  value?: string
  children: React.ReactChild
}

const TableCell = ({
  type,
  onClick,
  onChange = value => {},
  value,
  children,
}: Props) => {
  const handleRenderCell = () => {
    switch (type) {
      case 'text':
        return <span>{children}</span>

      case 'label':
        return <label>{children}</label>

      case 'button':
        return <button onClick={onClick}>{children}</button>

      case 'input':
        return (
          <input
            onChange={event => onChange(event.target.value)}
            value={value}
          />
        )
    }
  }

  return <Cell>{handleRenderCell()}</Cell>
}

export default TableCell
