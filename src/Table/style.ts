import styled from 'styled-components'

export const Container = styled.div`
  width: 55%;
  height: 50%;
  background-color: #fff;
  box-shadow: 8px 6px 5px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 20px 30px;
  font-family: 'Roboto', sans-serif;
`

export const TableWrapper = styled.table`
  width: 100%;
  height: 85%;
`

export const TableHeader = styled.thead`
  tr {
    th {
      text-align: left;
    }
  }
  border-bottom: 1px solid #000;
`

export const TableBody = styled.tbody``

export const Row = styled.tr``

export const Cell = styled.td`
  span {
    font-size: 14px;
  }
  input {
    height: 100%;
    padding: 0 10px;
  }
`

export const Check = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const ButtonWrapper = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
`

export const PaginationButtonsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    color: #000;
    margin: 20px;
  }
`

export const PaginationButton = styled.button`
  background-color: #f4a130;
  color: #fff;
  border-radius: 4px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
`
