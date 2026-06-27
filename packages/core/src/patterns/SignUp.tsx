import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Link } from '../components/Link';
import { SectionMessage } from '../components/SectionMessage';
import { Text } from '../components/Text';

export interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

/**
 * Layout axis for the SignUp pattern. Intentionally MIRRORS `SignInLayout`
 * for cross-pattern API symmetry (auth surfaces share the same vocabulary).
 * - `centered` (default): single, centred form card — the historical layout.
 * - `split`: 2-column (marketing panel | form) at ≥ lg via a scoped `<style>`.
 * - `minimal`: borderless, compact form with no surrounding card chrome.
 * - `social-first`: social-provider buttons rendered ABOVE the credential form.
 * - `frosted`: glass-chrome card — the root fills with a token-composited
 *   gradient backdrop and the form card floats above it on a translucent,
 *   `backdrop-filter: blur` glass panel with a hairline translucent border. The
 *   sense of float comes from the blur (NOT a `box-shadow` elevation), so this
 *   is a chrome treatment that lives outside the usual border/fill/elevation
 *   vocabulary used by the other layouts.
 */
export type SignUpLayout =
  | 'centered'
  | 'split'
  | 'minimal'
  | 'social-first'
  | 'frosted';

export interface SignUpProps {
  /** Called with form values once all fields pass validation. */
  onSubmit: (values: SignUpValues) => void | Promise<void>;
  /** Shows a loading spinner on the submit button and disables form inputs. */
  loading?: boolean;
  /** Server-level error message rendered as a SectionMessage above the form. */
  error?: string;
  /** Optional logo node rendered above the heading. */
  logo?: React.ReactNode;
  /**
   * Layout variant. When omitted, the effective layout is derived from
   * `marketingPanel` (split when a panel is present, otherwise centered) —
   * mirroring `SignIn`'s auto-split behaviour for API symmetry. An explicit
   * `centered` together with a `marketingPanel` keeps the centered form AND
   * renders the panel as a secondary block (no data loss).
   */
  layout?: SignUpLayout;
  /**
   * Optional marketing/brand panel node. Added for symmetry with `SignIn`.
   * Drives the auto-`split` default and fills the second column in `split`.
   */
  marketingPanel?: React.ReactNode;
  /** href for the "Already have an account? Sign in" link. */
  signInHref?: string;
  /** href for the terms-of-service link in the checkbox label. */
  termsHref?: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

function validate(values: SignUpValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = '이름을 입력해 주세요.';
  }
  if (!values.email.trim()) {
    errors.email = '이메일을 입력해 주세요.';
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!values.password) {
    errors.password = '비밀번호를 입력해 주세요.';
  } else if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`;
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = '비밀번호 확인을 입력해 주세요.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }
  if (!values.acceptTerms) {
    errors.acceptTerms = '이용약관에 동의해 주세요.';
  }

  return errors;
}

export const SignUp = React.forwardRef<HTMLFormElement, SignUpProps>(
  (
    {
      onSubmit,
      loading = false,
      error,
      logo,
      layout,
      marketingPanel,
      signInHref = '/sign-in',
      termsHref = '/terms',
      ...props
    },
    ref
  ) => {
    // Effective layout: explicit prop wins; otherwise derive from the marketing
    // panel (split when present, centered otherwise) — mirroring SignIn so the
    // two auth patterns share one API. Explicit `centered` + `marketingPanel`
    // keeps the centered form and renders the panel as a secondary block below.
    const effectiveLayout: SignUpLayout =
      layout ?? (marketingPanel ? 'split' : 'centered');
    const isSplit = effectiveLayout === 'split';
    const isMinimal = effectiveLayout === 'minimal';
    const isSocialFirst = effectiveLayout === 'social-first';
    const isFrosted = effectiveLayout === 'frosted';

    const nameId = React.useId();
    const emailId = React.useId();
    const passwordId = React.useId();
    const confirmPasswordId = React.useId();
    const acceptTermsId = React.useId();
    const acceptTermsErrorId = React.useId();
    const serverErrorId = React.useId();

    const [values, setValues] = React.useState<SignUpValues>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    });

    const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
    const [submitted, setSubmitted] = React.useState(false);

    // Refs for focus management
    const nameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
    const acceptTermsRef = React.useRef<HTMLInputElement>(null);

    const handleFieldChange = (field: keyof Omit<SignUpValues, 'acceptTerms'>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = { ...values, [field]: e.target.value };
        setValues(newValues);
        // Re-validate only if the user has already attempted a submit
        if (submitted) {
          setFieldErrors(validate(newValues));
        }
      };

    const handleAcceptTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values, acceptTerms: e.target.checked };
      setValues(newValues);
      if (submitted) {
        setFieldErrors(validate(newValues));
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(true);

      const errors = validate(values);
      setFieldErrors(errors);

      const errorKeys = Object.keys(errors) as Array<keyof FieldErrors>;
      if (errorKeys.length > 0) {
        // Focus the first invalid field
        const firstError = errorKeys[0];
        const focusMap: Record<keyof FieldErrors, { current: HTMLInputElement | null }> = {
          name: nameRef,
          email: emailRef,
          password: passwordRef,
          confirmPassword: confirmPasswordRef,
          acceptTerms: acceptTermsRef,
        };
        focusMap[firstError]?.current?.focus();
        return;
      }

      await onSubmit(values);
    };

    const labelStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: isMinimal
        ? `${cssVar('spacing', '16')} ${cssVar('spacing', '16')}`
        : `${cssVar('spacing', '24')} ${cssVar('spacing', '16')}`,
      backgroundColor: cssVar('semantic', 'background', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      boxSizing: 'border-box',
      // Frosted: paint a token-composited gradient backdrop so the glass card
      // has something to float above. No gradient token exists, so the stops
      // are synthesized inline — every colour is a cssVar() reference.
      ...(isFrosted
        ? {
            backgroundImage: `linear-gradient(135deg, ${cssVar('semantic', 'primary', 'subtle')} 0%, ${cssVar('semantic', 'background', 'base')} 50%, ${cssVar('semantic', 'primary', 'base')} 100%)`,
          }
        : null),
    };

    const cardStyles: React.CSSProperties = {
      width: '100%',
      // Minimal trims the card to a tighter measure; others keep the wide form.
      maxWidth: isMinimal ? '380px' : '440px',
      display: 'flex',
      flexDirection: 'column',
      gap: isMinimal ? cssVar('spacing', '16') : cssVar('spacing', '24'),
      // Frosted: translucent glass panel. The card reads as floating purely via
      // the backdrop blur — NOT a box-shadow elevation. Background and hairline
      // border are composited from cssVar() colours via color-mix (no glass
      // token exists); blur radius and corner radius are token lengths.
      ...(isFrosted
        ? {
            backgroundColor: `color-mix(in srgb, ${cssVar('semantic', 'background', 'base')} 62%, transparent)`,
            backdropFilter: `blur(${cssVar('spacing', '12')})`,
            WebkitBackdropFilter: `blur(${cssVar('spacing', '12')})`,
            border: `1px solid color-mix(in srgb, ${cssVar('semantic', 'border', 'base')} 45%, transparent)`,
            borderRadius: cssVar('radius', 'xl'),
            padding: cssVar('spacing', '32'),
            boxShadow: 'none',
          }
        : null),
    };

    const headerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: cssVar('spacing', '12'),
    };

    const formStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '16'),
    };

    const footerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: cssVar('spacing', '6'),
    };

    // Unique class prefix to scope the responsive split @media rule without a
    // CSS Module (Hero-style scoped <style>). Stable per instance is fine.
    const SIGNUP_ID = 'bbangto-signup';

    // Social-provider buttons rendered ABOVE the form in the `social-first`
    // layout. Self-contained (the pattern owns no social handlers yet) — these
    // are visual provider affordances with a divider separating them from the
    // credential form. They do NOT submit the form (type="button").
    const socialBlock = isSocialFirst ? (
      <div
        data-bbangto-signup-social
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: cssVar('spacing', '12'),
        }}
      >
        <Button type="button" variant="outline" color="neutral" fullWidth disabled={loading}>
          Google로 계속하기
        </Button>
        <Button type="button" variant="outline" color="neutral" fullWidth disabled={loading}>
          GitHub로 계속하기
        </Button>
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: cssVar('spacing', '12'),
            color: cssVar('semantic', 'foreground', 'muted'),
          }}
        >
          <span style={{ flex: 1, height: '1px', backgroundColor: cssVar('semantic', 'border', 'muted') }} />
          <Text variant="meta" color="muted" as="span">또는</Text>
          <span style={{ flex: 1, height: '1px', backgroundColor: cssVar('semantic', 'border', 'muted') }} />
        </div>
      </div>
    ) : null;

    return (
      <div
        style={containerStyles}
        data-bbangto-signup-layout={effectiveLayout}
      >
        {/*
          Scoped responsive style: on desktop (≥ lg) the split layout becomes a
          2-column grid (panel | form). @media cannot live in React's style prop,
          so we emit a Hero-style scoped <style> only when a split is rendered.
        */}
        {isSplit && marketingPanel && (
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${SIGNUP_ID}-split {
                grid-template-columns: 1fr 1fr !important;
              }
            }
          `}</style>
        )}

        <div
          className={isSplit && marketingPanel ? `${SIGNUP_ID}-split` : undefined}
          style={
            isSplit && marketingPanel
              ? {
                  width: '100%',
                  maxWidth: '960px',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: cssVar('spacing', '40'),
                  alignItems: 'center',
                }
              : { display: 'contents' }
          }
        >
          {/* Marketing panel column — only in split (the second grid track). */}
          {isSplit && marketingPanel && (
            <div data-bbangto-signup-panel>{marketingPanel}</div>
          )}

          <div
            className={isFrosted ? `${SIGNUP_ID}-frosted` : undefined}
            style={cardStyles}
          >
            {/* Header */}
            <div style={headerStyles}>
              {logo && <div>{logo}</div>}
              <Text variant="h2">회원가입</Text>
              <Text variant="body" color="muted" as="p" style={{ textAlign: 'center', margin: 0 }}>
                계정을 만들어 시작하세요.
              </Text>
            </div>

            {/* Server error */}
            {error && (
              <SectionMessage
                id={serverErrorId}
                variant="error"
                message={error}
                aria-live="polite"
              />
            )}

            {/* Social-first: provider buttons precede the credential form. */}
            {socialBlock}

            {/* Form */}
            <form
              ref={ref}
              onSubmit={handleSubmit}
              noValidate
              aria-describedby={error ? serverErrorId : undefined}
              style={formStyles}
              {...props}
            >
            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '4') }}>
              <label htmlFor={nameId} style={labelStyles}>이름</label>
              <Input
                ref={nameRef}
                id={nameId}
                type="text"
                autoComplete="name"
                placeholder="홍길동"
                value={values.name}
                onChange={handleFieldChange('name')}
                error={fieldErrors.name}
                aria-invalid={fieldErrors.name ? true : undefined}
                disabled={loading}
                fullWidth
              />
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '4') }}>
              <label htmlFor={emailId} style={labelStyles}>이메일</label>
              <Input
                ref={emailRef}
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                value={values.email}
                onChange={handleFieldChange('email')}
                error={fieldErrors.email}
                aria-invalid={fieldErrors.email ? true : undefined}
                disabled={loading}
                fullWidth
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '4') }}>
              <label htmlFor={passwordId} style={labelStyles}>비밀번호</label>
              <Input
                ref={passwordRef}
                id={passwordId}
                type="password"
                autoComplete="new-password"
                placeholder="8자 이상 입력"
                value={values.password}
                onChange={handleFieldChange('password')}
                error={fieldErrors.password}
                aria-invalid={fieldErrors.password ? true : undefined}
                disabled={loading}
                fullWidth
              />
            </div>

            {/* Confirm Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '4') }}>
              <label htmlFor={confirmPasswordId} style={labelStyles}>비밀번호 확인</label>
              <Input
                ref={confirmPasswordRef}
                id={confirmPasswordId}
                type="password"
                autoComplete="new-password"
                placeholder="비밀번호를 다시 입력"
                value={values.confirmPassword}
                onChange={handleFieldChange('confirmPassword')}
                error={fieldErrors.confirmPassword}
                aria-invalid={fieldErrors.confirmPassword ? true : undefined}
                disabled={loading}
                fullWidth
              />
            </div>

            {/* Accept Terms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '4') }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: cssVar('spacing', '8') }}>
                <Checkbox
                  ref={acceptTermsRef}
                  id={acceptTermsId}
                  checked={values.acceptTerms}
                  onChange={handleAcceptTermsChange}
                  error={!!fieldErrors.acceptTerms}
                  disabled={loading}
                  aria-invalid={fieldErrors.acceptTerms ? true : undefined}
                  aria-describedby={fieldErrors.acceptTerms ? acceptTermsErrorId : undefined}
                />
                <label
                  htmlFor={acceptTermsId}
                  style={{
                    ...labelStyles,
                    fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: cssVar('spacing', '4'),
                  }}
                >
                  <Link href={termsHref} variant="inline" size="sm">
                    이용약관
                  </Link>
                  에 동의합니다.
                </label>
              </div>
              {fieldErrors.acceptTerms && (
                <Text
                  id={acceptTermsErrorId}
                  variant="meta"
                  color="error"
                  as="span"
                  role="alert"
                >
                  {fieldErrors.acceptTerms}
                </Text>
              )}
            </div>

              {/* Submit */}
              <Button
                type="submit"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                회원가입
              </Button>
            </form>

            {/* Footer sign-in link */}
            <div style={footerStyles}>
              <Text variant="meta" color="muted" as="span">
                이미 계정이 있으신가요?
              </Text>
              <Link href={signInHref} size="sm">
                로그인
              </Link>
            </div>

            {/*
              Conflict rule (mirrors SignIn): explicit `centered` + marketingPanel
              keeps the centered form and renders the panel as a secondary block
              below — no data loss, no 2-column split.
            */}
            {!isSplit && marketingPanel && (
              <div data-bbangto-signup-panel style={{ marginTop: cssVar('spacing', '8') }}>
                {marketingPanel}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

SignUp.displayName = 'SignUp';
