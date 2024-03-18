import { FormControl } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '~/components/fields/InputField';
import SwitchField from '~/components/fields/SwitchField';
import TextArea from '~/components/fields/TextArea';
import useTranslation from 'next-translate/useTranslation';
export default function Recommendation() {
    const {
        register,
        setValue,
    } = useFormContext();

    const [recommend, setRecommend] = useState<boolean>(true);
    const [decision, setDecision] = useState<boolean>(true);
    const {t} = useTranslation();

    // onChange management for each of the switches and the text fields
    const onChangeRecommendation = () => {
        const updatedRecommend = !recommend;
        setRecommend(updatedRecommend);
        setValue('recommend', updatedRecommend);
    };

    const onChangeDecision = () => {
        const updatedDecision = !decision;
        setDecision(updatedDecision);
        setValue('didWeHelp', updatedDecision);
    };

    const onChangeDescription = (value: string) => {
        setValue('description', value);
    };

    // TODO title and description are missing red star, to show they are mandatory (consider this in other components of the form too)
    return (
        <FormControl>
            {/* TODO SwitchFields are just basic switches, they should show the user what it means (yes/no) and be flipping in the other direction (left yes right no) */}
            <SwitchField
                id="recommend"
                label={t(`vendors:detail.reviews.form.recommendation.recommend`)}
                isChecked={recommend}
                onChange={onChangeRecommendation}
                w={{base: '100%', lg: 'calc(60% - 15px)'}}
            />
            <SwitchField
                id="didWeHelp"
                label={t(`vendors:detail.reviews.form.recommendation.decision`)}
                isChecked={decision}
                onChange={onChangeDecision}
                w={{base: '100%', lg: 'calc(60% - 15px)'}}
                mb={5}
            />
            <InputField
                id="title"
                label={t(`vendors:detail.reviews.form.recommendation.title`)}
                placeholder={t(`vendors:detail.reviews.form.recommendation.titlePlaceholder`)}
                {...register('title', {
                    //TODO I don't know how is the text shown, so it is not tested, suspicion is that it is not shown at all, which it should be
                    required: t('common:fieldIsRequired', { 'x': 'title' }),
                })}
            />
            {/* TODO Description is mandatory */}
            <TextArea
                id="description"
                label={t(`vendors:detail.reviews.form.recommendation.description`)}
                placeholder={t(`vendors:detail.reviews.form.recommendation.descriptionPlaceholder`)}
                onChange={onChangeDescription}
            />
        </FormControl>
    );
}
