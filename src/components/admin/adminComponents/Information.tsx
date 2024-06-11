import { FC } from 'react';
import { Flex, FormControl, SimpleGrid, Text, useColorModeValue, Input, FormLabel, Box, Button } from '@chakra-ui/react';
import Card from '../../card/Card';
import useTranslation from 'next-translate/useTranslation';

interface InformationProps {
  [key: string]: any;
}

const Information: FC<InformationProps> = (props) => {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  const { t } = useTranslation()
  
  return (
    <FormControl>
      <Card mb="20px" {...rest}>
        <Flex 
          direction="column" 
          mb="30px"
          ms="10px"
        >
          <Text 
            fontSize="xl" 
            color={textColorPrimary} 
            fontWeight="bold"
          >
            {t('user:settings.accountSettings')}
          </Text>
          <Text 
            fontSize="md" 
            color={textColorSecondary}
          >
            {t('user:settings.changeInformation')}
          </Text>
        </Flex>
        <SimpleGrid 
          columns={{ sm: 1, md: 2 }} 
          spacing={{ base: '20px', xl: '20px' }}
        >
          <Box  
            mb="0px"   
            me="30px" 
          >
            <FormLabel 
              htmlFor="username"
            >
              {t('common:username')}
            </FormLabel>
            <Input 
              id="username" 
              placeholder="@simmmple.web" 
            />
          </Box>
          <Box>
            <FormLabel htmlFor="email">{t('common:emailAddress')}</FormLabel>
            <Input id="email" placeholder="mail@simmmple.com" />
          </Box>
          <Box mb="20px" me="30px">
            <FormLabel htmlFor="first_name">{t('guests:form.firstName')}</FormLabel>
            <Input id="first_name" placeholder={t('guests:form.firstName')}/>
          </Box>
          <Box mb="20px">
            <FormLabel htmlFor="last_name">{t('guests:form.lastName')}</FormLabel>
            <Input id="last_name" placeholder={t('guests:form.lastName')}/>
          </Box>
        </SimpleGrid>
        <Button
        >
          {t('edit:saveChanges')}
        </Button>
      </Card>
    </FormControl>
  );
};

export default Information;
