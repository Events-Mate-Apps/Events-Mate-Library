import { Box, Heading, Text } from '@chakra-ui/react';
import LandingLayout from '../../components/dashboard/LandingLayout';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

const TermsOfService = () => {
  const { t } = useTranslation()
  return (
    <LandingLayout>
      <Box
        w="container.lg"
        display="flex"
        flexDirection="column"
        mx="auto"
        mt="20"
      >
        <Heading
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          textAlign="center"
          fontSize="5rem"
          as={motion.h1}
        >
          🔒
        </Heading>
        <Box
          as={motion.div}
          textAlign="justify"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Heading textAlign="center" my="5" as="h2">
            {t('privacy:title')}
          </Heading>
          <Box>
            <Box textAlign="center" mb="12">
              <Text as={motion.p} initial={{ scale: 1 }} animate={{ scale: 1.1 }}>
                {t('privacy:intro.commitment')}
              </Text>
              <Text as="p">
                {t('privacy:intro.description')}
              </Text>
              <Text as="p">
                {t('privacy:intro.serviceCost')}
              </Text>
              <Text as="p">
                {t('privacy:intro.coverage')}
              </Text>
              <Text as="p">
                {t('privacy:intro.appReference')}
              </Text>
              <Text as="p">
                <strong>&nbsp;</strong>
              </Text>
            </Box>
            <Text as="p">
              <strong>{t('privacy:personalData.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:personalData.usageDescription')}
            </Text>
            <Text as="p">
              {t('privacy:personalData.registrationInfo')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:personalData.categoriesIntro')}
            </Text>
            <ul>
              <li>{t('privacy:personalData.categories.identifiers')}</li>
            </ul>
            <Text as="p">
              {t('privacy:personalData.identifiersDescription')}
            </Text>
            <ul>
              <li>{t('privacy:personalData.categories.payment')}</li>
            </ul>
            <Text as="p">
              {t('privacy:personalData.paymentDescription')}
            </Text>
            <ul>
              <li>{t('privacy:personalData.categories.submitted')}</li>
            </ul>
            <Text as="p">
              {t('privacy:personalData.submittedDescription')}
            </Text>
            <ul>
              <li>{t('privacy:personalData.categories.planning')}</li>
            </ul>
            <Text as="p">
              {t('privacy:personalData.planningDescription')}
            </Text>
            <Text as="p">
              {t('privacy:personalData.planningExamples')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:personalData.registrationConsent')}
            </Text>
            <Text as="p">
              {t('privacy:personalData.sharingPolicy')}
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>{t('privacy:automaticData.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:automaticData.description')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:automaticData.cookiesIntro')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:automaticData.cookiesDefinition')}
            </Text>
            <Text as="p">{t('privacy:automaticData.cookiesNoData')}</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:automaticData.trackingTools')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:automaticData.cookiesPurpose')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:automaticData.cookiesTypes')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>{t('privacy:cookies.technical.title')}</u>
            </Text>
            <Text as="p">
              {t('privacy:cookies.technical.description')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>{t('privacy:cookies.thirdParty.title')}</u>
            </Text>
            <Text as="p">
              {t('privacy:cookies.thirdParty.analytics')}
            </Text>
            <Text as="p">
              {t('privacy:cookies.thirdParty.permanent')}
            </Text>
            <Text as="p">
              {t('privacy:cookies.thirdParty.analytical')}
            </Text>
            <Text as="p">
              {t('privacy:cookies.thirdParty.profiling')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>{t('privacy:cookies.profiling.title')}</u>
            </Text>
            <Text as="p">
              {t('privacy:cookies.profiling.description')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>{t('privacy:cookies.essential.title')}</u>
            </Text>
            <Text as="p">
              {t('privacy:cookies.essential.description')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:cookies.security.dataCollection')}
            </Text>
            <Text as="p">
              {t('privacy:cookies.security.legitimateInterests')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>{t('privacy:cookies.choices.title')}</u>
            </Text>
            <Text as="p">
              {t('privacy:cookies.choices.instructions')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:cookies.choices.limitations')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:cookies.choices.deactivation')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>{t('privacy:thirdParties.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:thirdParties.usage')}
            </Text>
            <Text as="p">
              {t('privacy:thirdParties.sharingPolicy')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:thirdParties.legalDisclosure')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:thirdParties.knowledgeSharing')}
            </Text>
            <Text as="p">
              {t('privacy:thirdParties.optOut')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>{t('privacy:processingPurpose.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.primary')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.nonPersonal')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:processingPurpose.lawfulUse')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.lawfulGrounds')}
            </Text>
            <ul>
              <li>
                {t('privacy:processingPurpose.grounds.contract')}
              </li>
              <li>
                {t('privacy:processingPurpose.grounds.legitimate')}
              </li>
              <li>
                {t('privacy:processingPurpose.grounds.legal')}
              </li>
              <li>
                {t('privacy:processingPurpose.grounds.consent')}
              </li>
            </ul>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:processingPurpose.businessPurposesIntro')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.account')}
            </Text>
            <Text as="p">{t('privacy:processingPurpose.purposes.purchases')}</Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.activities')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.communication')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.support')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.improvement')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.marketing')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.administration')}
            </Text>
            <Text as="p">
              {t('privacy:processingPurpose.purposes.compliance')}
            </Text>
            <Text as="p">{t('privacy:processingPurpose.purposes.services')}</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:security.measures')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:security.riskAssessment')}
            </Text>
            <Text as="p">
              {t('privacy:security.dataBreach')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>{t('privacy:disclosure.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:disclosure.policy')}
            </Text>
            <ol>
              <li>
                {t('privacy:disclosure.cases.regulations')}
              </li>
              <li>
                {t('privacy:disclosure.cases.requests')}
              </li>
              <li>
                {t('privacy:disclosure.cases.legalAction')}
              </li>
              <li>{t('privacy:disclosure.cases.operation')}</li>
              <li>
                {t('privacy:disclosure.cases.investigation')}
              </li>
              <li>
                {t('privacy:disclosure.cases.fraud')}
              </li>
            </ol>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>{t('privacy:userRights.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:userRights.intro')}
            </Text>
            <Text as="p">
              {t('privacy:userRights.rights.informed')}
            </Text>
            <Text as="p">{t('privacy:userRights.rights.access')}</Text>
            <Text as="p">{t('privacy:userRights.rights.update')}</Text>
            <Text as="p">{t('privacy:userRights.rights.portability')}</Text>
            <Text as="p">
              {t('privacy:userRights.rights.oppose')}
            </Text>
            <Text as="p">
              {t('privacy:userRights.rights.deletion')}
            </Text>
            <Text as="p">
              {t('privacy:userRights.rights.block')}
            </Text>
            <Text as="p">
              {t('privacy:userRights.rights.complaint')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>{t('privacy:riskAcceptance.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:riskAcceptance.content')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>{t('privacy:location.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:location.processing')}
            </Text>
            <Text as="p">{t('privacy:location.country')}</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>{t('privacy:optingOut.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:optingOut.communications')}
            </Text>
            <Text as="p">
              {t('privacy:optingOut.emailLink')}
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              {t('privacy:optingOut.accountCommunications')}
            </Text>
            <Text as="p">
              {t('privacy:optingOut.spamDefinition')}
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>{t('privacy:children.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:children.policy')}
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>{t('privacy:conclusion.title')}</strong>
            </Text>
            <Text as="p">
              {t('privacy:conclusion.acknowledgment')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              {t('privacy:conclusion.modifications')}
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>{t('privacy:lastUpdated')}</strong>
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p" fontFamily="mono" textAlign="center" my="10">
              {t('privacy:contact.questions')}{' '}
              <Text
                as="a"
                fontWeight="bold"
                textDecor="underline"
                href="mailto:info@events-mate.com"
              >
                {t('privacy:contact.email')}
              </Text>
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">&nbsp;</Text>
          </Box>
        </Box>
      </Box>
    </LandingLayout>
  );
}

export default TermsOfService;
