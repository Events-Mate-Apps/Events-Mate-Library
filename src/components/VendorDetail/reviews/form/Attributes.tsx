import React from "react";
import { Flex } from "@chakra-ui/react";
import StarRating from "./StarRating";

// TODO components are missing red star, to show they are mandatory
export default function Attributes() {
    //TODO really qualities? Maybe better to rename, even 'attributes' sound weird
    const attributes = [
        "qualityOfService",
        "responsiveness",
        "professionalism",
        "value",
        "flexibility"
    ]

    return (
        <Flex direction="column">
            <Flex direction="column">
                {attributes.map((attribute, index) => (
                    <StarRating
                        attribute={attribute}
                        key={`attribute_${index}`}
                    />
                ))}
            </Flex>
        </Flex>
    )
}