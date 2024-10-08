import React, { useRef, useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, BoxProps } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { isEventsMate } from '../utils/orientation';

interface StatBoxProps {
  title: string;
  value: string;
  description: string;
  delay: number;
}

const MotionBox = motion(Box);

const StatBox: React.FC<StatBoxProps> = ({ title, value, description, delay }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay: isVisible ? delay : 0 }}
    >
      <Heading size="lg" mb={2} color={isEventsMate() ? '#7551FF' : 'rgb(225, 55, 132)'}>{value}</Heading>
      <Text fontWeight="bold" mb={1}>{title}</Text>
      <Text fontSize="sm" color="gray.500">{description}</Text>
    </MotionBox>
  );
};

const AboutApp: React.FC<BoxProps> = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <MotionBox
      ref={ref}
      maxWidth="1200px"
      margin="auto"
      p={8}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-around">
        <Box maxW={{ base: '100%', md: '50%' }} mb={{ base: 8, md: 0 }}>
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heading size="2xl" mb={4}>Plánujte svatby snadno s EventsMate</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              EventsMate je vaším spolehlivým partnerem pro organizaci dokonalé svatby. S našimi zkušenostmi a širokou sítí dodavatelů vám pomůžeme vytvořit nezapomenutelný den.
            </Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
            <StatBox
              title="Nových nevěst měsíčně"
              value="300+"
              description="Každý měsíc nám důvěřuje více než 300 nových nevěst s plánováním jejich svatby."
              delay={0.4}
            />
            <StatBox
              title="Aktivních nevěst"
              value="2000"
              description="Aktuálně pomáháme 2000 nevěstám s přípravou jejich vysněného dne."
              delay={0.6}
            />
            <StatBox
              title="Prověřených dodavatelů"
              value="150+"
              description="Spolupracujeme s více než 150 kvalitními dodavateli pro všechny aspekty vaší svatby."
              delay={0.8}
            />
            <StatBox
              title="Let zkušeností"
              value="5+"
              description="Již více než 5 let pomáháme párům uskutečnit jejich svatební sny."
              delay={1}
            />
          </SimpleGrid>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default AboutApp;