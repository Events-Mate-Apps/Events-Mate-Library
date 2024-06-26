import { FC, useEffect, useState } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { HStack, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { api } from '../../../utils/api';
import { Vendor } from '../../../interfaces/vendor';
import useNotificationStore from '../../../stores/notification';
import { useRouter } from 'next/router';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const QLinkDisplay: FC<QDisplayComponentProps> = ({ responses }) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const { push } = useRouter()
  const { showError } = useNotificationStore()

  const getVendors = async () => {
    responses[0].partnerVendorIds.forEach(async id => {
      try {
        const { data: vendor } = await api.get(`vendors/${id}`)
        setVendors(prevState => [vendor, ...prevState])
      } catch (error) {
        showError({ error })
      }
    })
  }

  useEffect(() => {
    getVendors()
  }, [])

  return (
    <HStack spacing={2} pb='10px'>
      {vendors.map(e => (
        <Tag
          borderRadius='full'
          variant='solid'
          bg='brand.900'
          key={e.id}
          onClick={() => push(`/vendors/${e.id}`)}
          cursor='pointer'
        >
          <TagLabel>
            {e.name}
          </TagLabel>
          <TagRightIcon as={ExternalLinkIcon} />
        </Tag>
      ))}
    </HStack>
  );
}
  
export default QLinkDisplay;