import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Rating } from 'react-simple-star-rating';
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

export default function StarRating(props: {attribute: string}) {
    // Form context, setValue doesn't re-render index.tsx (done manually in index using watch)
    const {
        setValue
    } = useFormContext();

    // State management
    const [rating, setRating] = useState(0)
    const [displayRating, setDisplayRating] = useState(0)
    const [hovering, setHovering] = useState(false)

    const { t } = useTranslation();

    // Handling simple hover movement -> returning current hovered amount of stars
    const onPointerEnter = () => setHovering(true)
    const onPointerLeave = () => setHovering(false)
    const onPointerMove = (value: number) => {
        if (value != displayRating) setDisplayRating(value);
    }

    // Catch Rating value
    const handleRating = (rate: number) => {
        setValue(props.attribute, rate)
        setRating(rate)
    }

    //TODO I am pretty sure it is going to be possible to show and maybe even save partial stars
    return (
        <Flex
            direction="row"
            alignItems='center'
            justifyContent='space-between'
        >
            <Text>
                {t(`vendors:detail.reviews.form.qualities.${props.attribute}`)}
            </Text>
            <Flex ms='30px' me='30px' w='60%' mt='4px'>
                <Rating
                    onClick={(newRating) => handleRating(newRating)}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                    transition={true}
                    size={22}
                    SVGstyle={{ 'display':'inline' }}
                />
                <Text ms='15px'>
                    {hovering ? displayRating : rating}
                </Text>
            </Flex>
        </Flex>
    )
}