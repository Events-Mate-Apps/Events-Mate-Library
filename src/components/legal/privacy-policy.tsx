import { Box, Heading, Text } from '@chakra-ui/react';
import LandingLayout from '../../components/dashboard/LandingLayout';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
          as={motion.h1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          textAlign="center"
          fontSize="5rem"
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
                        PRIVACY POLICY
          </Heading>
          <Box>
            <Box textAlign="center" mb="12">
              <Text as={motion.p} initial={{ scale: 1 }} animate={{ scale: 1.1 }}>
                                We are committed to the protection of your privacy while you use
                                our application.
              </Text>
              <Text as="p">
                                This Privacy Policy describes how we collect and use the Personal
                                Data that we receive about you, as well as your rights concerning
                                Personal Data when you use our app ‘<strong>WeddMate</strong>’ or
                                purchase our Goods or Services.
              </Text>
              <Text as="p">
                                This SERVICE is provided at no cost and is intended for use as is.
              </Text>
              <Text as="p">
                                This Privacy Policy does not cover any information that we may
                                receive about you through sources other than the use of our
                                application ‘WeddMate’.
              </Text>
              <Text as="p">
                                Hereinafter the application ‘WeddMate’ will also be referred to as
                                ‘App’ or ‘Application’.
              </Text>
              <Text as="p">
                <strong>&nbsp;</strong>
              </Text>
            </Box>
            <Text as="p">
              <strong>Personal Data We Receive from You</strong>
            </Text>
            <Text as="p">
                            Depending on how you use our App, you will be subject to different
                            types of Personal Data collected and different manners of
                            collection.
            </Text>
            <Text as="p">
                            During the process of your registration, we will collect some of the
                            following Personal Data from you through your voluntary disclosure.
                            These data refer to your name, email address or other details to
                            help us provide you with a better experience possible.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            The following list describes the categories of information about you
                            that we collect:
            </Text>
            <ul>
              <li>Personal Identifiers</li>
            </ul>
            <Text as="p">
                            If you register and you create an account in the App to obtain our
                            products or services, we may collect your name, email address, and
                            phone number along with other information you may choose to submit.
                            &nbsp;
            </Text>
            <ul>
              <li>Payment Information</li>
            </ul>
            <Text as="p">
                            If you make a purchase through our Website or Apps or redeem cash
                            registry funds, we may collect your telephone number, postal
                            address, email address, payment type, bank account number, credit or
                            debit card number, verification number, and expiration date. Your
                            bank account number and credit and debit card numbers are managed by
                            our payment processor partners; we do not handle or store this data.
            </Text>
            <ul>
              <li>Information you Submit or Post</li>
            </ul>
            <Text as="p">
                            We will collect the information you submit to us about yourself and
                            others, including but not limited to any information submitted to us
                            through ratings and reviews, our chat feature, our wedding planning
                            tools, or through other uses of our Services. Please be aware that
                            any information, including images, that you post to a public-facing
                            portion of our Website (e.g. your wedding registry or wedding
                            website) is publicly available unless you password protect it, and
                            then it is accessible by anyone using the correct password. By
                            providing information to us, you agree to our collection and use as
                            described in this Privacy Policy.
            </Text>
            <ul>
              <li>Planning Tools</li>
            </ul>
            <Text as="p">
                            If you use our wedding planning services and other wedding planning
                            tools, we will collect all information regarding yourself and others
                            that you add to your weddings, such as the name of your fiancé(e)
                            and your wedding date; this includes all information that you add
                            onto your wedding.
            </Text>
            <Text as="p">
                            For example, we may collect, but not limited to, &nbsp;your budget
                            information, guest count, wedding date and location, information
                            about your preferences and characteristics, photos you save or
                            favorite as inspiration, information about Vendors that you have
                            selected, information about Vendors you&apos;ve inquired about
                            and/or received responses from, preferences about Vendors, your
                            criteria for potential Vendors, and other information that you
                            choose to submit about yourself in connection with the wedding.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            By undergoing the registration process, you consent to us collecting
                            your Personal Data, including the Personal Data described in this
                            clause, as well as storing, using, or disclosing your Personal Data
                            following this Privacy Policy operating in European countries
                            according to GDPR UE 2016/679.
            </Text>
            <Text as="p">
                            However, we only share your Personal Data with a trusted related
                            entity if that entity agrees to Our privacy standards as set out in
                            this Privacy Policy and to treat your Personal Data in the same
                            manner that we do.
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>Personal Data We Receive Automatically</strong>
            </Text>
            <Text as="p">
                            We may collect information from you through automatic tracking
                            systems (such as information about your preferences) as well as
                            through information that you volunteer to us (such as information
                            that you provide during a registration process or at other times
                            while using the App, as described above).
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            For example, we use cookies to make your experience easier and more
                            intuitive: cookies are small strings of text used to store some
                            information that may concern the user, his or her preferences or the
                            device they are using to access the internet (such as a computer,
                            tablet, or mobile phone).
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            A cookie consists of a reduced set of data transferred to your
                            browser from a web server and it can only be read by the server that
                            made the transfer. This is not an executable code and does not
                            transmit viruses.
            </Text>
            <Text as="p">Cookies do not record or store any Personal Data.</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            We use a variety of online tracking and analytics tools (e.g.,
                            cookies, flash cookies, pixel tags, and HTML5) to collect and
                            analyze the information as you use the Services. Among other things,
                            these technologies allow us to offer you a more tailored experience
                            in the future, by understanding and remembering your particular
                            browsing and usage preferences.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            We use cookies for the following purposes: to enable certain
                            functions of the Service, to provide analytics, to store your
                            preferences, to enable advertisement delivery, including behavioral
                            advertising.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            We use both session and persistent cookies on the Service and we use
                            different types of cookies to run the Service:
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>Technical cookies</u>
            </Text>
            <Text as="p">
                            Technical cookies are used for navigation and to facilitate your
                            access to and use of the App. Cookies may also be retransmitted by
                            an analytics or statistics provider to collect aggregated
                            information on the number of users and how they visit the Website.
                            These are also considered technical cookies when they operate as
                            described.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>Third-party cookies</u>
            </Text>
            <Text as="p">
                            We may also use third-party web analytics services (such as those of
                            Google Analytics, Coremetrics, Mixpanel, and Segment) on our
                            Services to collect and analyze information collected through these
                            technologies to assist us in auditing, research, or reporting; fraud
                            prevention; and provide certain features to you.
            </Text>
            <Text as="p">
                            Permanent cookies are often third-party cookies. The majority of
                            third-party cookies consist of tracking cookies used to identify
                            online behavior, understand interests, and then customize
                            advertising for users.
            </Text>
            <Text as="p">
                            Third-party analytical cookies may also be installed. They are sent
                            from the domains of the aforementioned third parties external to the
                            Application. Third-party analytical cookies are used to detect
                            information on user behavior on our App.
            </Text>
            <Text as="p">
                            This place anonymously, to monitor the performance and improve the
                            usability of the site. Third-party profiling cookies are used to
                            create profiles relating to users, to propose advertising in line
                            with the choices expressed by the users themselves.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>Profiling cookies</u>
            </Text>
            <Text as="p">
                            We may also use profiling cookies, which are those that create
                            profiles related to the user and are used to send advertising to the
                            user&apos;s device.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>Essential cookies</u>
            </Text>
            <Text as="p">
                            We may use essential cookies to authenticate users and prevent
                            fraudulent use of user accounts.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            For security purposes (spam filters, firewalls, virus detection),
                            the automatically recorded data may also possibly include Personal
                            Data such as IP address, which could be used, under applicable laws,
                            to block attempts at damage to the App or damage to other users, or
                            in the case of harmful activities or crime. Such data are never used
                            for the identification or profiling of the user, but only for the
                            protection of the App and our users.
            </Text>
            <Text as="p">
                            Such information will be treated according to the legitimate
                            interests of the Data Controller.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <u>What are Your choices regarding cookies</u>
            </Text>
            <Text as="p">
                            If you&apos;d like to delete cookies or instruct your device to
                            delete or refuse cookies, please visit the help pages of your
                            device.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            Please note, however, that if you delete cookies or refuse to accept
                            them, you might not be able to use all of the features we offer, you
                            may not be able to store your preferences, and some of our services
                            might not display properly.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            So, you can manage or request the general deactivation or
                            cancelation of cookies through your device. If you do this though,
                            please be advised this action might slow down or prevent access to
                            some parts of the App.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>Third Parties</strong>
            </Text>
            <Text as="p">
                            We may utilize third-party service providers (&quot;Third-Party
                            Service Providers&quot;), from time to time or all the time, to help
                            us with our App, and to help serve you.
            </Text>
            <Text as="p">
                            We only share your Personal Data with a Third-Party Service Provider
                            if that provider agrees to our privacy standards as set out in this
                            Privacy Policy.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            Notwithstanding the other provisions of this Privacy Policy, we may
                            provide your Personal Data to a third party or to third parties to
                            protect the rights, property or safety, of us, our customers or
                            third parties, or as otherwise required by law.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            We will not knowingly share your Personal Data with any third
                            parties other than in accordance with this Privacy Policy.
            </Text>
            <Text as="p">
                            In general, you may request that we do not share your Personal Data
                            with third parties. Please contact us via email, if so. Please be
                            advised that you may lose access to certain services that we rely on
                            third-party providers for.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>Purpose Of Processing Personal Data</strong>
            </Text>
            <Text as="p">
                            We primarily use your Personal Data to help us provide a better
                            experience for you on our App and to provide you the services and/or
                            information you may have requested.
            </Text>
            <Text as="p">
                            Information that does not identify you personally, but that may
                            assist in providing us broad overviews of our customer base, will be
                            used for market research or marketing efforts.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            We will only use the Personal Information we collect from and about
                            you for the purposes described in this Privacy Policy and when the
                            law allows us to do so.
            </Text>
            <Text as="p">
                            We will generally use your Personal Information on the following
                            lawful grounds:
            </Text>
            <ul>
              <li>
                                Where the use of your personal information is necessary for the
                                performance of a contract we are about to enter into or have
                                entered into with you;
              </li>
              <li>
                                Where the use is necessary for our legitimate interests (or those
                                of a third party);
              </li>
              <li>
                                Where we need to comply with a legal or regulatory obligation; or
              </li>
              <li>
                                Where you have provided your consent, which can be withdrawn at
                                any time.
              </li>
            </ul>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            We may use the information that you provide us or that we obtain
                            about you for a variety of business purposes in our legitimate
                            interests, including the following :
            </Text>
            <Text as="p">
                            (i) to manage and maintain your account including your use of our
                            registry and other wedding planning tools;
            </Text>
            <Text as="p">(ii) to process and track your purchases;</Text>
            <Text as="p">
                            (iii) to contact you about your activities and your account,
            </Text>
            <Text as="p">
                            (iv) to communicate with you about our Website, Apps, products,
                            services, offers, and events, provided you have given your consent
                            if required under local law;
            </Text>
            <Text as="p">
                            (v) to have our customer support team respond to your questions and
                            comments;
            </Text>
            <Text as="p">
                            (vi) to operate, evaluate and improve our Services, including our
                            Website and Apps, as well as develop new products and offerings;
            </Text>
            <Text as="p">
                            (vii) to send marketing communications, including email, and
                            identify when emails sent to you have been received and track
                            industry-standard performance metrics, such as email opens and
                            clicks;
            </Text>
            <Text as="p">
                            (viii) to administer entries into sweepstakes, contests, promotions
                            or surveys and to prevent fraud and unauthorized transactions and
                            identify potential hackers and other unauthorized users;
            </Text>
            <Text as="p">
                            (ix) to enforce our Terms of Use and yo comply with legal
                            requirements, industry standards, and our policies; and
            </Text>
            <Text as="p">(x) to otherwise provide our Services to you.</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            Taking into account the state of the art, the costs of
                            implementation and the nature, scope, context, and purposes of
                            Processing as well as the risk of varying likelihood and severity
                            for the rights and freedoms of natural persons, WeddMate shall,
                            concerning the User Personal Data, implement appropriate technical
                            and organizational measures to ensure a level of security
                            appropriate to that risk, including, as appropriate, the measures
                            referred to in Article 32(1) of the GDPR.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            In assessing the appropriate level of security, WeddMate shall take
                            account in particular of the risks that are presented by Processing,
                            in particular from a Personal Data Breach.
            </Text>
            <Text as="p">
                            WeddMate shall notify User without undue delay upon becoming aware
                            of a Personal Data Breach affecting User Personal Data, providing
                            User with sufficient information to allow the Company to meet any
                            obligations to report or inform Data Subjects of the Personal Data
                            Breach under the Data Protection Laws.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>Disclosure of Personal Data</strong>
            </Text>
            <Text as="p">
                            Although our policy is to maintain the privacy of your Personal Data
                            as described herein, we may disclose your Personal Data if we
                            believe that it is reasonable to do so in certain cases, in our sole
                            and exclusive discretion. Such cases may include, but are not
                            limited to:
            </Text>
            <ol>
              <li>
                                a) To satisfy any Local, State, or Federal laws or regulations
              </li>
              <li>
                                b) To respond to requests, such discovery, criminal, civil, or
                                administrative process, subpoenas, court orders, or writs from law
                                enforcement or other governmental or legal bodies
              </li>
              <li>
                                c) To bring legal action against a user who has violated the law
                                or violated the terms of use of our Website
              </li>
              <li>d) As may be necessary for the operation of our App</li>
              <li>
                                e) To generally cooperate with any lawful investigation about our
                                users
              </li>
              <li>
                                f) If we suspect any fraudulent activity on our App or if we have
                                noticed any activity which may violate our terms or other
                                applicable rules.
              </li>
            </ol>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>User’s Rights</strong>
            </Text>
            <Text as="p">
                            According to Regulation (EU) 2016/679 User has many rights
                            concerning Personal Data. Specifically, User rights are as follows:
            </Text>
            <Text as="p">
                            - the right to be informed about the processing of Personal Data
            </Text>
            <Text as="p">- the right to have access to Personal Data</Text>
            <Text as="p">- the right to update and/or correct Personal Data</Text>
            <Text as="p">- the right to portability of Personal Data</Text>
            <Text as="p">
                            - the right to oppose or limit the processing of Personal Data
            </Text>
            <Text as="p">
                            - the right to request that Company stop processing and delete User
                            Personal Data
            </Text>
            <Text as="p">
                            - the right to block any Personal Data processing in violation of
                            any applicable law
            </Text>
            <Text as="p">
                            - the right to launch a complaint with the EU or applicable data
                            protection authority in another jurisdiction
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>Acceptance of Risk</strong>
            </Text>
            <Text as="p">
                            By continuing to our App in any manner, you manifest your continuing
                            asset to this Agreement and everything included in our Privacy
                            Policy. You further acknowledge, agree, and accept that no
                            transmission of information or data via the internet is not always
                            completely secure, no matter what steps are taken. You acknowledge,
                            agree and accept that we do not guarantee or warrant the security of
                            any information that you provide to us, and that you transmit such
                            information at your own risk.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>Location</strong>
            </Text>
            <Text as="p">
                            Please be advised the data processing activities can take place also
                            outside of the European Economic Area, but will only be done so in a
                            manner that complies with the EU&apos;s General Data Protection
                            Regulation or GDPR. Data may also be transferred to companies within
                            the United States, but will only be done so in a manner that
                            complies with the EU&apos;s General Data Protection Regulation or
                            GDPR. The location where the data processing activities take place
                            is as follows:
            </Text>
            <Text as="p">Czech Republic.</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>Opting Out of Transmittals From Us</strong>
            </Text>
            <Text as="p">
                            From time to time, we may send you informational or marketing
                            communications related to our Application such as announcements or
                            other information. If you wish to opt-out of such communications,
                            you may contact the following email info@weddmate.com and we will
                            promptly remove you from ALL correspondence.
            </Text>
            <Text as="p">
                            You may also click the opt-out link which will be provided at the
                            bottom of all such communications.
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
                            Please be advised that even though you may opt-out of such
                            communications, you may still receive information from us that is
                            specifically about your use of our App or about your account with
                            us.
            </Text>
            <Text as="p">
                            By providing any Personal Data to us, or by using our WeddMate in
                            any manner, you have created a commercial relationship with us. As
                            such, you agree that any email sent from us or third-party
                            affiliates, even unsolicited email, shall specifically not be
                            considered SPAM, as that term is legally defined
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>Special Note About Children</strong>
            </Text>
            <Text as="p">
                            Children are not eligible to use our services unsupervised and we
                            ask that children (under the age of 13) do not submit any Personal
                            Information to us. If you are a minor, you can use this service only
                            in conjunction with permission and guidance from your parents or
                            guardians.
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>&nbsp;</strong>
            </Text>
            <Text as="p">
              <strong>Final Conclusion</strong>
            </Text>
            <Text as="p">
                            By continuing to use WeddMate, you acknowledge that you have had the
                            chance to review and consider this Privacy Policy, and you
                            acknowledge that you agree to it. This means that you also consent
                            to the use of your information and the method of disclosure as
                            described in this Privacy Policy. If you do not understand the
                            Privacy Policy or do not agree to it, then you agree to immediately
                            cease your use of the App.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
                            We reserve the right to modify, revise, or otherwise amend this
                            Privacy Policy at any time and in any manner. If we do so, however,
                            we will notify you to inspect and tacitly consent to the change in
                            processing. Any changes to the Privacy Policy will only impact the
                            information collected on or after the date of the change. It is also
                            your responsibility to periodically check this page for any such
                            modification, revision, or amendment.
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p">
              <strong>Last updated: 15.6.2020</strong>
            </Text>
            <Text as="p">&nbsp;</Text>
            <Text as="p" fontFamily="mono" textAlign="center" my="10">
                            If there are any questions regarding this privacy policy, you may
                            contact us at our email{' '}
              <Text
                as="a"
                fontWeight="bold"
                textDecor="underline"
                href="mailto:info@events-mate.com"
              >
                                info@events-mate.com
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