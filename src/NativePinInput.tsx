import { createElement, ReactElement, useEffect, useMemo, useState } from "react";
import { Appearance, Text, View, TextInput } from "react-native";
import { NativePinInputProps } from "../typings/NativePinInputProps";
import { circleStyles, numKeyboardStyles, darkStyles, lightStyles, CustomStyle, defaultStyle } from "./ui/styles";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
import { PinInputButton } from "./components/PinInputButton";
import { ValueStatus } from "mendix";
import { DeleteButton } from "./components/DeleteButton";
import { e2eID } from "./utils";

export function NativePinInput({
    name,
    style,
    dataAttr,
    maxLength,
    deleteButtonIcon,
    darkMode,
    buttonStyle,
    onChangeAction,
    onInputCompleteAction,
    testID,
    accessibilityLabel,
    accessibilityHint,
    deleteBtnAccessibilityLabel
}: NativePinInputProps<CustomStyle>): ReactElement {
    const deviceDarkMode = Appearance.getColorScheme() === "dark";

    const [textValue, setTextValue] = useState<string>("");
    const [displayValue, setDisplayValue] = useState<string>("");

    // Insert additional styles based on properties.
    // These must be placed at the top of the array, using unshift, to allow overrule by project theme styles and design properties.
    const styleArray: CustomStyle[] = [...style];
    switch (darkMode) {
        case "dark":
            styleArray.unshift(darkStyles);
            break;

        case "light":
            styleArray.unshift(lightStyles);
            break;

        default:
            if (deviceDarkMode) {
                styleArray.unshift(darkStyles);
            } else {
                styleArray.unshift(lightStyles);
            }
    }
    if (buttonStyle === "circle") {
        styleArray.unshift(circleStyles);
    } else {
        styleArray.unshift(numKeyboardStyles);
    }
    const mergedStyle: CustomStyle = mergeNativeStyles(defaultStyle, styleArray);

    useEffect(() => {
        if (textValue && dataAttr && !dataAttr.value) {
            setTextValue("");
            setDisplayValue("");
        }
    }, [dataAttr, textValue]);

    const onClick = (value: string): void => {
        if (!dataAttr || dataAttr.status !== ValueStatus.Available) {
            return;
        }
        // Add input if not at maximum length yet
        let displayValueLength = displayValue ? displayValue.length : 0;
        if (displayValueLength < maxLength) {
            // Add digit to value
            const newTextValue = textValue + value;
            dataAttr.setTextValue(newTextValue);
            setTextValue(newTextValue);
            setDisplayValue(displayValue + "*");
            displayValueLength++;

            // Execute on change action if more input expected,
            // execute on input complete action if all digits were entered.
            if (displayValueLength < maxLength) {
                if (onChangeAction && onChangeAction.canExecute && !onChangeAction.isExecuting) {
                    onChangeAction.execute();
                }
            } else {
                if (onInputCompleteAction && onInputCompleteAction.canExecute && !onInputCompleteAction.isExecuting) {
                    onInputCompleteAction.execute();
                }
            }
        }
    };

    const onDeleteClick = (): void => {
        if (!dataAttr || dataAttr.status !== ValueStatus.Available) {
            return;
        }
        if (textValue && displayValue && textValue.length > 0) {
            const newValue = textValue.substring(0, textValue.length - 1);
            const newDisplayValue = displayValue.substring(0, displayValue.length - 1);
            dataAttr.setTextValue(newValue);
            setTextValue(newValue);
            setDisplayValue(newDisplayValue);
            if (onChangeAction && onChangeAction.canExecute && !onChangeAction.isExecuting) {
                onChangeAction.execute();
            }
        }
    };

    const renderValidation = useMemo((): ReactElement => {
        let validation;
        if (dataAttr.validation) {
            validation = "" + dataAttr.validation;
        } else {
            validation = " ";
        }
        return <Text style={mergedStyle.validationMessage}>{validation}</Text>;
    }, [mergedStyle, dataAttr.validation]);

    return (
        <View
            {...(!accessibilityLabel && e2eID(testID))}
            {...(!testID &&
                accessibilityLabel && {
                    accessible: true,
                    accessibilityHint,
                    accessibilityLabel
                })}
            style={mergedStyle.container}
        >
            <View style={mergedStyle.valueRow}>
                <TextInput editable={false} style={mergedStyle.readonlyText} value={displayValue} secureTextEntry />
                {renderValidation}
            </View>
            <View style={mergedStyle.buttonRow}>
                <PinInputButton testID={`${testID}$button$1`} caption="1" style={mergedStyle} onClick={onClick} />
                <PinInputButton testID={`${testID}$button$2`} caption="2" style={mergedStyle} onClick={onClick} />
                <PinInputButton testID={`${testID}$button$3`} caption="3" style={mergedStyle} onClick={onClick} />
            </View>
            <View style={mergedStyle.buttonRow}>
                <PinInputButton testID={`${testID}$button$4`} caption="4" style={mergedStyle} onClick={onClick} />
                <PinInputButton testID={`${testID}$button$5`} caption="5" style={mergedStyle} onClick={onClick} />
                <PinInputButton testID={`${testID}$button$6`} caption="6" style={mergedStyle} onClick={onClick} />
            </View>
            <View style={mergedStyle.buttonRow}>
                <PinInputButton testID={`${testID}$button$7`} caption="7" style={mergedStyle} onClick={onClick} />
                <PinInputButton testID={`${testID}$button$8`} caption="8" style={mergedStyle} onClick={onClick} />
                <PinInputButton testID={`${testID}$button$9`} caption="9" style={mergedStyle} onClick={onClick} />
            </View>
            <View style={mergedStyle.buttonRow}>
                <View style={mergedStyle.emptyContainer}></View>
                <PinInputButton testID={name} caption="0" style={mergedStyle} onClick={onClick} />
                <DeleteButton
                    {...(!accessibilityLabel && e2eID(`${testID}$delete`))}
                    {...(!testID && { accessibilityLabel: deleteBtnAccessibilityLabel })}
                    deleteButtonIcon={deleteButtonIcon}
                    style={mergedStyle}
                    onClick={onDeleteClick}
                />
            </View>
        </View>
    );
}
