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
  Input,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
    Alert,
  AlertIcon,
  AlertTitle,
  useToast,
} from '@chakra-ui/react'

import {  LinkOverlay } from '@chakra-ui/react'
import { BsFillHeartFill, BsWindows} from 'react-icons/bs'
import { GrUbuntu} from 'react-icons/gr'
import { ImAppleinc} from 'react-icons/im'
import { useAsyncFn } from 'react-use'
import { useDisclosure } from '@chakra-ui/react'
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
import { AiFillThunderbolt, AiFillBug } from 'react-icons/ai'
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
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })


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
    const toast = useToast()


    const [playing, setPlaying] = React.useState(false)
	const [openVideo, setOpenVideo] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
	function play() {
		setPlaying(true)
		setOpenVideo(true)
	}
    const [userEmail, setUserEmail] = React.useState("")
    const [userPreferModel, setUserPreferModel] = React.useState("GPT4")
    const [userPreferAgent, setUserPreferAgentType] = React.useState("A1")
    const [submitRet, submitTral] = useAsyncFn(async () => {
        const response = await fetch("https://user.octogen.dev/waitlist/join",
            {

                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email:userEmail, model: userPreferModel, agent: userPreferAgent})
            }
        )
        const content = await response.json()
        if (content.code == 0) {
            toast({
                  title: 'Request trial key',
                  description: "You has requested the trial key successfully",
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
            })
            onClose()
        }else {
           toast({
                  title: 'Request trial key',
                  description: content.msg,
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
            })
           onClose()
        }
     },[userPreferModel, userPreferAgent, userEmail])
  return (
    <>
      <SEO
        title={t('homepage.seo.title')}
        description={t('homepage.seo.description')}
      />
      <Header />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='xl'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
          Request the agent service trial key
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>Email</FormLabel>
                <Input
                  id='email'
                  placeholder='Please enter your mail'
                  value={userEmail}
                  onChange={(e)=> {setUserEmail(e.target.value)}}
                />
              </Box>

              <Box>
                <FormLabel htmlFor='url'>Your Prefered Model</FormLabel>
                    <Select id='model' value={userPreferModel} onChange={(e)=> {setUserPreferModel(e.target.value)}}>
                          <option value='GPT4'>GPT4</option>
                          <option value='CodeLlama'>CodeLlama</option>
                    </Select>
                </Box>
              <Box>
                <FormLabel htmlFor='owner'>Your Prefered Agent Type</FormLabel>
                <Select id='agent' value={userPreferAgent} onChange={(e) => {setUserPreferAgentType(e.target.value)}}>
                  <option value='A1'>1 CPU 1GB</option>
                  <option value='A2'>2 CPU 2GB</option>
                  <option value='A3'>2 CPU 4GB + GPU</option>
                </Select>
              </Box>

            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={(e)=> { 
                submitTral()
            }}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
                <Box as='span' color='teal.500' _dark={{ color: '#0750c1' }}>
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
                colorScheme='blue'
                href='https://docs.octogen.dev/getstarted.html'
                >
                Getting Started
              </Button>
               <Button
                  as='a'
                  size='lg'
                  h='4rem'
                  px='40px'
                  fontSize='1.2rem'
                  onClick={onOpen}
                >
                Get Agent Service Trial key
                </Button>
              </Stack>
            </Box>
            <Center>
              <Box
                display='inline-block'
                mt='10px'
                px='6'
                py='4'
              >
                <Icon as={BsWindows} boxSize={8} mr="5px" color="#0750c1"/>
                <Icon as={GrUbuntu} boxSize={8} mr="5px" color="#0750c1"/>
                <Icon as={ImAppleinc} boxSize={8} mr="5px" color="#0750c1"/>
              </Box>
            </Center>
            </Container>
        </Box>

        <Box as='section'  display={{base:!openVideo ? 'block' : 'none'}}>
          <Container py='20px' >
            <Flex direction='column' align='center' maxW='1200px' mx='auto'>
              <Image src='octopus_demo_dark.png' onClick={play}/>
            </Flex>
          </Container>
        </Box>
        <Box as='section' display={{base:openVideo ? 'block' : 'none'}}>
          <Container py='80px'>
            <Flex direction='column' align='center' maxW='1200px' mx='auto'>
              <ReactPlayer
                width="100%"
                height="640px"
				playing={playing}
				url='https://www.youtube.com/watch?v=CXn9trD6awc&t=1s'/>
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
