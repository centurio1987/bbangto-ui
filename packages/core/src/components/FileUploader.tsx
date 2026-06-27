import React, { useState, useRef } from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from './Text';
import { ProgressIndicator } from './ProgressIndicator';
import { Button } from './Button';
import { Spinner } from '../motion/Spinner';

export type FileUploaderVariant = 'default' | 'compact' | 'avatar';

export interface FileUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onDrop'> {
  onFilesSelected?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  uploadProgress?: Record<string, number>; // filename -> progress (0-100)
  /** Prevents all interaction and dims the dropzone. */
  disabled?: boolean;
  /** Shows an uploading overlay — use while files are being sent to a server. */
  loading?: boolean;
  /**
   * Layout variant.
   * - `'default'` (original): full drag-and-drop dropzone with cloud icon.
   * - `'compact'`: condensed inline layout with a small "Choose file" button.
   * - `'avatar'`: round media slot — the avatar itself is the upload target.
   *   The dashed rectangular dropzone chrome is removed and replaced by a
   *   circular, thin-bordered slot filled by the chosen image (hover dims it).
   */
  variant?: FileUploaderVariant;
  /** Error message injected from outside (e.g. server validation). */
  externalError?: string;
}

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      onFilesSelected,
      multiple = true,
      accept,
      maxSize,
      uploadProgress = {},
      disabled = false,
      loading = false,
      variant = 'default',
      externalError,
      style,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [internalError, setInternalError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isInteractionDisabled = disabled || loading;

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!isInteractionDisabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const processFiles = (files: FileList | null) => {
      setInternalError(null);
      if (!files || files.length === 0) return;

      const validFiles: File[] = [];
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        if (maxSize && file.size > maxSize) {
          setInternalError(`File ${file.name} exceeds max size of ${Math.round(maxSize / 1024 / 1024)}MB`);
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
      if (!isInteractionDisabled) processFiles(e.dataTransfer.files);
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

    const handleZoneClick = () => {
      if (!isInteractionDisabled) fileInputRef.current?.click();
    };

    // Keyboard parity for non-native click targets (keeps the dropzone reachable
    // and operable without a pointer — required by the a11y contract).
    const handleZoneKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleZoneClick();
      }
    };

    // ── Shared hidden input ────────────────────────────────────────
    const hiddenInput = (
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple={multiple}
        accept={accept}
        style={{ display: 'none' }}
      />
    );

    // ── Variant: avatar ───────────────────────────────────────────
    // The round media slot IS the upload target. There is no dashed
    // rectangular dropzone here — the circular, thin-solid-bordered slot is
    // filled by the chosen image and dims on hover. All chrome uses tokens.
    if (variant === 'avatar') {
      const previewFile = selectedFiles[0];
      const previewUrl = previewFile ? URL.createObjectURL(previewFile) : null;
      const avatarSize = cssVar('spacing', '64');

      const avatarTargetStyle: React.CSSProperties = {
        position: 'relative',
        boxSizing: 'border-box',
        width: avatarSize,
        height: avatarSize,
        flexShrink: 0,
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // Circular slot — solid (not dashed) thin border distinguishes this
        // avatar-as-target treatment from the rectangular dropzone variants.
        borderRadius: cssVar('radius', 'full'),
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isDragging ? cssVar('semantic', 'border', 'focus') : cssVar('semantic', 'border', 'base'),
        backgroundColor: disabled
          ? cssVar('semantic', 'disabled', 'background')
          : cssVar('semantic', 'background', 'sunken'),
        backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: cssVar('semantic', 'foreground', 'muted'),
        cursor: isInteractionDisabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        ...style,
      };

      const displayError = internalError ?? externalError ?? null;

      return (
        <div
          data-bbangto-file-upload-variant={variant}
          style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '8'), alignItems: 'flex-start' }}
        >
          <div
            ref={ref}
            data-testid="file-uploader-dropzone"
            role="button"
            tabIndex={isInteractionDisabled ? -1 : 0}
            aria-label={previewFile ? `Change avatar image (${previewFile.name})` : 'Upload avatar image'}
            aria-disabled={isInteractionDisabled || undefined}
            style={avatarTargetStyle}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleZoneClick}
            onKeyDown={handleZoneKeyDown}
            onMouseEnter={(e) => {
              if (!isInteractionDisabled) e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              if (!isInteractionDisabled) e.currentTarget.style.opacity = '1';
            }}
            {...props}
          >
            {hiddenInput}
            {!previewFile && (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDragging ? cssVar('semantic', 'border', 'focus') : cssVar('semantic', 'foreground', 'muted')}
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"></path>
              </svg>
            )}

            {loading && (
              <div
                aria-live="polite"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: cssVar('radius', 'full'),
                  backgroundColor: cssVar('semantic', 'background', 'sunken'),
                  opacity: 0.92,
                }}
              >
                <Spinner size={20} color={cssVar('semantic', 'primary', 'base')} />
              </div>
            )}
          </div>

          {previewFile && (
            <Text variant="meta" color="muted" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: avatarSize }}>
              {previewFile.name}
            </Text>
          )}

          {displayError && (
            <Text variant="meta" color="error">
              {displayError}
            </Text>
          )}
        </div>
      );
    }

    // ── Variant: compact ──────────────────────────────────────────
    if (variant === 'compact') {
      const compactZoneStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: cssVar('spacing', '12'),
        padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
        border: `1px dashed ${isDragging ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'muted')}`,
        backgroundColor: isDragging
          ? cssVar('semantic', 'primary', 'subtle')
          : disabled
          ? cssVar('semantic', 'disabled', 'background')
          : cssVar('semantic', 'background', 'sunken'),
        borderRadius: cssVar('radius', 'md'),
        cursor: isInteractionDisabled ? 'not-allowed' : 'default',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        ...style,
      };

      return (
        <div data-bbangto-file-upload-variant={variant} style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '8') }}>
          <div
            ref={ref}
            data-testid="file-uploader-dropzone"
            style={compactZoneStyle}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            {...props}
          >
            {hiddenInput}
            <Button
              variant="outline"
              size="sm"
              disabled={isInteractionDisabled}
              onClick={handleZoneClick}
              type="button"
            >
              Choose file{multiple ? 's' : ''}
            </Button>
            <Text variant="meta" color="muted">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
                : accept
                ? `${accept}${maxSize ? ` · Max ${Math.round(maxSize / 1024 / 1024)}MB` : ''}`
                : 'Drag & drop or choose a file'}
            </Text>
          </div>

          {(internalError || externalError) && (
            <Text variant="meta" color="error">
              {internalError ?? externalError}
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
                    <Text variant="meta" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </Text>
                    {!disabled && (
                      <Button
                        variant="ghost"
                        size="sm"
                        color="error"
                        onClick={() => removeFile(idx)}
                        style={{ padding: cssVar('spacing', '4') }}
                        type="button"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    )}
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

    // ── Variant: default (original layout, fully preserved) ───────
    const dropzoneStyle: React.CSSProperties = {
      position: 'relative',
      border: `2px dashed ${isDragging ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'muted')}`,
      backgroundColor: isDragging
        ? cssVar('semantic', 'primary', 'subtle')
        : disabled
        ? cssVar('semantic', 'disabled', 'background')
        : cssVar('semantic', 'background', 'sunken'),
      borderRadius: cssVar('radius', 'lg'),
      padding: cssVar('spacing', '40'),
      textAlign: 'center',
      cursor: isInteractionDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    // Loading overlay style (absolutely positioned over the dropzone)
    const overlayStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '12'),
      borderRadius: cssVar('radius', 'lg'),
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      // slight transparency so users can tell something is behind it
      opacity: 0.92,
    };

    // Resolved error to display (internal takes precedence)
    const displayError = internalError ?? externalError ?? null;

    return (
      <div data-bbangto-file-upload-variant={variant} style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '16') }}>
        <div
          ref={ref}
          data-testid="file-uploader-dropzone"
          style={dropzoneStyle}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleZoneClick}
          {...props}
        >
          {hiddenInput}

          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isDragging ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'muted')}
            strokeWidth="1.5"
            style={{ marginBottom: cssVar('spacing', '16') }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <Text
            variant="body"
            style={{
              fontWeight: 'bold',
              color: isDragging ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'base'),
            }}
          >
            {isDragging ? 'Drop files here' : 'Click or drag files to upload'}
          </Text>
          <Text variant="meta" color="muted" style={{ marginTop: cssVar('spacing', '8') }}>
            {accept ? `Accepted files: ${accept}` : 'All files supported'}
            {maxSize ? ` (Max ${Math.round(maxSize / 1024 / 1024)}MB)` : ''}
          </Text>

          {/* Loading overlay */}
          {loading && (
            <div style={overlayStyle} aria-live="polite">
              <Spinner size={32} color={cssVar('semantic', 'primary', 'base')} />
              <Text variant="meta" style={{ color: cssVar('semantic', 'foreground', 'muted') }}>
                Uploading…
              </Text>
            </div>
          )}
        </div>

        {displayError && (
          <Text variant="meta" color="error">
            {displayError}
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: cssVar('spacing', '12'),
                      overflow: 'hidden',
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={cssVar('semantic', 'foreground', 'muted')}
                      strokeWidth="2"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    <Text
                      variant="meta"
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </Text>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    color="error"
                    onClick={() => removeFile(idx)}
                    style={{ padding: cssVar('spacing', '4') }}
                    type="button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
