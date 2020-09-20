import styled from 'styled-components'

export default styled.button<IButton>`
  width: 120px;
  height: 40px;
  border: ${props => (props.secondary ? 'none' : '2px solid #f4a130')};
  border-radius: 4px;
  cursor: pointer;
  color: #f4a130;
  font-weight: bold;
`

interface IButton {
  secondary?: boolean
}
