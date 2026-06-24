import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { SectionMessage } from '../components/SectionMessage';

// ─── FormRow ────────────────────────────────────────────────────────────────

export interface FormRowProps {
  /** Label text for the form field. */
  label: string;
  /** The `id` of the associated form control (populates htmlFor). */
  htmlFor?: string;
  /** Marks the field as required — appends a visual indicator. */
  required?: boolean;
  /** Inline error message; also sets aria-describedby on children via context. */
  error?: string;
  /** Hint / helper text shown below the control. */
  hint?: string;
  children: React.ReactNode;
}

const FormRowDescContext = React.createContext<string | undefined>(undefined);

/** Exposes the aria-describedby id so children can self-apply it. */
export function useFormRowDescId(): string | undefined {
  return React.useContext(FormRowDescContext);
}

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ label, htmlFor, required, error, hint, children, style, ...props }, ref) => {
    const descId = React.useId();
    const hasDesc = Boolean(error || hint);

    const rowStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      width: '100%',
      ...style,
    };

    const labelStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '4'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

    const requiredStyles: React.CSSProperties = {
      color: cssVar('semantic', 'error', 'base'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
    };

    const descStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'foreground', 'muted'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

    return (
      <FormRowDescContext.Provider value={hasDesc ? descId : undefined}>
        <div ref={ref} style={rowStyles} {...props}>
          <label htmlFor={htmlFor} style={labelStyles}>
            {label}
            {required && (
              <span style={requiredStyles} aria-hidden="true">*</span>
            )}
          </label>
          {/* Clone children to inject aria-describedby + aria-invalid when error */}
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child) || !hasDesc) return child;
            const extraProps: Record<string, unknown> = {
              'aria-describedby': descId,
            };
            if (error) {
              extraProps['aria-invalid'] = true;
            }
            return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, extraProps);
          })}
          {hasDesc && (
            <span id={descId} style={descStyles} role={error ? 'alert' : undefined}>
              {error || hint}
            </span>
          )}
        </div>
      </FormRowDescContext.Provider>
    );
  }
);

FormRow.displayName = 'FormRow';

// Alias for convenience — same component.
export const FormField = FormRow;

// ─── FormSection ────────────────────────────────────────────────────────────

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection = React.forwardRef<HTMLFieldSetElement, FormSectionProps & React.FieldsetHTMLAttributes<HTMLFieldSetElement>>(
  ({ title, description, children, style, ...props }, ref) => {
    const sectionStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '16'),
      border: 'none',
      margin: 0,
      padding: 0,
      width: '100%',
      ...style,
    };

    const legendWrapStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      marginBottom: cssVar('spacing', '8'),
    };

    return (
      <fieldset ref={ref} style={sectionStyles} {...props}>
        {(title || description) && (
          <legend style={{ display: 'contents' }}>
            <div style={legendWrapStyles}>
              {title && (
                <Text variant="h3" as="span">
                  {title}
                </Text>
              )}
              {description && (
                <Text variant="meta" color="muted" as="span">
                  {description}
                </Text>
              )}
            </div>
          </legend>
        )}
        {children}
      </fieldset>
    );
  }
);

FormSection.displayName = 'FormSection';

// ─── FormLayout ─────────────────────────────────────────────────────────────

export interface FormLayoutProps {
  /** Optional form heading. */
  title?: string;
  /** Optional subtitle / description rendered below the title. */
  description?: string;
  /** Called with the native submit event. preventDefault is called automatically. */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Label for the primary submit button. @default "저장" */
  submitLabel?: string;
  /** Label for the optional cancel button. */
  cancelLabel?: string;
  /** Called when the cancel button is clicked. */
  onCancel?: () => void;
  /** Puts the submit button into a loading/disabled state. */
  loading?: boolean;
  /** If provided, renders a SectionMessage with variant="error" at the top of the form. */
  error?: string;
  children?: React.ReactNode;
}

export const FormLayout = React.forwardRef<HTMLFormElement, FormLayoutProps & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>>(
  (
    {
      title,
      description,
      onSubmit,
      submitLabel = '저장',
      cancelLabel,
      onCancel,
      loading = false,
      error,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(e);
    };

    const formStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '24'),
      width: '100%',
      maxWidth: '560px',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const headerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '6'),
    };

    const actionsStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '12'),
      justifyContent: 'flex-end',
      paddingTop: cssVar('spacing', '8'),
      borderTop: `1px solid ${cssVar('semantic', 'border', 'base')}`,
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} noValidate style={formStyles} {...props}>
        {(title || description) && (
          <header style={headerStyles}>
            {title && <Text variant="h2">{title}</Text>}
            {description && (
              <Text variant="body" color="muted">
                {description}
              </Text>
            )}
          </header>
        )}

        {error && (
          <SectionMessage
            variant="error"
            message={error}
            aria-live="polite"
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: cssVar('spacing', '20'),
          }}
        >
          {children}
        </div>

        <footer style={actionsStyles}>
          {cancelLabel && onCancel && (
            <Button
              type="button"
              variant="outline"
              color="neutral"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" variant="solid" color="primary" loading={loading}>
            {submitLabel}
          </Button>
        </footer>
      </form>
    );
  }
);

FormLayout.displayName = 'FormLayout';
