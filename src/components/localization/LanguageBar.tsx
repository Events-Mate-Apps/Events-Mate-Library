import { Card, Flex, HStack } from "@chakra-ui/react";
import { SetStateAction, Dispatch, useEffect } from "react";
import LangButton from "./LangButton";
// import { extractLanguageISOCodesFromObject } from "../../service/LocalesService";

interface LanguageBarProps {
    obj: object,
    langToDisplay: string | null,
    setLangToDisplay: Dispatch<SetStateAction<string | null>>
}

const LanguageBar: React.FC<LanguageBarProps> = ({ obj, langToDisplay, setLangToDisplay }) => {
    function extractLanguageISOCodesFromObject(obj: object): string[] {
        let langs: string[] = [];
      
        function extractLanguages(obj: any) {
          if (obj !== null && typeof obj === 'object') {
            Object.entries(obj).forEach(([key, value]) => {
              if (key === 'languageISO' && typeof value === 'string') {
                !langs.includes(value) && langs.push(value);
              } else if (typeof value === 'object') {
                extractLanguages(value);
              }
            });
          }
        }
      
        extractLanguages(obj);
        return langs;
    }

    const langs = extractLanguageISOCodesFromObject(obj)

    useEffect(() => {
        if (langToDisplay === null && langs.length > 0) {
            setLangToDisplay(langs[0]);
        }
    }, [langs, langToDisplay]);

    return (
        <Flex
            overflowX='scroll'
        >
            <HStack
                mb='10px'
            > 
                {langs.map((e) => {
                        return (
                            <LangButton 
                                key={e}
                                title={e}
                                onClick={() => setLangToDisplay(e)}
                                isSelected={e === langToDisplay}
                            />
                        )
                    })
                }
            </HStack>
        </Flex>
    );
}
export default LanguageBar;
