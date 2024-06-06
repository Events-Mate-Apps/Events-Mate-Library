import { Flex, FormControl, SimpleGrid, Text, useColorModeValue, Input, Textarea, FormLabel, Box } from '@chakra-ui/react';
import Card from '../../card/Card';

export default function Information(props: { [x: string]: any }) {
	const { ...rest } = props;
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'secondaryGray.600';
	return (
		<FormControl>
			<Card mb='20px' {...rest}>
				<Flex direction='column' mb='30px' ms='10px'>
					<Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
						Account Settings
					</Text>
					<Text fontSize='md' color={textColorSecondary}>
						Here you can change user account information
					</Text>
				</Flex>
				<SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
					<Box mb='0px' me='30px'>
						<FormLabel htmlFor='username'>Username</FormLabel>
						<Input id='username' placeholder='@simmmple.web' />
					</Box>
					<Box mb='0px'>
						<FormLabel htmlFor='email'>Email Address</FormLabel>
						<Input id='email' placeholder='mail@simmmple.com' />
					</Box>
					<Box mb='20px' me='30px'>
						<FormLabel htmlFor='first_name'>First Name</FormLabel>
						<Input id='first_name' placeholder='John' />
					</Box>
					<Box mb='20px'>
						<FormLabel htmlFor='last_name'>Last Name</FormLabel>
						<Input id='last_name' placeholder='William' />
					</Box>
				</SimpleGrid>
				<Box mb='20px'>
					<FormLabel htmlFor='job'>Job</FormLabel>
					<Input id='job' placeholder='Web Developer' />
				</Box>
				<Box>
					<FormLabel htmlFor='about'>About Me</FormLabel>
					<Textarea id='about' h='100px' placeholder='Tell something about yourself in 150 characters!' />
				</Box>
			</Card>
		</FormControl>
	);
}
