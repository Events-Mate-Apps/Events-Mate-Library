import { Box, Button, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { Dispatch, SetStateAction, useState } from 'react';
import FormLabel from '../../components/fields/FormLabel';
import { Language, TranslationTextContent } from '../../interfaces/vendor';
import LanguageList from 'language-list';
import useTranslation from 'next-translate/useTranslation';

interface AddLangButtonProps {
  content: TranslationTextContent,
  setContent: Dispatch<SetStateAction<TranslationTextContent>>,
  setCurrentLang: Dispatch<SetStateAction<string | null>>,
  children: JSX.Element
}

const AddLangBtn: React.FC<AddLangButtonProps> = ({ content, setContent, children, setCurrentLang }) => {
  const bgColor = useColorModeValue('white', 'navy.900')

  const { isOpen, onClose, onOpen } = useDisclosure()
  const languages: Language[] = LanguageList().getData();
  const langs = [{ code: 'all', language: 'All' }, ...languages]
  const { t } = useTranslation()
  
  const [lang, setLang] = useState<string | null>(null) 

  const addLang = async () => {
    if (!lang) {
      return
    }

    setContent((prevState) => ({
      ...prevState,
      translations: [
        ...prevState.translations,
        {
          languageISO: lang,
          translation: ''
        }
      ]
    }))

    setCurrentLang(lang)

    onClose()
  }

  return (
    <Box w='100%'>
      <SimpleGrid 
        w='100%'
        placeContent='center'
        onClick={() => onOpen()}
      >
        {children}
      </SimpleGrid>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h='250px' zIndex="modal" bgColor={bgColor}>
          <ModalHeader>{t('edit:newLanguage')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>{t('edit:selectLang')}</FormLabel>
              <Select
                placeholder={t('edit:selectLanguage', { defaultValue: t('edit:selectLanguage') })}

                options={langs.filter((e) => !content.translations.map(e => e.languageISO).includes(e.code)).map(e => {
                  return {
                    label: e.language,
                    value: e.code
                  }
                })}
                menuPortalTarget={document.getElementById('menu-portal')}
                onChange={e => (e) && setLang(e.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              {t('common:close')}
            </Button>
            <Button 
              variant='darkBrand'
              onClick={() => addLang()}
              disabled={!lang}
            >
              {t('edit:addLanguage')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddLangBtn;
