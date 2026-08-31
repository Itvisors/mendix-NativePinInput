/**
 * This file was generated from NativePinInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue, NativeIcon } from "mendix";
import { CSSProperties } from "react";

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
    a11yLabel?: DynamicValue<string>;
    deleteButtonA11yLabel?: DynamicValue<string>;
    a11yHint?: DynamicValue<string>;
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
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    dataAttr: string;
    maxLength: number | null;
    deleteButtonIcon:
        | { type: "glyph"; iconClass: string }
        | { type: "image"; imageUrl: string; iconUrl: string }
        | { type: "icon"; iconClass: string }
        | undefined;
    darkMode: DarkModeEnum;
    buttonStyle: ButtonStyleEnum;
    onChangeAction: {} | null;
    onInputCompleteAction: {} | null;
    a11yLabel: string;
    deleteButtonA11yLabel: string;
    a11yHint: string;
}
