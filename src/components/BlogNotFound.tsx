import { Button, Center, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

function BlogNotFound() {
  return (
    <div>
      <Text
        weight={800}
        fz={{ base: '35vw', lg: 450 }}
        lh={1.2}
        opacity={0.05}
        align='center'
      >
        404
      </Text>
      <Text fz='xl' align='center' fw={600}>
        The blog is not exist!
      </Text>

      <Center>
        <Link href='/' passHref>
          <Button component='a' my='md' size='lg' variant='gradient'>
            Go to home page
          </Button>
        </Link>
      </Center>
    </div>
  )
}

export default BlogNotFound
