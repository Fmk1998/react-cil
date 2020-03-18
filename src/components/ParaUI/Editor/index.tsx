import React, {FunctionComponent, Fragment, useState} from "react";
import MonacoEditor from "react-monaco-editor";

interface OwnProps {
}

type Props = OwnProps;

const options = {
    selectOnLineNumbers: true
};

const Editor: FunctionComponent<Props> = (props) => {
    const [code, setCode] = useState("");
    const editorDidMount = (editor: any, monaco: any) => {
        console.log(editor, monaco);
        editor.focus();
    };
    const onChange = (newValue: any, e: any) => {
        setCode(newValue);
    };
    return (<Fragment>
        <MonacoEditor
            width="800"
            height="600"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />
    </Fragment>);
};

export default Editor;
