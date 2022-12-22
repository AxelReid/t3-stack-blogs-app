import { Container, ContainerProps } from '@mantine/core'
import React from 'react'

interface Props {
  children: React.ReactNode
  props?: ContainerProps
}

const Wrapper: React.FC<Props> = ({ children, props }) => {
  return (
    <Container size={1500} {...props}>
      {children}
    </Container>
  )
}

export default Wrapper
