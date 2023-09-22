import {
  Box,
  BoxProps,
  Button,
  Center,
  Circle,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  LightMode,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
  chakra,
} from '@chakra-ui/react'
import { chunk } from '@chakra-ui/utils'
import users from 'chakra-users'
import { Image } from '@chakra-ui/react'
import ChakraNextImage from 'components/chakra-next-image'
import { ChakraProAd } from 'components/chakra-pro/home-page-ad'
import Container from 'components/container'
import { DiscordStrip } from 'components/discord-strip'
import { Footer } from 'components/footer'
import Header from 'components/header'
import SandpackEmbed from 'components/sandpack-embed'
import SEO from 'components/seo'
import TweetCard from 'components/tweet-card'
import { App, Index } from 'configs/sandpack-contents/homepage/files'
import tweets from 'configs/tweets.json'
import NextLink from 'next/link'
import * as React from 'react'
import { AiFillThunderbolt } from 'react-icons/ai'
import { DiGithubBadge } from 'react-icons/di'
import { FaArrowRight, FaDiscord, FaMicrophone } from 'react-icons/fa'
import { FiDownload, FiGithub, FiUsers } from 'react-icons/fi'
import { IoMdMoon } from 'react-icons/io'
import { MdAccessibility, MdGrain, MdPalette } from 'react-icons/md'
import type { Member, Sponsor } from 'src/types/github'
import { getAllContributors } from 'utils/get-all-contributors'
import { getAllMembers } from 'utils/get-all-members'
import { getAllSponsors } from 'utils/get-all-sponsors'
import { getDiscordMembers } from 'utils/get-discord-members'
import { getGithubStars } from 'utils/get-github-stars'
import { getNpmDownloads } from 'utils/get-npm-downloads'
import { t } from 'utils/i18n'


const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box
      bg='white'
      rounded='12px'
      shadow='base'
      p='40px'
      _dark={{ bg: 'gray.700' }}
      {...props}
    >
      <Flex
        rounded='full'
        w='12'
        h='12'
        bg='teal.500'
        align='center'
        justify='center'
      >
        <Icon fontSize='24px' color='white' as={icon} />
      </Flex>
      <Heading as='h3' size='md' fontWeight='semibold' mt='1em' mb='0.5em'>
        {title}
      </Heading>
      <Text fontSize='lg' opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

interface Tweet {
  content: string
  handle: string
  name: string
  date: string
  image: string
  url: string
}

interface StatBoxProps extends BoxProps {
  icon?: React.ElementType
  title: string
  description: string
}

const StatBox = (props: StatBoxProps) => {
  const { icon: StatIcon, title, description, ...rest } = props
  return (
    <Flex
      direction='column'
      align={{ base: 'center', md: 'flex-start' }}
      pl={{ base: '0', md: '8' }}
      borderLeft='2px solid'
      borderLeftColor='yellow.200'
      {...rest}
    >
      <Box fontSize={{ base: '4rem', md: '6rem' }} lineHeight='1em' mb='20px'>
        {title}
      </Box>
      <Stack isInline align='center'>
        <StatIcon size='24px' />
        <Text>{description}</Text>
      </Stack>
    </Flex>
  )
}

interface HomePageProps {
  members: Member[]
  githubStars: string
  npmDownloads: string
  discordMembers: string
  sponsors: {
    companies: Sponsor[]
    individuals: Sponsor[]
  }
}

const HomePage = ({
  members,
  sponsors,
  githubStars,
  npmDownloads,
  discordMembers,
}: HomePageProps) => {
  return (
    <>
      <SEO
        title={t('homepage.seo.title')}
        description={t('homepage.seo.description')}
      />
      <Header />
      <Box mb={10}>
        <Box as='section' pt='3rem' pb={{ base: '0', md: '0rem' }}>
          <Container>
            <Box textAlign='center'>
              <chakra.h1
                maxW='36ch'
                mx='auto'
                fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
                fontFamily='heading'
                letterSpacing='tighter'
                fontWeight='extrabold'
                mb='16px'
                lineHeight='1.2'
              >
                {t('homepage.title.main')}
                <Box as='span' color='teal.500' _dark={{ color: 'teal.300' }}>
                  {' '}
                  {t('homepage.title.highlighted')}
                </Box>
              </chakra.h1>

              <Text
                maxW='560px'
                mx='auto'
                color='gray.500'
                _dark={{ color: 'gray.400' }}
                fontSize={{ base: 'lg', lg: 'xl' }}
                mt='6'
              >
                {t('homepage.message')}
              </Text>

              <Stack
                mt='10'
                spacing='4'
                justify='center'
                direction={{ base: 'column', sm: 'row' }}
              >
              <Button
                h='4rem'
                px='40px'
                fontSize='1.2rem'
                as='a'
                size='lg'
                href='https://github.com/dbpunk-labs/octopus#getting-started'
                colorScheme='teal'
                target='__blank'
                rightIcon={<FaArrowRight fontSize='0.8em' />}>
                 Get Started
              </Button>
              </Stack>
            </Box>
            </Container>
        </Box>

        <Box as='section'>
          <Container py='80px'>
            <Flex direction='column' align='center' maxW='1200px' mx='auto'>
                <Image src='octopus_demo_dark.png' alt='Dan Abramov' />
            </Flex>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const [
    { prettyCount: githubStars },
    { prettyCount: npmDownloads },
    { prettyCount: discordMembers },
  ] = await Promise.all([
    getGithubStars(),
    getNpmDownloads(),
    getDiscordMembers(),
  ])

  const contributors = getAllContributors()
  const members = getAllMembers()
  const sponsors = getAllSponsors()

  return {
    props: {
      githubStars,
      members,
      contributors,
      sponsors,
      discordMembers,
      npmDownloads,
    },
  }
}

export default HomePage
