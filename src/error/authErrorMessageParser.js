export const authErrorMessageParser = errorCode => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'User not found. Please check your email.';
    case 'auth/wrong-password':
      return 'Invalid password. Please try again.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please enter a valid email.';
    // Add more cases as needed based on Firebase authentication error codes
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};
