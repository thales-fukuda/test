import styled from 'styled-components'

export const VerifiedBadge = styled.div<IVerifiedBadge>`
  color: ${props => (props.verified ? '#000' : '#f40c3a')};
  background-color: ${props => (props.verified ? '#a2f490' : 'transparent')};
  padding: 5px;
  border-radius: 12px;
  cursor: pointer;
`

interface IVerifiedBadge {
  verified?: boolean
}
