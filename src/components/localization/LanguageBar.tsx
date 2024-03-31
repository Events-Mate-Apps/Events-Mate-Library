import { Card, Flex, HStack } from "@chakra-ui/react";
import { SetStateAction, Dispatch, useEffect } from "react";
import LangButton from "./LangButton";
import { extractLanguageISOCodesFromObject } from "../../service/LocalesService";

interface LanguageBarProps {
    obj: object,
    langToDisplay: string | null,
    setLangToDisplay: Dispatch<SetStateAction<string | null>>
}

const LanguageBar: React.FC<LanguageBarProps> = ({ obj, langToDisplay, setLangToDisplay }) => {
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
