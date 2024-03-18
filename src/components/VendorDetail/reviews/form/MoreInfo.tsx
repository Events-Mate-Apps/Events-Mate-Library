import {FormControl, Text, useColorModeValue} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '~/components/fields/InputField';
import useTranslation from 'next-translate/useTranslation';
//TODO based on type of vendor, we should change the text which are we asking for
export default function MoreInfo() {
    const {
        register
    } = useFormContext();

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const {t} = useTranslation();

    return (
        <FormControl>
            <InputField
                id="amountSpent"
                label={t(`vendors:detail.reviews.form.moreInfo.amountSpent`)}
                placeholder={"0"}
                {...register('amountSpent')}
            />
            <InputField
                id="guestsAttended"
                label={t(`vendors:detail.reviews.form.moreInfo.guestsAttended`)}
                placeholder={'0'}
                {...register('guestsAttended')}
            />
            <Text
                color={textColor}
                fontSize="xs"
                fontWeight="400"
            >
                {t(`vendors:detail.reviews.form.moreInfo.info`)}
            </Text>
        </FormControl>
    );
}
