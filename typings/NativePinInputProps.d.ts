/**
 * This file was generated from NativePinInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, NativeIcon } from "mendix";

export type DarkModeEnum = "device" | "dark" | "light";

export type ButtonStyleEnum = "circle" | "numKeyboard";

export interface NativePinInputProps<Style> {
    name: string;
    style: Style[];
    dataAttr: EditableValue<string>;
    maxLength: number;
    deleteButtonIcon: DynamicValue<NativeIcon>;
    darkMode: DarkModeEnum;
    buttonStyle: ButtonStyleEnum;
    onChangeAction?: ActionValue;
    onInputCompleteAction?: ActionValue;
    testID: string;
    accessibilityLabel: string;
    accessibilityHint: string;
    deleteBtnAccessibilityLabel: string;
}

export interface NativePinInputPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    dataAttr: string;
    maxLength: number | null;
    deleteButtonIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    darkMode: DarkModeEnum;
    buttonStyle: ButtonStyleEnum;
    onChangeAction: {} | null;
    onInputCompleteAction: {} | null;
    testID: string;
    accessibilityLabel: string;
    accessibilityHint: string;
    deleteBtnAccessibilityLabel: string;
}
