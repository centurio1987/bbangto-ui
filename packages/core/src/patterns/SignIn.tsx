import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/bbangto-ui-tokens';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Link } from '../components/Link';
import { SectionMessage } from '../components/SectionMessage';
import { Text } from '../components/Text';

/**
 * Page-level layout for the sign-in pattern.
 * - `centered` (default): single centred card column.
 * - `split`: 2-track grid (marketing column | form column) at ≥ lg.
 * - `minimal`: chromeless / borderless form.
 * - `social-first`: social auth buttons above the form with a divider.
 * - `media-backdrop`: the `marketingPanel` (or a default) is promoted to a
 *   full-bleed media layer that fills the root (position:absolute; inset:0;
 *   object-fit:cover). The form floats over it as a centred *frosted* card
 *   composited on a z-stack (backdrop-filter blur, a translucent token-based
 *   surface and a 1px hairline border). Unlike `split` the media is NOT a grid
 *   column — it is a front backdrop and the form is overlaid above it.
 */
export type SignInLayout =
  | 'centered'
  | 'split'
  | 'minimal'
  | 'social-first'
  | 'media-backdrop';

const SIGNIN_ID = 'bbangto-signin';

export interface SignInValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignInProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  onSubmit: (values: SignInValues) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  logo?: React.ReactNode;
  marketingPanel?: React.ReactNode;
  /**
   * Page-level layout for the sign-in pattern.
   * - When omitted, defaults to 'split' if `marketingPanel` is provided, else 'centered'
   *   (preserving historical behavior).
   */
  layout?: SignInLayout;
  /** Social auth buttons rendered above the form in the 'social-first' layout. */
  socialButtons?: React.ReactNode;
  forgotHref?: string;
  signUpHref?: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return '이메일을 입력하세요.';
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value.trim())) return '올바른 이메일 형식을 입력하세요.';
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return '비밀번호를 입력하세요.';
  return undefined;
}

export const SignIn = React.forwardRef<HTMLDivElement, SignInProps>(
  (
    {
      onSubmit,
      loading = false,
      error,
      logo,
      marketingPanel,
      layout,
      socialButtons,
      forgotHref = '#',
      signUpHref = '#',
      style,
      className,
      ...props
    },
    ref
  ) => {
    // Effective layout: explicit prop wins; otherwise preserve historical behavior
    // where passing a marketingPanel implicitly created a split layout.
    const effectiveLayout: SignInLayout =
      layout ?? (marketingPanel ? 'split' : 'centered');
    const isMinimal = effectiveLayout === 'minimal';
    const isSplit = effectiveLayout === 'split';
    const isSocialFirst = effectiveLayout === 'social-first';
    const isMediaBackdrop = effectiveLayout === 'media-backdrop';
    const id = React.useId();
    const emailId = `${id}-email`;
    const passwordId = `${id}-password`;
    const rememberCheckboxId = `${id}-remember`;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false);
    const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
    const [submitted, setSubmitted] = React.useState(false);

    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      const errors: FieldErrors = {};
      if (emailError) errors.email = emailError;
      if (passwordError) errors.password = passwordError;

      setSubmitted(true);
      setFieldErrors(errors);

      if (emailError) {
        emailRef.current?.focus();
        return;
      }
      if (passwordError) {
        passwordRef.current?.focus();
        return;
      }

      await onSubmit({ email: email.trim(), password, remember });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (submitted) {
        setFieldErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
      }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (submitted) {
        setFieldErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
      }
    };

    const formContainerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: isMinimal ? cssVar('spacing', '16') : cssVar('spacing', '24'),
      width: '100%',
      maxWidth: '400px',
      // 'minimal' is borderless / chromeless: no card background, padding or radius.
      padding: isMinimal ? '0' : cssVar('spacing', '32'),
      // 'media-backdrop' floats a frosted card over the full-bleed media: a
      // translucent token-based surface (color-mix keeps the colour tokenised)
      // rather than the opaque base fill of the other layouts.
      backgroundColor: isMinimal
        ? 'transparent'
        : isMediaBackdrop
          ? `color-mix(in srgb, ${cssVar('semantic', 'background', 'base')} 70%, transparent)`
          : cssVar('semantic', 'background', 'base'),
      borderRadius: isMinimal ? '0' : cssVar('radius', 'lg'),
      boxShadow: isMinimal ? 'none' : isMediaBackdrop ? cssVar('shadow', 'lg') : undefined,
      // 1px hairline border for the frosted card; other non-minimal layouts
      // keep the default (undefined) border.
      border: isMinimal
        ? 'none'
        : isMediaBackdrop
          ? `1px solid ${cssVar('semantic', 'border', 'base')}`
          : undefined,
      // Frosted glass: blur whatever media sits behind the card, and lift the
      // card onto the overlay z-layer above the absolutely positioned backdrop.
      ...(isMediaBackdrop
        ? {
            backdropFilter: `blur(${cssVar('spacing', '12')})`,
            WebkitBackdropFilter: `blur(${cssVar('spacing', '12')})`,
            position: 'relative',
            zIndex: 1,
          }
        : null),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

    const socialDividerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '12'),
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    const socialDividerLineStyles: React.CSSProperties = {
      flex: 1,
      height: '1px',
      backgroundColor: cssVar('semantic', 'border', 'muted'),
    };

    const socialFirstBlock = isSocialFirst && socialButtons && (
      <div
        data-bbangto-signin-social="true"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: cssVar('spacing', '12'),
        }}
      >
        {socialButtons}
        <div style={socialDividerStyles} aria-hidden="true">
          <span style={socialDividerLineStyles} />
          <Text variant="meta" color="muted" as="span">
            또는
          </Text>
          <span style={socialDividerLineStyles} />
        </div>
      </div>
    );

    const formStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '16'),
    };

    const footerRowStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: cssVar('spacing', '8'),
    };

    const signUpRowStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '4'),
    };

    const formContent = (
      <div style={formContainerStyles}>
        {logo && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {logo}
          </div>
        )}

        <div>
          <Text variant="h2" style={{ margin: 0 }}>로그인</Text>
          <Text variant="body" color="muted" style={{ marginTop: cssVar('spacing', '4') }}>
            계정에 로그인하세요
          </Text>
        </div>

        {error && (
          <SectionMessage
            variant="error"
            message={error}
            aria-live="polite"
          />
        )}

        {/* social-first: social auth buttons rendered ABOVE the form with a divider. */}
        {socialFirstBlock}

        <form
          onSubmit={handleSubmit}
          noValidate
          style={formStyles}
          aria-label="로그인 폼"
        >
          <div>
            <label
              htmlFor={emailId}
              style={{
                display: 'block',
                marginBottom: cssVar('spacing', '6'),
                fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
                fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
                color: cssVar('semantic', 'foreground', 'base'),
                fontFamily: cssVar('typography', 'fontFamily', 'sans'),
              }}
            >
              이메일
            </label>
            <Input
              ref={emailRef}
              id={emailId}
              type="email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={fieldErrors.email}
              aria-invalid={!!fieldErrors.email || undefined}
              autoComplete="email"
              placeholder="이메일을 입력하세요"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor={passwordId}
              style={{
                display: 'block',
                marginBottom: cssVar('spacing', '6'),
                fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
                fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
                color: cssVar('semantic', 'foreground', 'base'),
                fontFamily: cssVar('typography', 'fontFamily', 'sans'),
              }}
            >
              비밀번호
            </label>
            <Input
              ref={passwordRef}
              id={passwordId}
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              error={fieldErrors.password}
              aria-invalid={!!fieldErrors.password || undefined}
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              disabled={loading}
            />
          </div>

          <div style={footerRowStyles}>
            <Checkbox
              id={rememberCheckboxId}
              label="로그인 상태 유지"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={loading}
            />
            <Link href={forgotHref} size="sm">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={loading}
            aria-label="로그인"
          >
            로그인
          </Button>
        </form>

        {signUpHref && (
          <div style={signUpRowStyles}>
            <Text variant="meta" color="muted" as="span">
              계정이 없으신가요?
            </Text>
            <Link href={signUpHref} size="sm">
              회원가입
            </Link>
          </div>
        )}
      </div>
    );

    // Default marketing panel used by the 'split' layout when none is supplied.
    const defaultMarketingPanel = (
      <div style={{ maxWidth: 480, color: cssVar('semantic', 'foreground', 'base') }}>
        <Text variant="h2" style={{ margin: 0 }}>
          다시 오신 것을 환영합니다
        </Text>
        <Text variant="body" color="muted" style={{ marginTop: cssVar('spacing', '8') }}>
          계정에 로그인하고 모든 기능을 이용하세요.
        </Text>
      </div>
    );

    if (isMediaBackdrop) {
      // Promote the marketing panel (or a default) to a full-bleed backdrop.
      const backdropContent = marketingPanel ?? defaultMarketingPanel;
      return (
        <div
          ref={ref}
          data-bbangto-signin-layout={effectiveLayout}
          className={
            className
              ? `${SIGNIN_ID}-media-backdrop ${className}`
              : `${SIGNIN_ID}-media-backdrop`
          }
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100%',
            padding: cssVar('spacing', '24'),
            boxSizing: 'border-box',
            overflow: 'hidden',
            backgroundColor: cssVar('semantic', 'background', 'sunken'),
            fontFamily: cssVar('typography', 'fontFamily', 'sans'),
            ...style,
          }}
          {...props}
        >
          {/*
            Scoped style: the media node fills the backdrop layer with
            object-fit: cover. object-fit cannot be expressed on the wrapper
            inline, so it is applied to the slotted child here.
          */}
          <style>{`
            .${SIGNIN_ID}-backdrop-media > * {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}</style>

          {/*
            Full-bleed media layer — a front backdrop (NOT a grid column). It is
            absolutely positioned behind the form and marked aria-hidden so the
            decorative backdrop is not announced.
          */}
          <div
            className={`${SIGNIN_ID}-backdrop-media`}
            data-bbangto-signin-backdrop="true"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            {backdropContent}
          </div>

          {/* Frosted form card composited above the backdrop on the z-stack. */}
          {formContent}
        </div>
      );
    }

    if (isSplit) {
      const panelContent = marketingPanel ?? defaultMarketingPanel;
      return (
        <div
          ref={ref}
          data-bbangto-signin-layout={effectiveLayout}
          className={
            className ? `${SIGNIN_ID}-split ${className}` : `${SIGNIN_ID}-split`
          }
          style={{
            // Mobile-first: single column. Desktop 2-col handled by scoped @media below.
            display: 'grid',
            gridTemplateColumns: '1fr',
            minHeight: '100vh',
            width: '100%',
            fontFamily: cssVar('typography', 'fontFamily', 'sans'),
            ...style,
          }}
          {...props}
        >
          {/*
            Scoped responsive style: at ≥ lg breakpoint switch to a two-column
            split (marketing panel + form). @media cannot be expressed inline.
          */}
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${SIGNIN_ID}-split {
                grid-template-columns: 1fr 1fr !important;
              }
            }
          `}</style>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: cssVar('semantic', 'primary', 'subtle'),
              padding: '48px',
            }}
          >
            {panelContent}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px',
              backgroundColor: cssVar('semantic', 'background', 'base'),
            }}
          >
            {formContent}
          </div>
        </div>
      );
    }

    // 'centered' (default), 'minimal', and 'social-first' all render a single
    // centered column. If an explicit non-split layout is paired with a
    // marketingPanel, surface it as a secondary block so no data is lost.
    return (
      <div
        ref={ref}
        data-bbangto-signin-layout={effectiveLayout}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: cssVar('spacing', '24'),
          minHeight: '100vh',
          width: '100%',
          padding: cssVar('spacing', '24'),
          boxSizing: 'border-box',
          backgroundColor: isMinimal
            ? cssVar('semantic', 'background', 'base')
            : cssVar('semantic', 'background', 'sunken'),
          fontFamily: cssVar('typography', 'fontFamily', 'sans'),
          ...style,
        }}
        className={className}
        {...props}
      >
        {marketingPanel && (
          <div
            data-bbangto-signin-secondary-panel="true"
            style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}
          >
            {marketingPanel}
          </div>
        )}
        {formContent}
      </div>
    );
  }
);

SignIn.displayName = 'SignIn';
