import { ReactElement, useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { CustomStyle } from "src/ui/styles";

export interface PinInputButtonProps {
    caption: string;
    style: CustomStyle;
    onClick: (value: string) => void;
    widgetName: string;
}

export function PinInputButton({ caption, style, onClick, widgetName }: PinInputButtonProps): ReactElement {
    const [pressed, setPressed] = useState<boolean>(false);

    const onClickHandler = useCallback((): void => {
        onClick(caption);
    }, [caption, onClick]);

    return (
        <Pressable
            onPress={onClickHandler}
            style={({ pressed }) => {
                setPressed(pressed);
                return [];
            }}
        >
            <View
                style={pressed ? style.pinInputViewPressed : style.pinInputView}
                accessible
                accessibilityLabel={caption}
                accessibilityRole="button"
                testID={`${widgetName}$button${caption}`}
            >
                <Text style={style.caption} testID={`${widgetName}$button${caption}$caption`}>
                    {caption}
                </Text>
            </View>
        </Pressable>
    );
}
