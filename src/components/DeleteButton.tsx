import { ReactElement, useState } from "react";
import { Pressable, View } from "react-native";
import { DynamicValue, NativeIcon, ValueStatus } from "mendix";
import { Icon } from "mendix/components/native/Icon";
import { CustomStyle } from "src/ui/styles";

export interface DeleteButtonProps {
    deleteButtonIcon: DynamicValue<NativeIcon>;
    style: CustomStyle;
    onClick: () => void;
    accessibilityLabel: string;
    widgetName: string;
}

export function DeleteButton({
    deleteButtonIcon,
    style,
    onClick,
    accessibilityLabel,
    widgetName
}: DeleteButtonProps): ReactElement {
    const [pressed, setPressed] = useState<boolean>(false);
    const defaultIconGlyph = "glyphicon-trash";
    const nativeIcon: NativeIcon =
        deleteButtonIcon && deleteButtonIcon.status === ValueStatus.Available
            ? deleteButtonIcon.value
            : { type: "glyph", iconClass: defaultIconGlyph };

    return (
        <Pressable
            onPress={() => onClick()}
            style={({ pressed }) => {
                setPressed(pressed);
                return [];
            }}
            accessible
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            testID={`${widgetName}$deleteButton`}
        >
            <View
                style={pressed ? style.deleteButtonTouchablePressed : style.deleteButtonTouchable}
                testID={`${widgetName}$deleteButtonIconView`}
            >
                <Icon color={style.icon.color as string} icon={nativeIcon} size={style.icon.fontSize} />
            </View>
        </Pressable>
    );
}
