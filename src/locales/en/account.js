// Account pages (Settings / Plans / Admin) — English editorial content.
// Imported directly by the respective components.
export default {
  settings: {
    title: 'Settings',
    profileSaved: 'Profile updated.',
    passwordSaved: 'Password updated.',
    errorShortPassword: 'The new password must be at least 8 characters.',
    noSubscription: 'No subscription to manage.',

    accountTitle: 'Account',
    email: 'Email',
    role: 'Role',
    name: 'Name',
    saveProfile: 'Save profile',

    planTitle: 'Plan',
    currentPlan: 'Current plan',
    seePlans: 'See the plans',
    manageBilling: 'Manage subscription',

    changePasswordTitle: 'Change password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    newPasswordOpt: '(min. 8)',
    updatePassword: 'Update password',

    logout: 'Sign out',
  },

  plans: {
    title: 'Plans',
    subtitle: 'Start free. Upgrade to a higher plan for higher limits and advanced features.',
    loadError: 'Could not load the plans.',
    checkoutError: 'Could not start the checkout.',
    loading: 'Loading plans…',
    empty: 'No plans available at the moment.',
    free: 'Free',
    contactSales: 'On request',
    perMonth: (price) => `€${price}/month`,
    current: 'Current plan',
    busy: 'Please wait…',
    startFree: 'Start free',
    upgradeTo: (name) => `Upgrade to ${name}`,
    disclaimer: 'Informational tool — not legal advice.',
  },

  admin: {
    title: 'User administration',
    search: 'Search by email…',
    loading: 'Loading…',
    colEmail: 'Email',
    colRole: 'Role',
    colPlan: 'Plan',
    colActive: 'Active',
    deactivate: 'Deactivate',
    activate: 'Activate',
  },
}
