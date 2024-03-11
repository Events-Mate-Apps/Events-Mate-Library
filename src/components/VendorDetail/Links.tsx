import {
    IconButton,
    HStack
} from '@chakra-ui/react';

import { Vendor } from '../../interfaces/vendor';
import { links } from '../../utils/links';

interface LinksProps {
    vendor: Vendor
}

const Links: React.FC<LinksProps> = ({ vendor }) => {
    return (
        <HStack alignItems="center" justifyContent="center">
            {vendor.isPremium && vendor.links
                .map((link) => {
                    const social = links.find((a) => a.property === link.type);
                    if (!social) return null;
                    return (
                        <IconButton
                            as="a"
                            fontSize="1.2rem"
                            icon={social.icon}
                            key={link.url}
                            href={link.url}
                            rel="noreferrer"
                            target="_blank"
                            aria-label={
                                links.find((a) => link.type === a.property)?.label ??
                                'Social network'
                            }
                        />
                    );
                })}
        </HStack>
    );
}

export default Links;