import React from 'react'
import { trpc } from '@/utils/trpc'
import Wrapper from '@/components/Wrapper'
import BigCard from '@/components/BigCard'
import Skeleton from '@/components/BigCard/Skeleton'
import { Carousel } from '@mantine/carousel'
import { Grid, Space } from '@mantine/core'
import CoverBlog from './CoverBlog'
import GridRight from './GridRight'
import Banner from './Banner'
import MyTitle from '../MyTitle'

const Hero = () => {
  const { data, isLoading } = trpc.blogs.filterBlogs.useQuery({
    sort: 'popular',
  })

  return (
    <Wrapper props={{ my: 70 }}>
      <Banner />
      <Space mt={30} />
      <MyTitle title='Popular blogs' />
      <Carousel
        slideGap='lg'
        slideSize={270}
        align='start'
        slidesToScroll={2}
        containScroll='trimSnaps'
      >
        {isLoading
          ? [...Array(5)].map((_, i) => (
              <Carousel.Slide key={i} size={270} my={30}>
                <Skeleton />
              </Carousel.Slide>
            ))
          : data?.map((blog) => (
              <Carousel.Slide key={blog.id} size={270} my={30}>
                <BigCard {...blog} />
              </Carousel.Slide>
            ))}
      </Carousel>
      <Grid gutter={30}>
        <Grid.Col sm={6}>
          <MyTitle title="Today's blog" props={{ mb: 30 }} />
          <CoverBlog />
        </Grid.Col>
        <Grid.Col sm={6}>
          <MyTitle title='More from today' props={{ mb: 30 }} />
          <GridRight />
        </Grid.Col>
      </Grid>
    </Wrapper>
  )
}

export default Hero
