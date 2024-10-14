import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, VStack, Image, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import useTranslation from 'next-translate/useTranslation';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, description, imageUrl }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('navy.900', 'white');
  const roleColor = useColorModeValue('blue.600', 'blue.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('gray.600', 'gray.400');


  return (
    <Box bg={bgColor} boxShadow="md" borderRadius="lg" p={6}>
      <VStack spacing={4}>
        <Image src={imageUrl} alt={name} borderRadius="full" boxSize="100px" />
        <VStack spacing={1}>
          <Heading as="h3" size="md" color={headingColor}>
            {name}
          </Heading>
          <Text fontWeight="medium" color={roleColor} fontSize="sm">
            {role}
          </Text>
        </VStack>
        <Text fontSize="sm" color={textColor} textAlign="center">
          {description}
        </Text>
        <Flex>
          <Icon as={FaLinkedin} w={5} h={5} color={iconColor} mr={2} cursor="pointer" />
          <Icon as={FaTwitter} w={5} h={5} color={iconColor} cursor="pointer" />
        </Flex>
      </VStack>
    </Box>
  );
};

const TeamPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.100', 'navy.900');
  const headingColor = useColorModeValue('navy.900', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  const { t } = useTranslation()

  const teamMembers: TeamMemberProps[] = [
    {
      name: 'Robin & Naty',
      role: t('auth:robin.role'),
      description: t('auth:robin.desc'),
      imageUrl: '/img/about/robin.webp'
    },
    {
      name: 'Šimon',
      role: t('auth:simon.role'),
      description: t('auth:simon.desc'),
      imageUrl: '/img/about/buchta.webp'
    },
    {
      name: 'Smejcova',
      role: t('auth:smejcova.role'),
      description: t('auth:smejcova.desc'),
      imageUrl: '/img/about/smejcova.webp'
    },
    {
      name: 'Valenta',
      role: t('auth:valenta.role'),
      description: t('auth:valenta.desc'),
      imageUrl: '/img/about/valenta.webp'
    },
    {
      name: 'Jan Wawrzyk',
      role: t('auth:wawrzyk.role'),
      description: t('auth:wawrzyk.desc'),
      imageUrl: '/img/about/wawrzyk.webp' 
    },
    {
      name: 'Jan Swiatnowski',
      role: t('auth:swiatnowski.role'),
      description: t('auth:swiatnowski.desc'),
      imageUrl: '/img/about/swiatnowski.webp' 
    },
    {
      name: 'Markét',
      role: t('auth:market.role'),
      description: t('auth:market.desc'),
      imageUrl: '/img/about/pryckova.webp' 
    }
  ];
  
  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="7xl">
        <VStack spacing={12}>
          <Box textAlign="center">
            <Heading as="h2" size="2xl" color={headingColor} mb={2}>
              {t('auth:aboutus.title')}
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="2xl" mx="auto">
              {t('auth:aboutus.subtitle')}
            </Text>
          </Box>
          <SimpleGrid 
            columns={[1, null, 2, 3]} 
            spacing={8} 
            w="full"
            sx={{
              '& > *:last-child:nth-child(odd)': {
                gridColumn: {
                  base: 'auto',
                  md: '2 / 2',
                  lg: '2 / 3'
                }
              }
            }}
          >
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default TeamPage;