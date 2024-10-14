
import { VStack, Link, Image } from '@chakra-ui/react';
import { FC } from 'react';

const StoreLinks: FC = () => {
  return (
    <VStack spacing={4}>
      <Link
        href="https://apps.apple.com/us/app/wedding-planner-weddmate/id1515593517?itsct=apps_box_badge&amp;itscg=30200"
      >
        <Image
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/cs-cz?size=250x63&amp;releaseDate=1593043200"
          alt="Download on the App Store"
          height="63px"
        />
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=com.weddmate.mobile&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        display="inline-block"
        overflow="hidden"
        width="190px"
        height="80px"
        color="black"
      >
        <Image
          alt="Nyní na Google Play"
          src="https://play.google.com/intl/en_us/badges/static/images/badges/cs_badge_web_generic.png"
          width="190px"
          height="80px"
        />
      </Link>
    </VStack>
  );
};

export default StoreLinks;
