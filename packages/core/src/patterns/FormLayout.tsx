import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
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
        <div ref={ref} data-bbangto-formlayout-row="" style={rowStyles} {...props}>
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

/**
 * Layout axis for the form shell.
 * - `stacked` (default): labels above fields, single column — historical behaviour.
 * - `horizontal`: label column | field column at ≥ lg (stacks on mobile).
 * - `card`: the form wrapped in a bordered, rounded, elevated card with padding.
 * - `sectioned`: child sections separated by dividers / heading rules.
 */
export type FormLayoutLayout = 'stacked' | 'horizontal' | 'card' | 'sectioned';

/** Unique class prefix to scope media-query styles without a CSS Module. */
const FORMLAYOUT_ID = 'bbangto-formlayout';

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
  /**
   * Form shell layout. When omitted, defaults to `stacked` — preserving the
   * historical single-column, label-above-field rendering.
   * @default 'stacked'
   */
  layout?: FormLayoutLayout;
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
      layout = 'stacked',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const effectiveLayout: FormLayoutLayout = layout;
    const isHorizontal = effectiveLayout === 'horizontal';
    const isCard = effectiveLayout === 'card';
    const isSectioned = effectiveLayout === 'sectioned';

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
      // Card layout wraps the whole form in a bordered, elevated surface.
      ...(isCard
        ? {
            border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
            borderStyle: 'solid',
            borderRadius: cssVar('radius', 'lg'),
            boxShadow: cssVar('shadow', 'md'),
            padding: cssVar('spacing', '32'),
            backgroundColor: cssVar('semantic', 'background', 'base'),
          }
        : null),
      ...style,
    };

    const childrenWrapStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '20'),
    };

    // Sectioned: separate top-level children with light dividers so grouped
    // sections read distinctly. Falls back gracefully to a single group when
    // only one child is present.
    const sectionedChildren = React.Children.toArray(children).filter(Boolean);
    const renderSectioned = sectionedChildren.map((child, i) => (
      <React.Fragment key={i}>
        {i > 0 && (
          <hr
            className={`${FORMLAYOUT_ID}-divider`}
            aria-hidden="true"
            style={{
              border: 'none',
              borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
              margin: 0,
              width: '100%',
            }}
          />
        )}
        {child}
      </React.Fragment>
    ));

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
      <form
        ref={ref}
        onSubmit={handleSubmit}
        noValidate
        data-bbangto-formlayout-layout={effectiveLayout}
        style={formStyles}
        {...props}
      >
        {/*
          Horizontal layout: at ≥ lg each FormRow becomes a 2-column grid
          (label | field). FormRow renders its <label> first then the control,
          so a simple grid on the row gives label|field. @media cannot be
          expressed inline, so it lives in a scoped <style> tag.
        */}
        {isHorizontal && (
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${FORMLAYOUT_ID}-children [data-bbangto-formlayout-row] {
                display: grid;
                grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
                align-items: start;
                column-gap: ${cssVar('spacing', '16')};
              }
              .${FORMLAYOUT_ID}-children [data-bbangto-formlayout-row] > label {
                padding-top: ${cssVar('spacing', '8')};
              }
              /* Hint / error span (3rd child) aligns under the field column. */
              .${FORMLAYOUT_ID}-children [data-bbangto-formlayout-row] > span {
                grid-column: 2;
              }
            }
          `}</style>
        )}

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

        <div className={`${FORMLAYOUT_ID}-children`} style={childrenWrapStyles}>
          {isSectioned ? renderSectioned : children}
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
