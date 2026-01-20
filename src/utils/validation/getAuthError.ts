export default function getAuthError(code: string, fallback: string): string {
  switch (code) {
    case 'captcha_failed':
      return 'Captcha verification failed, please refresh the page and try again.';
    case 'rate_limit':
      return 'Too many requests, please try again in a few minutes.';
    case 'invalid_credentials':
      return 'Invalid email or password, please try again.';
    case 'email_not_confirmed':
      return 'Email address not confirmed, please check your inbox for a confirmation email.';
    case 'same_password':
      return 'New password must be different to previous password.';
    case 'invalid_credentials':
    case 'user_not_found':
      return 'Your session has expired, please request a new password reset email.';
    default:
      return fallback;
  }
}
