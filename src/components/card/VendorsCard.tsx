import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import Card from './Card';
import { CustomCardProps } from '../../theme/theme';
import { FC } from 'react';
import FontAwesomeIconWrapper from '../FontAwesomeIconWrapper';

interface VendorsCardProps extends CustomCardProps {
    heading: string;
    priority: number
    children: JSX.Element
}

const VendorsCard: FC<VendorsCardProps> = ({ heading, children, priority }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const crownColor: Map<number, string> = new Map([
    [1, '#11047A'],
    [2, '#CD7F32'],
    [3, '#C0C0C0'],
    [4, '#FFD700'],
]);

  return (
    <Card p="0" overflow="hidden">
      <Flex p="20px 20px 0px 20px" gap="20px" flexDir="column">
        <Flex alignItems='center'>
            <Heading color={textColor} fontSize="lg">
                {heading}
            </Heading>
            {crownColor.get(priority) && <FontAwesomeIconWrapper
                icon='fa-solid fa-crown'
                color={crownColor.get(priority) || 'black'}
                size='20px'
            />}
        </Flex>
        <Flex
          gap="20px"
          h="14rem"
          overflowX="scroll"
          scrollBehavior="smooth"
          pb="20px"
        >
          {children}
        </Flex>
      </Flex>
    </Card>
  );
}

export default VendorsCard;