import React, { useRef, useState } from 'react';
import { cssVar } from '@bbangto-ui/tokens';
import { Button } from './Button';

export interface RichTextEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ value, onChange, placeholder = 'Write something...', style, ...props }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // This is a simplified "shell" implementation. 
    // In a real scenario, you'd integrate Tiptap, Quill, or Slate here.
    const handleFormat = (command: string, value?: string) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      if (editorRef.current) {
        onChange?.(editorRef.current.innerHTML);
      }
    };

    const handleInput = () => {
      if (editorRef.current) {
        onChange?.(editorRef.current.innerHTML);
      }
    };

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${isFocused ? cssVar('semantic', 'border', 'focus') : cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      overflow: 'hidden',
      transition: 'border-color 0.2s',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const toolbarStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: cssVar('spacing', '4'),
      padding: cssVar('spacing', '8'),
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
    };

    const editorAreaStyle: React.CSSProperties = {
      minHeight: '150px',
      padding: cssVar('spacing', '16'),
      outline: 'none',
      color: cssVar('semantic', 'foreground', 'base'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
    };

    const ToolbarButton = ({ icon, onClick, label }: { icon: React.ReactNode, onClick: () => void, label: string }) => (
      <Button 
        variant="ghost" 
        size="sm" 
        color="neutral" 
        onClick={onClick} 
        title={label}
        style={{ padding: cssVar('spacing', '6') }}
        type="button"
      >
        {icon}
      </Button>
    );

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={toolbarStyle}>
          <ToolbarButton 
            label="Bold" 
            onClick={() => handleFormat('bold')} 
            icon={<strong style={{ fontFamily: 'serif', fontSize: '1.2em' }}>B</strong>} 
          />
          <ToolbarButton 
            label="Italic" 
            onClick={() => handleFormat('italic')} 
            icon={<em style={{ fontFamily: 'serif', fontSize: '1.2em' }}>I</em>} 
          />
          <ToolbarButton 
            label="Underline" 
            onClick={() => handleFormat('underline')} 
            icon={<u style={{ fontSize: '1.1em' }}>U</u>} 
          />
          <div style={{ width: '1px', backgroundColor: cssVar('semantic', 'border', 'muted'), margin: `0 ${cssVar('spacing', '4')}` }} />
          <ToolbarButton 
            label="Heading 1" 
            onClick={() => handleFormat('formatBlock', 'H1')} 
            icon={<span style={{ fontWeight: 'bold' }}>H1</span>} 
          />
          <ToolbarButton 
            label="Heading 2" 
            onClick={() => handleFormat('formatBlock', 'H2')} 
            icon={<span style={{ fontWeight: 'bold' }}>H2</span>} 
          />
          <div style={{ width: '1px', backgroundColor: cssVar('semantic', 'border', 'muted'), margin: `0 ${cssVar('spacing', '4')}` }} />
          <ToolbarButton 
            label="Bullet List" 
            onClick={() => handleFormat('insertUnorderedList')} 
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            } 
          />
        </div>
        
        <div 
          ref={editorRef}
          contentEditable
          style={editorAreaStyle}
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          dangerouslySetInnerHTML={value ? { __html: value } : undefined}
          data-placeholder={placeholder}
        />
        
        {/* Basic placeholder styling approach using css injection for simplicity in this inline example */}
        <style dangerouslySetInnerHTML={{__html: `
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: ${cssVar('semantic', 'foreground', 'muted')};
            cursor: text;
          }
        `}} />
      </div>
    );
  }
);
RichTextEditor.displayName = 'RichTextEditor';
