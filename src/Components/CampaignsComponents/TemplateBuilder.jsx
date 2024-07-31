import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';

const MyEmailEditor = () => {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      localStorage.setItem('emailDesign', JSON.stringify(design));
      localStorage.setItem('emailHtml', html);
    });
  };

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      localStorage.setItem('emailDesign', JSON.stringify(design));
    });
  };

  const loadDesign = () => {
    const savedDesign = localStorage.getItem('emailDesign');
    if (savedDesign) {
      emailEditorRef.current.editor.loadDesign(JSON.parse(savedDesign));
    }
  };

  return (
    <div>
      <button onClick={exportHtml}>Export HTML</button>
      <button onClick={saveDesign}>Save Design</button>
      <button onClick={loadDesign}>Load Design</button>
      <EmailEditor ref={emailEditorRef} />
    </div>
  );
};

export default MyEmailEditor;
