import useNotificationStore from '../stores/notification';
import imageCompression from 'browser-image-compression';
import { api } from '~/utils/api';
import useTranslation from 'next-translate/useTranslation';

interface ImageUploadParametrs {
  endpointPath: string,
  file: File
}

interface ImageMethods {
  uploadImage: (params: ImageUploadParametrs) => Promise<void>;
}

export function useImage(): ImageMethods {
  const { showSuccess, showError } = useNotificationStore()
  const { t } = useTranslation()

  const uploadImage = async (params: ImageUploadParametrs) => {
    const { file, endpointPath } = params
    const imgForm = new FormData();
        
    try {      
      const options = {
        maxSizeMB: 700 / 1024,
        useWebWorker: true,
      };

      const compressedFile: File | null = await imageCompression(file, options);
      if (!compressedFile) throw new Error('Compression of image failed.')
      imgForm.append('image', compressedFile)

      const { status, data } = await api.post(endpointPath, imgForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!status.toString().startsWith('2')) {
        if (status === 413) {
          throw new Error('Image is too large');
        }
        throw new Error(data.message ?? 'Error uploading image.');
      }
        
      showSuccess({
        title: t('vendors:image-uploaded'),
        description: t('vendors:image-uploaded-successfully'),
      });

    } catch (error) {
      showError({error});
    }
  }

  return {
    uploadImage
  }
}