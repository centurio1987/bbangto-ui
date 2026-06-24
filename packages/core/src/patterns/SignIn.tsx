import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Link } from '../components/Link';
import { SectionMessage } from '../components/SectionMessage';
import { Text } from '../components/Text';

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
      forgotHref = '#',
      signUpHref = '#',
      style,
      className,
      ...props
    },
    ref
  ) => {
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
      gap: cssVar('spacing', '24'),
      width: '100%',
      maxWidth: '400px',
      padding: cssVar('spacing', '32'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      borderRadius: cssVar('radius', 'lg'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

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

    if (marketingPanel) {
      return (
        <div
          ref={ref}
          style={{
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            fontFamily: cssVar('typography', 'fontFamily', 'sans'),
            ...style,
          }}
          className={className}
          {...props}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: cssVar('semantic', 'primary', 'subtle'),
              padding: '48px',
            }}
          >
            {marketingPanel}
          </div>
          <div
            style={{
              flex: 1,
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

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: cssVar('semantic', 'background', 'sunken'),
          fontFamily: cssVar('typography', 'fontFamily', 'sans'),
          ...style,
        }}
        className={className}
        {...props}
      >
        {formContent}
      </div>
    );
  }
);

SignIn.displayName = 'SignIn';
