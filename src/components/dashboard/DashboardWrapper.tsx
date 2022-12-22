import { Box, Group } from '@mantine/core'
import React from 'react'
import MyHeader from '../MyHeader'
import Wrapper from '../Wrapper'
import Menus from './Menus'

const DashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <MyHeader />
      <Wrapper>
        <Group align='start' noWrap display={{ base: 'block', sm: 'flex' }}>
          <Menus />
          <Box my={22} pos='relative' w='100%'>
            {children}
          </Box>
        </Group>
      </Wrapper>
    </div>
  )
}

export default DashboardWrapper
