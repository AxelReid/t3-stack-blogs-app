import React from 'react'
import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormTypes } from '../types/user'
import ThemeSwitcher from './MyHeader/ThemeSwitcher'

interface Props {
  type?: 'sign-in' | 'register'
}
const LoginForm = ({ type = 'sign-in' }: Props) => {
  const router = useRouter()
  const { colorScheme } = useMantineColorScheme()
  const isRegister = type === 'register'

  if (router.query?.error === 'CredentialsSignin') {
  }

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: {
      name: (val) => (!val && isRegister ? 'Enter a name' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      confirm_password: (val, values) =>
        isRegister && val !== values.password ? "Passwords don't match" : null,
    },
  })

  const submit = async (vals: FormTypes) => {
    if (isRegister) await register(vals)
    else login(vals)
  }

  const register = async (body: FormTypes) => {
    try {
      const res = await axios.post('/api/register', body)
      console.log(res)

      if (res.status === 200) {
        await login({ email: body.email, password: body.password })
        showNotification({
          color: 'green',
          message: 'New user successfully created',
        })
        return
      }
      router.push({ pathname: '/sign-in', query: router.query })
      showNotification({ color: 'yellow', message: 'Login to your account' })
    } catch (error: any) {
      const err = error?.response?.data.error
      const emailTakenErr = err?.meta?.target?.includes('email')
      if (emailTakenErr)
        form.setErrors({ email: 'Email is already registered' })
      else
        showNotification({
          color: 'red',
          message: "Could'nt register. Try again",
        })
    }
  }

  const login = async (body: { email: string; password: string }) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: body.email,
        password: body.password,
      })

      if (!res?.ok) {
        showNotification({
          color: 'red',
          message: 'Credentials are incorrect!',
        })
      } else {
        const callbackUrl = router.query?.callbackUrl?.toString() || '/'
        router.push(callbackUrl)
      }
    } catch (error: any) {
      console.log(error?.response)
    }
  }

  return (
    <Box sx={{ width: 370 }}>
      <Stack>
        <Group mb='md' position='apart' align='center'>
          <Title tt='capitalize'>{type}</Title>
          <ThemeSwitcher />
        </Group>
        <form onSubmit={form.onSubmit(submit)}>
          <Stack>
            {isRegister && (
              <TextInput
                label='Name'
                placeholder='Enter name'
                {...form.getInputProps('name')}
              />
            )}
            <TextInput
              label='Email'
              placeholder='Enter email'
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label='Password'
              placeholder='Enter password'
              {...form.getInputProps('password')}
            />
            {isRegister && (
              <PasswordInput
                label='Confirm Password'
                placeholder='Confirm password'
                {...form.getInputProps('confirm_password')}
              />
            )}
            <Button type='submit' size='md' mt='sm'>
              Submit
            </Button>
          </Stack>
        </form>

        <Group p={0} position='center' mt='xs'>
          <Badge
            onClick={() =>
              signIn('google', {
                callbackUrl:
                  (router.query as { callbackUrl: string | undefined })
                    ?.callbackUrl || '/',
              })
            }
            styles={(theme) => ({
              root: {
                cursor: 'pointer',
                '&:hover': {
                  borderColor: theme.colors.gray[6],
                },
              },
            })}
            variant='outline'
            color={colorScheme === 'dark' ? 'gray.8' : 'gray.2'}
            sx={{ borderWidth: 2 }}
            size='lg'
            py={19}
            px={5}
            pr='lg'
            leftSection={<Avatar src='/images/google.png' size={28} mr={10} />}
          >
            <Text
              c={colorScheme === 'dark' ? 'white' : 'black'}
              fz='sm'
              tt='initial'
              fw={600}
            >
              Continue with Google Account
            </Text>
          </Badge>
        </Group>
        <Link
          href={{
            pathname: isRegister ? '/sign-in' : '/register',
            query: router.query,
          }}
          passHref
        >
          <Anchor component='a' align='center' size='sm'>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
          </Anchor>
        </Link>
      </Stack>
    </Box>
  )
}

export default LoginForm
