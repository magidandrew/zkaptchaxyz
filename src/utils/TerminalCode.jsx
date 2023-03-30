// TerminalCode.js
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TerminalCode = ({ language, codeString }) => {
  return (
    <div className="bg-black bg-opacity-80 p-4 rounded">
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        customStyle={{ backgroundColor: 'transparent', fontSize: '0.9rem', lineHeight: 1.5 }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default TerminalCode;
