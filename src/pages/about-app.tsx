import React, { useRef, useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, BoxProps } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { isEventsMate } from '../utils/orientation';
import useTranslation from 'next-translate/useTranslation';

interface StatBoxProps {
  titleKey: string;
  valueKey: string;
  descriptionKey: string;
  delay: number;
}

const MotionBox = motion(Box);

const StatBox: React.FC<StatBoxProps> = ({ titleKey, valueKey, descriptionKey, delay }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

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
      <Heading size="lg" mb={2} color={isEventsMate() ? '#7551FF' : 'rgb(225, 55, 132)'}>
        {t(valueKey)}
      </Heading>
      <Text fontWeight="bold" mb={1}>{t(titleKey)}</Text>
      <Text fontSize="sm" color="gray.500">{t(descriptionKey)}</Text>
    </MotionBox>
  );
};

const AboutApp: React.FC<BoxProps> = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const { t } = useTranslation();

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
            <Heading size="2xl" mb={4}>{t('auth:about.title')}</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              {t('auth:about.subtitle')}
            </Text>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
            <StatBox
              titleKey="auth:about.stats.newBrides.title"
              valueKey="auth:about.stats.newBrides.value"
              descriptionKey="auth:about.stats.newBrides.description"
              delay={0.4}
            />
            <StatBox
              titleKey="auth:about.stats.activeBrides.title"
              valueKey="auth:about.stats.activeBrides.value"
              descriptionKey="auth:about.stats.activeBrides.description"
              delay={0.6}
            />
            <StatBox
              titleKey="auth:about.stats.verifiedVendors.title"
              valueKey="auth:about.stats.verifiedVendors.value"
              descriptionKey="auth:about.stats.verifiedVendors.description"
              delay={0.8}
            />
            <StatBox
              titleKey="auth:about.stats.yearsExperience.title"
              valueKey="auth:about.stats.yearsExperience.value"
              descriptionKey="auth:about.stats.yearsExperience.description"
              delay={1}
            />
          </SimpleGrid>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default AboutApp;