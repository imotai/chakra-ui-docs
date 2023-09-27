import {
  Box,
  Flex,
  HStack,
  HTMLChakraProps,
  Icon,
  IconButton,
  Link,
  chakra,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Image } from '@chakra-ui/react'
import {Logo, LogoIcon } from './logo'
import { MobileNavButton, MobileNavContent } from './mobile-nav'
import { DiscordIcon, GithubIcon } from 'components/icons'

function HeaderContent() {
  const mobileNav = useDisclosure()
  const mobileNavBtnRef = useRef<HTMLButtonElement>()
  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])
  return (
    <>
      <Flex w='100%' h='100%' px='6' align='center' justify='space-between'>
            <Link
              isExternal
              aria-label='home'
              href="/"
            >
           <Flex align='center'>
             <Image src='octogen_logo_text_min.png' />
          </Flex>
          </Link>

        <Flex
          justify='flex-end'
          w='100%'
          align='center'
          color='gray.400'
          maxW='1100px'
        >
          <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
            <Link
              isExternal
              aria-label='GitHub page'
              href="https://github.com/dbpunk-labs/octopus"
            >
              <Icon
                as={GithubIcon}
                display='block'
                transition='color 0.2s'
                w='5'
                h='5'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
            <Link
              isExternal
              aria-label='Discord page'
              href='https://discord.gg/UjSHsjaz66'
            >
              <Icon
                as={DiscordIcon}
                display='block'
                transition='color 0.2s'
                w='5'
                h='5'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
          </HStack>
          <HStack spacing='5'>
          </HStack>
        </Flex>
      </Flex>
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </>
  )
}

function Header(props: HTMLChakraProps<'header'>) {
  const { maxW = '8xl', maxWidth = '8xl' } = props
  const ref = useRef<HTMLHeadingElement>()
  const [y, setY] = useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition='box-shadow 0.2s, background-color 0.2s'
      pos='sticky'
      top='0'
      zIndex='11'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      left='0'
      right='0'
      width='full'
      {...props}
    >
      <chakra.div height='4.5rem' mx='auto' maxW={maxW} maxWidth={maxWidth}>
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  )
}

export default Header
