import React, {FunctionComponent, useState, useMemo} from "react";
import {createEditor} from "slate";
import {Slate, Editable, withReact} from "slate-react";
import {withHistory} from "slate-history";

export interface ChildrenInterface {
    text?: string
}

export interface ValueInterface {
    children?: ChildrenInterface[]
}

export interface PlainTextInterface {
    initialValue?: ValueInterface[],
    placeholder?: string
}

const PlainText: FunctionComponent<PlainTextInterface> = (props) => {
    const {
        initialValue = [{
            children: [{
                text: "12132"
            }]
        }],
        placeholder = "Please Input Something..."
    } = props;

    const [value, setValue]: any = useState(initialValue);

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
        >
            <Editable placeholder={placeholder}/>
        </Slate>
    );
};

export default PlainText;
