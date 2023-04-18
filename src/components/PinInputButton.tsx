import { ReactElement, createElement, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { CustomStyle } from "src/ui/styles";
import { e2eID } from "../utils";

export interface PinInputButtonProps {
    testID: string;
    caption: string;
    style: CustomStyle;
    onClick: (value: string) => void;
}

export function PinInputButton({ testID, caption, style, onClick }: PinInputButtonProps): ReactElement {
    const onClickHandler = useCallback((): void => {
        onClick(caption);
    }, [caption, onClick]);

    const renderView = useMemo((): ReactElement => {
        return (
            <View style={style.pinInputView}>
                <Text style={style.caption}>{caption}</Text>
            </View>
        );
    }, [caption, style]);

    return (
        <Pressable
            {...(!testID && {
                accessibilityRole: "button",
                accessibilityLabel: caption
            })}
            {...(testID && e2eID(testID))}
            onPress={() => onClickHandler()}
        >
            {renderView}
        </Pressable>
    );
}
