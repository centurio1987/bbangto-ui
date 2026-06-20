import React, { useState, useRef } from 'react';
import { cssVar } from '@bbangto-ui/tokens';
import { Text } from './Text';
import { ProgressIndicator } from './ProgressIndicator';
import { Button } from './Button';

export interface FileUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onDrop'> {
  onFilesSelected?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  uploadProgress?: Record<string, number>; // filename -> progress (0-100)
}

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ onFilesSelected, multiple = true, accept, maxSize, uploadProgress = {}, style, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const processFiles = (files: FileList | null) => {
      setError(null);
      if (!files || files.length === 0) return;

      const validFiles: File[] = [];
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        if (maxSize && file.size > maxSize) {
          setError(`File ${file.name} exceeds max size of ${Math.round(maxSize / 1024 / 1024)}MB`);
          continue;
        }
        validFiles.push(file);
      }

      const filesToKeep = multiple ? [...selectedFiles, ...validFiles] : [validFiles[0]];
      setSelectedFiles(filesToKeep);
      onFilesSelected?.(filesToKeep);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      // Reset input so the same file can be selected again if removed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const removeFile = (indexToRemove: number) => {
      const newFiles = selectedFiles.filter((_, idx) => idx !== indexToRemove);
      setSelectedFiles(newFiles);
      onFilesSelected?.(newFiles);
    };

    const dropzoneStyle: React.CSSProperties = {
      border: `2px dashed ${isDragging ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'muted')}`,
      backgroundColor: isDragging ? cssVar('semantic', 'primary', 'subtle') : cssVar('semantic', 'background', 'sunken'),
      borderRadius: cssVar('radius', 'lg'),
      padding: cssVar('spacing', '40'),
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '16') }}>
        <div
          ref={ref}
          style={dropzoneStyle}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          {...props}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            multiple={multiple}
            accept={accept}
            style={{ display: 'none' }}
          />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={isDragging ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'muted')} strokeWidth="1.5" style={{ marginBottom: cssVar('spacing', '16') }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <Text variant="body" style={{ fontWeight: 'bold', color: isDragging ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'base') }}>
            {isDragging ? 'Drop files here' : 'Click or drag files to upload'}
          </Text>
          <Text variant="meta" color="muted" style={{ marginTop: cssVar('spacing', '8') }}>
            {accept ? `Accepted files: ${accept}` : 'All files supported'}
            {maxSize ? ` (Max ${Math.round(maxSize / 1024 / 1024)}MB)` : ''}
          </Text>
        </div>

        {error && (
          <Text variant="meta" color="error">
            {error}
          </Text>
        )}

        {selectedFiles.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '8') }}>
            {selectedFiles.map((file, idx) => (
              <div 
                key={`${file.name}-${idx}`} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: cssVar('spacing', '8'),
                  padding: cssVar('spacing', '12'), 
                  border: `1px solid ${cssVar('semantic', 'border', 'muted')}`, 
                  borderRadius: cssVar('radius', 'md'),
                  backgroundColor: cssVar('semantic', 'background', 'base'),
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: cssVar('spacing', '12'), overflow: 'hidden' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cssVar('semantic', 'foreground', 'muted')} strokeWidth="2">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    <Text variant="meta" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </Text>
                  </div>
                  <Button variant="ghost" size="sm" color="error" onClick={() => removeFile(idx)} style={{ padding: cssVar('spacing', '4') }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </Button>
                </div>
                {uploadProgress[file.name] !== undefined && (
                  <ProgressIndicator value={uploadProgress[file.name]} showValue />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
FileUploader.displayName = 'FileUploader';
