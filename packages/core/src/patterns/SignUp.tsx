import React from 'react';
import { cssVar } from '@centurio1987/tokens';
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

export interface SignUpProps {
  /** Called with form values once all fields pass validation. */
  onSubmit: (values: SignUpValues) => void | Promise<void>;
  /** Shows a loading spinner on the submit button and disables form inputs. */
  loading?: boolean;
  /** Server-level error message rendered as a SectionMessage above the form. */
  error?: string;
  /** Optional logo node rendered above the heading. */
  logo?: React.ReactNode;
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
      signInHref = '/sign-in',
      termsHref = '/terms',
      ...props
    },
    ref
  ) => {
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
      padding: `${cssVar('spacing', '24')} ${cssVar('spacing', '16')}`,
      backgroundColor: cssVar('semantic', 'background', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      boxSizing: 'border-box',
    };

    const cardStyles: React.CSSProperties = {
      width: '100%',
      maxWidth: '440px',
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '24'),
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


    return (
      <div style={containerStyles}>
        <div style={cardStyles}>
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
        </div>
      </div>
    );
  }
);

SignUp.displayName = 'SignUp';
