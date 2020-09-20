import styled, { keyframes } from 'styled-components'

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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const LoadingSpinner = styled.div`
  border: 16px solid transparent; /* Light grey */
  border-top: 16px solid #fff; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`
