import { FC, useEffect, useState } from 'react';
import { QDisplayComponentProps } from '../../../interfaces/questionnaire';
import { Box } from '@chakra-ui/react';
import { api } from '../../../utils/api';
import { Vendor } from '../../../interfaces/vendor';
import { useNotification } from '../../../service/NotificationService';

const QLinkDisplay: FC<QDisplayComponentProps> = ({ responses }) => {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const { showError } = useNotification()

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
    <Box p='10px'>
      <p>{JSON.stringify(vendors.map(e => e.name))}</p>
    </Box>
  );
}
  
export default QLinkDisplay;