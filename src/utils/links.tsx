import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTripadvisor,
  FaTwitter,
  FaYelp,
  FaYoutube,
  FaGlobe
} from 'react-icons/fa';

export type SocialType = {
  label: string;
  property: string;
  id: number,
  value?: string
  example?: string;
  icon?: ReactElement<IconType>;
  iconComponent?: IconType;
  domain?: string;
};

export const links: SocialType[] = [
  {
    label: 'TikTok',
    property: 'tikTok',
    id: 1,
    example: 'https://www.tiktok.com/@weddmate',
    icon: <FaTiktok />,
    iconComponent: FaTiktok,
    domain: 'tiktok.com',
  },
  {
    label: 'Facebook',
    property: 'facebook',
    id: 2,
    example: 'https://www.facebook.com/Weddmate.official',
    icon: <FaFacebook />,
    iconComponent: FaFacebook,
    domain: 'facebook.com',
  },
  {
    label: 'Instagram',
    property: 'instagram',
    id: 3,
    example: 'https://www.instagram.com/weddmate',
    icon: <FaInstagram />,
    iconComponent: FaInstagram,
    domain: 'instagram.com',
  },
  {
    label: 'TripAdvisor',
    property: 'tripAdvisor',
    id: 4,
    icon: <FaTripadvisor />,
    iconComponent: FaTripadvisor,
    domain: 'tripadvisor.com',
  },
  {
    label: 'Yelp',
    id: 5,
    property: 'yelp',
    icon: <FaYelp />,
    iconComponent: FaYelp,
    domain: 'yelp.com',
  },
  {
    label: 'Pinterest',
    id: 6,
    property: 'pinterest',
    icon: <FaPinterest />,
    iconComponent: FaPinterest,
    domain: 'pinterest.com',
  },
  {
    label: 'Twitter',
    id: 7,
    property: 'twitter',
    example: 'https://www.twitter.com/weddmate',
    icon: <FaTwitter />,
    iconComponent: FaTwitter,
    domain: 'twitter.com',
  },
  {
    label: 'Youtube',
    id: 8,
    property: 'youtube',
    example: 'https://www.youtube.com/c/weddmate',
    icon: <FaYoutube />,
    iconComponent: FaYoutube,
    domain: 'youtube.com',
  },
  {
    label: 'Website',
    id: 9,
    property: 'website',
    example: 'https://www.events-mate.com',
    icon: <FaGlobe />,
    iconComponent: FaGlobe,
    domain: 'events-mate.com',
  },
] as const;

export type Socials = typeof links[number]['property'];
