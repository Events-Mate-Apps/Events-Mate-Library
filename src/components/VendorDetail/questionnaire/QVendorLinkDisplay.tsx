import { FC, useEffect, useState } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';
import { api } from '~/utils/api';
import { SmallVendor } from '~/interfaces/vendor';

const QLinkDisplay: FC<QDisplayComponentProps> = ({ responses }) => {
  const [vendors, setVendors] = useState<SmallVendor[]>([])

  const getVendors = async () => {
    responses[0].partnerVendorIds.forEach(async id => {
      const { data: vendor } = await api.get(`smallVendors/${id}`)
      setVendors(prevState => [vendor, ...prevState])
    })
  }

  useEffect(() => {
    getVendors()
  }, [])

  return (
    <Box p='10px'>
      <p>{JSON.stringify(vendors.map(e => e.name))}</p>
    </Box>
  );
}
  
export default QLinkDisplay;