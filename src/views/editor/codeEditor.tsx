import React, { FunctionComponent } from 'react';
import Editor from "../../components/ParaUI/Editor";
interface OwnProps {}

type Props = OwnProps;

const codeEditor: FunctionComponent<Props> = (props) => {

  return (<Editor />);
};

export default codeEditor;
