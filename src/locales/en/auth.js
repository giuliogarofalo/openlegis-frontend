// Authentication pages (Login / Register / Forgot password / Reset password / AuthCard) —
// English editorial content. Imported directly by the respective components.
export default {
  // AuthCard (shared shell).
  card: {
    disclaimer: 'Informational tool — not legal advice.',
  },

  login: {
    title: 'Sign in',
    subtitle: 'Welcome back. Sign in for higher limits and saved history.',
    footerPre: "Don't have an account? ",
    footerLink: 'Create account',
    footerForgot: 'Forgot password?',
    email: 'Email',
    password: 'Password',
    submit: 'Sign in',
    submitting: 'Signing in…',
    errorDefault: 'Sign-in failed',
  },

  register: {
    title: 'Create an account',
    subtitle: 'Free. Higher limits, saved history, and access to the plans.',
    footerPre: 'Already have an account? ',
    footerLink: 'Sign in',
    name: 'Name',
    nameOpt: '(optional)',
    email: 'Email',
    password: 'Password',
    passwordOpt: '(min. 8 characters)',
    submit: 'Create account',
    submitting: 'Creating…',
    errorShortPassword: 'Password must be at least 8 characters.',
    errorDefault: 'Registration failed',
  },

  forgot: {
    title: 'Forgot password',
    subtitle: 'Enter your email: if the account exists, you will receive instructions.',
    footerLink: 'Back to sign in',
    email: 'Email',
    submit: 'Send reset link',
    submitting: 'Sending…',
    done: 'If the email is registered, you will receive a link to reset your password. (Email delivery is coming soon: for now, contact the administrator if you do not receive it.)',
  },

  reset: {
    title: 'Reset your password',
    subtitle: 'Choose a new password for your account.',
    footerLink: 'Back to sign in',
    newPassword: 'New password',
    newPasswordOpt: '(min. 8 characters)',
    submit: 'Reset password',
    submitting: 'Saving…',
    missingToken: 'Invalid link: the reset token is missing.',
    success: 'Password updated. Taking you to sign in…',
    errorShortPassword: 'Password must be at least 8 characters.',
    errorDefault: 'Invalid or expired token.',
  },
}
