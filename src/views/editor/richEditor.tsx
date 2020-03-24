import React, {FunctionComponent} from "react";
import {RichEditor} from "../../components/ParaUI";

interface OwnProps {
}

type Props = OwnProps;

const richEditor: FunctionComponent<Props> = (props) => {

    return (
        <div>
            <h1>富文本编辑器</h1>
            <RichEditor/>
        </div>
    );
};

export default richEditor;
