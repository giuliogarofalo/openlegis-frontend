// Pagine di autenticazione (Login / Registrati / PasswordDimenticata / ResetPassword / AuthCard) —
// contenuto editoriale italiano. Importato direttamente dai rispettivi componenti.
export default {
  // AuthCard (shell condivisa).
  card: {
    disclaimer: 'Strumento informativo — non è consulenza legale.',
  },

  login: {
    title: 'Accedi',
    subtitle: 'Bentornato. Accedi per limiti più alti e cronologia salvata.',
    footerPre: 'Non hai un account? ',
    footerLink: 'Registrati',
    footerForgot: 'Password dimenticata?',
    email: 'Email',
    password: 'Password',
    submit: 'Accedi',
    submitting: 'Accesso…',
    errorDefault: 'Accesso non riuscito',
  },

  register: {
    title: 'Crea un account',
    subtitle: 'Gratis. Limiti più alti, cronologia salvata, e accesso ai piani.',
    footerPre: 'Hai già un account? ',
    footerLink: 'Accedi',
    name: 'Nome',
    nameOpt: '(facoltativo)',
    email: 'Email',
    password: 'Password',
    passwordOpt: '(min. 8 caratteri)',
    submit: 'Registrati',
    submitting: 'Creazione…',
    errorShortPassword: 'La password deve avere almeno 8 caratteri.',
    errorDefault: 'Registrazione non riuscita',
  },

  forgot: {
    title: 'Password dimenticata',
    subtitle: "Inserisci la tua email: se l'account esiste, riceverai le istruzioni.",
    footerLink: "Torna all'accesso",
    email: 'Email',
    submit: 'Invia link di reset',
    submitting: 'Invio…',
    done: "Se l'email è registrata, riceverai un link per reimpostare la password. (L'invio email è in arrivo: per ora contatta l'amministratore se non lo ricevi.)",
  },

  reset: {
    title: 'Reimposta la password',
    subtitle: 'Scegli una nuova password per il tuo account.',
    footerLink: "Torna all'accesso",
    newPassword: 'Nuova password',
    newPasswordOpt: '(min. 8 caratteri)',
    submit: 'Reimposta password',
    submitting: 'Salvataggio…',
    missingToken: 'Link non valido: manca il token di reset.',
    success: "Password aggiornata. Ti porto all'accesso…",
    errorShortPassword: 'La password deve avere almeno 8 caratteri.',
    errorDefault: 'Token non valido o scaduto.',
  },
}
