// Pagine account (Impostazioni / Piani / Admin) — contenuto editoriale italiano.
// Importato direttamente dai rispettivi componenti.
export default {
  settings: {
    title: 'Impostazioni',
    profileSaved: 'Profilo aggiornato.',
    passwordSaved: 'Password aggiornata.',
    errorShortPassword: 'La nuova password deve avere almeno 8 caratteri.',
    noSubscription: 'Nessun abbonamento da gestire.',

    accountTitle: 'Account',
    email: 'Email',
    role: 'Ruolo',
    name: 'Nome',
    saveProfile: 'Salva profilo',

    planTitle: 'Piano',
    currentPlan: 'Piano attuale',
    seePlans: 'Vedi i piani',
    manageBilling: 'Gestisci abbonamento',

    changePasswordTitle: 'Cambia password',
    currentPassword: 'Password attuale',
    newPassword: 'Nuova password',
    newPasswordOpt: '(min. 8)',
    updatePassword: 'Aggiorna password',

    logout: 'Esci',
  },

  plans: {
    title: 'Piani',
    subtitle: 'Inizia gratis. Passa a un piano superiore per limiti più alti e funzioni avanzate.',
    loadError: 'Impossibile caricare i piani.',
    checkoutError: 'Impossibile avviare il checkout.',
    loading: 'Caricamento piani…',
    empty: 'Nessun piano disponibile al momento.',
    free: 'Gratis',
    contactSales: 'Su richiesta',
    perMonth: (price) => `€${price}/mese`,
    current: 'Piano attuale',
    busy: 'Attendi…',
    startFree: 'Inizia gratis',
    upgradeTo: (name) => `Passa a ${name}`,
    disclaimer: 'Strumento informativo — non è consulenza legale.',
  },

  admin: {
    title: 'Amministrazione utenti',
    search: 'Cerca per email…',
    loading: 'Caricamento…',
    colEmail: 'Email',
    colRole: 'Ruolo',
    colPlan: 'Piano',
    colActive: 'Attivo',
    deactivate: 'Disattiva',
    activate: 'Attiva',
  },
}
