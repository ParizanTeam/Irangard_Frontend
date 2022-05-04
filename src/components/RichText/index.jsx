import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.scss';

function RichText({
  defaultContent,
  onChange = () => {},
  label,
  hideToolbar = false,
  editorClassName,
  readOnly = false,
}) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // load default content to editor
  useEffect(() => {
    if (defaultContent) {
      const contentBlock = htmlToDraft(defaultContent);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, [defaultContent]);

  useEffect(() => {
    onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  return (
    <div className="rich-text">
      {label && <label className="rich-text__label">{label}</label>}
      <div className={classNames('rich-text__editor', editorClassName)}>
        <Editor
          readOnly={readOnly}
          toolbarStyle={{ display: hideToolbar ? 'none' : '' }}
          editorClassName="rich-text__editor-body"
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
    </div>
  );
}

export default RichText;
