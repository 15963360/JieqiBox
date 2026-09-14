export default {
  // Général
  common: {
    confirm: 'Confirmer',
    cancel: 'Annuler',
    close: 'Fermer',
    save: 'Enregistrer',
    open: 'Ouvrir',
    refresh: 'Actualiser',
    reset: 'Réinitialiser',
    clear: 'Effacer',
    apply: 'Appliquer',
    execute: 'Exécuter',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Info',
    delete: 'Supprimer',
    add: 'Ajouter',
    actions: 'Actions',
    required: 'Ce champ est obligatoire',
  },

  // Barre d'outils supérieure
  toolbar: {
    newGame: 'Nouvelle partie',
    copyFen: 'Copier FEN',
    inputFen: 'Saisir FEN',
    editPosition: 'Éditer la position',
    uciSettings: 'Paramètres UCI',
    analysisParams: "Paramètres d'analyse",
    saveNotation: 'Sauvegarder la partie',
    openNotation: 'Ouvrir une partie',
    interfaceSettings: 'Interface',
    gameTitle: 'Partie de Jieqi',
    variation: 'Interdire le coup actuel',
    analyzeDrawings: 'Analyser les tracés',
    noDrawingMoves: 'Aucun coup tracé valide',
    noMoreVariations: 'Plus aucune variante disponible',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    viewPasteNotation: 'Voir/Saisir la notation',
    reviewAnalysis: "Revoir l'analyse",
    openingBook: "Bibliothèque d'ouvertures",
    lianxian: 'Board Link',
  },

  lianxian: {
    title: 'Board Link',
    createScheme: 'Create Scheme',
    schemeManager: 'Manage Schemes',
    connect: 'Connect',
    connectDefault: 'Connect Default Scheme',
    connectNamed: 'Connect: {name}',
    disconnect: 'Disconnect',
    setDefault: 'Set Default',
    default: 'Default',
    schemeName: 'Scheme Name',
    ourSide: 'Our Side',
    red: 'Red',
    black: 'Black',
    redOnTop: 'Red on top (remote board flipped)',
    pollInterval: 'Scan interval (ms)',
    clickDelay: 'Click delay (ms)',
    titleFilter: 'Window title contains (optional)',
    window: 'Target window',
    boardPoints: 'Board calibration points',
    extraClicks: 'Extra clicks',
    extraClick: 'Extra click',
    addExtraClick: 'Add extra click (press Ctrl to capture)',
    pressCtrlExtra: 'Move the mouse onto the button, then press Ctrl',
    recalibrate: 'Recalibrate board',
    editScheme: 'Edit Scheme',
    newScheme: 'New Scheme',
    noScheme: 'No schemes yet. Create one first.',
    windowsOnly: 'Board linking is only available on Windows.',
    windowSizeMismatch:
      'Target window size does not match the scheme. Do not resize the remote board.',
    windowChanged: 'The two calibration points were not on the same window.',
    needEngine: 'Load an engine first to auto-play moves.',
    calibrateTitle: 'Create Board-Link Scheme',
    calibrateTopLeft:
      'Move the mouse to the center of the top-left black chariot, then press Ctrl.',
    calibrateBottomRight:
      'Move the mouse to the center of the bottom-right red chariot, then press Ctrl.',
    calibrateHint:
      'Keep the remote window in front. Esc or Cancel aborts. Calibrate from the starting position for best results.',
    calibrateDone: 'Calibration complete. Save the scheme.',
    statusConnecting: 'Connecting to "{name}"…',
    statusSyncing: 'Syncing the board…',
    statusWatching: 'Waiting for the opponent',
    statusThinking: 'Engine thinking',
    statusClicking: 'Clicking move {move}',
    statusPlayed: 'Played {move}',
    statusOpponentMoved: 'Opponent played {move}',
    statusResynced: 'Position resynced',
    statusUnstable: 'Recognition is unstable, confirming…',
    statusDisconnected: 'Disconnected',
  },

  // Boîte de dialogue des options UCI
  uciOptions: {
    title: 'Options du moteur UCI',
    loadingText: 'Chargement des options du moteur...',
    noEngineLoaded: "Aucun moteur n'est actuellement chargé.",
    pleaseLoadEngineFirst:
      "Veuillez d'abord charger un moteur pour configurer ses options.",
    loadEngine: 'Charger un moteur',
    noOptionsAvailable: 'Aucune option UCI disponible pour ce moteur.',
    refreshOptions: 'Actualiser les options',
    range: 'Plage',
    execute: 'Exécuter',
    resetToDefaults: 'Rétablir par défaut',
    clearSettings: 'Effacer les paramètres',
    confirmClearSettings:
      "Êtes-vous sûr de vouloir effacer toutes les configurations d'options UCI pour le moteur actuel ? Cette action est irréversible.",
    settingsCleared: 'Configurations des options UCI effacées',
    // Descriptions des options UCI
    optionDescriptions: {
      'Debug Log File':
        "Le fichier de débogage qui enregistre la communication entre le moteur et l'interface.",
      Threads:
        'Nombre de threads utilisés pour la recherche. Il est recommandé de définir cette valeur au nombre de threads disponibles moins un ou deux.',
      Hash: 'Taille de la table de hachage du moteur (en Mo). Recommandé : mémoire totale disponible moins 1 à 2 Gio.',
      'Clear Hash': 'Vide la table de hachage.',
      MultiPV:
        "Multi-Principal Variation. Permet au moteur d'afficher plusieurs meilleurs coups. Recommandé à 1. Une valeur plus élevée peut réduire la force du meilleur coup car les ressources sont partagées.",
      NumaPolicy:
        'Lie les threads à des nœuds NUMA spécifiques. Améliore les performances sur les systèmes à plusieurs CPU ou architectures complexes.',
      Ponder:
        "Permet au moteur de réfléchir (Ponder) pendant le tour de l'adversaire.",
      'Move Overhead':
        "Suppose un délai de x millisecondes dû au réseau et à l'interface. Utile pour éviter les pertes au temps.",
      nodestime:
        "Indique au moteur d'utiliser le nombre de nœuds au lieu du temps réel pour calculer le temps écoulé. Utile pour les tests de moteur.",
      UCI_ShowWDL:
        'Si activé, affiche les statistiques approximatives WDL (Gain/Nulle/Perte) dans la sortie du moteur.',
      EvalFile:
        "Le nom du fichier de paramètres d'évaluation NNUE. Selon l'interface, le chemin complet peut être nécessaire.",
    },
  },

  // Boîte de dialogue de revue d'analyse
  reviewDialog: {
    title: "Revoir l'analyse",
    movetime: 'Temps par coup (ms)',
    progress: 'Progression : {current}/{total}',
  },

  // Terminal UCI
  uciTerminal: {
    title: 'Terminal UCI',
    enterCommand: 'Entrer une commande UCI...',
    sendCommand: 'Envoyer',
    noEngineLoaded: "Aucun moteur n'est actuellement chargé.",
    pleaseLoadEngineFirst:
      'Veuillez charger un moteur pour utiliser le terminal.',
    quickCommands: 'Commandes rapides',
    clear: 'Effacer le terminal',
    commandHistory: 'Historique des commandes',
    terminalOutput: 'Sortie du terminal',
  },

  // Boîte de dialogue du temps
  timeDialog: {
    title: "Paramètres d'analyse du moteur",
    movetime: 'Temps par coup (ms)',
    maxThinkTime: 'Temps de réflexion max (ms)',
    maxDepth: 'Profondeur max',
    maxNodes: 'Nœuds max',
    analysisMode: "Mode d'analyse",
    advanced: 'Script avancé',
    resetToDefaults: 'Rétablir par défaut',
    clearSettings: 'Effacer les paramètres',
    confirmClearSettings:
      "Êtes-vous sûr de vouloir effacer tous les paramètres d'analyse ? Cette action est irréversible.",
    settingsCleared: "Paramètres d'analyse effacés",
    analysisModes: {
      movetime: 'Analyser par temps par coup',
      maxThinkTime: 'Analyser par temps de réflexion max',
      depth: 'Analyser par profondeur',
      nodes: 'Analyser par nombre de nœuds',
      advanced: 'Mode de programmation avancé',
    },
    advancedHint1:
      'Supporte la programmation simple : assignation, arithmétique, opérations bit à bit, conditions if',
    advancedHint2:
      'Variables disponibles : movetime, depth, nodes, maxThinkTime, prev',
    advancedPlaceholder: 'Veuillez écrire votre script ici...',
    advancedExamples: {
      title: 'Exemple de code',
      basic: 'Réglages de base',
      basicCode: `depth=20
movetime=1000
nodes=2000000`,
      conditional: 'Contrôle conditionnel',
      conditionalCode: `if (!prev.prev.exists()){
  movetime=1000
} else {
  movetime=prev.prev.movetime / 1.05
}`,
      scoreBased: 'Ajustement basé sur le score',
      scoreBasedCode: `if (-prev.score < -300){
  movetime = 4000
} else if (-prev.score < -200) {
  movetime = 3000
} else {
  movetime = 2000
}`,
      variables: 'Variables disponibles',
      variablesDesc: `prev.exists() - Vérifie si le coup précédent existe
prev.movetime - Temps demandé pour le coup précédent
prev.depth - Profondeur de recherche du coup précédent
prev.nodes - Nœuds de recherche du coup précédent
prev.score - Score du coup précédent
prev.timeUsed - Temps réel utilisé par le moteur
prev.prev - L'avant-avant-dernier coup (imbrication infinie)`,
    },
  },

  // Éditeur de position
  positionEditor: {
    title: 'Éditeur de position',
    flipBoard: '🔄 Retourner',
    mirrorLeftRight: '↔️ Miroir G/D',
    switchSide: '⚡ Changer le trait',
    resetPosition: '🔄 Réinitialiser',
    clearPosition: '🔄 Vider',
    recognizeImage: "🖼️ Reconnaissance d'image",
    addPieces: 'Ajouter des pièces',
    revealedPieces: 'Pièces révélées',
    darkPieces: 'Pièces cachées',
    darkPiece: 'Cachée',
    selectedPosition: 'Position sélectionnée',
    selectedPiece: 'Pièce sélectionnée',
    clickToPlace: 'Cliquer pour placer',
    piece: 'Pièce',
    currentSide: 'Au trait',
    redToMove: 'Aux Rouges',
    blackToMove: 'Aux Noirs',
    imageRecognition: "Reconnaissance d'image",
    clickOrDragImage: 'Cliquez ou glissez une image ici',
    supportedFormats: 'Supporte JPG, PNG et autres formats',
    startRecognition: 'Lancer la reconnaissance',
    applyResults: 'Appliquer les résultats',
    recognitionResults: 'Résultats',
    imageRecognitionStatus: {
      loadingModel: 'Chargement du modèle...',
      modelLoadedSuccessfully: 'Modèle chargé avec succès',
      modelLoadingFailed: 'Échec du chargement du modèle : {error}',
      loadingImage: "Chargement de l'image...",
      preprocessingImage: "Prétraitement de l'image...",
      runningModelInference: 'Inférence du modèle en cours...',
      postProcessingResults: 'Post-traitement des résultats...',
      recognitionCompleted: 'Reconnaissance terminée !',
      processingFailed: 'Échec du traitement : {error}',
      unknownError: 'Erreur inconnue',
    },
    showBoundingBoxes: 'Afficher les cadres',
    preserveDarkPools: 'Conserver les réserves de pièces cachées',
    validationStatus: {
      normal: 'Normal',
      error: 'Erreur : Nombre de pièces cachées incorrect',
      noRedKing: 'Erreur : Pas de Roi rouge',
      noBlackKing: 'Erreur : Pas de Roi noir',
      kingOutOfPalace: 'Erreur : Roi hors du palais',
      kingFacing: 'Erreur : Les Rois se font face',
      inCheck: 'Erreur : Le camp au trait est en échec',
      tooManyPieces: 'Erreur : Trop de pièces de ce type',
      tooManyTotalPieces: 'Erreur : Le total des pièces dépasse 16',
      darkPieceInvalidPosition: 'Erreur : Pièce cachée en position invalide',
      duplicatePosition: 'Erreur : Positions de pièces en double',
    },
    cancel: 'Annuler',
    applyChanges: 'Appliquer',
    clear: 'Effacer',
    pieces: {
      red_chariot: 'Tour Rouge',
      red_horse: 'Cavalier Rouge',
      red_elephant: 'Éléphant Rouge',
      red_advisor: 'Conseiller Rouge',
      red_king: 'Roi Rouge',
      red_cannon: 'Canon Rouge',
      red_pawn: 'Pion Rouge',
      black_chariot: 'Tour Noire',
      black_horse: 'Cavalier Noir',
      black_elephant: 'Éléphant Noir',
      black_advisor: 'Conseiller Noir',
      black_king: 'Roi Noir',
      black_cannon: 'Canon Noir',
      black_pawn: 'Pion Noir',
      unknown: 'Cachée',
      red_unknown: 'Cachée Rouge',
      black_unknown: 'Cachée Noire',
    },
  },

  // Saisie FEN
  fenInput: {
    title: 'Saisir une chaîne FEN',
    placeholder: 'Veuillez entrer la chaîne FEN...',
    confirm: 'Confirmer',
    cancel: 'Annuler',
  },

  // Dialogue JSON Notation
  notationTextDialog: {
    title: 'Voir / Coller la notation (JSON)',
    placeholder:
      'Le JSON de la notation actuelle apparaîtra ici. Vous pouvez le copier, ou coller un JSON de notation et cliquer sur "Appliquer" pour le charger.',
    copy: 'Copier JSON',
    apply: 'Appliquer',
  },

  // Invite de retournement
  flipPrompt: {
    title: 'Retourner une pièce',
    message: 'Veuillez sélectionner la pièce à retourner',
    confirm: 'Confirmer',
    cancel: 'Annuler',
  },

  // À propos
  about: {
    title: 'À propos de JieqiBox',
    version: 'Version',
    description:
      "Une application de bureau moderne pour l'analyse et le jeu de Jieqi, construite avec Tauri et Vue 3.",
    author: 'Auteur',
    license: 'Licence',
    github: 'GitHub',
    downloadLatest: 'Télécharger la dernière version',
    viewLicense: 'Voir les détails de la licence',
    credits: 'Crédits',
    piecesCredit: 'Design des pièces : Couch Tomato',
    checkUpdate: 'Vérifier les mises à jour',
    checkingUpdate: 'Vérification des mises à jour...',
    updateAvailable: 'Nouvelle version disponible : {version}',
    upToDate: 'Vous utilisez la dernière version.',
    updateError: 'Échec de la vérification des mises à jour.',
  },

  // Barre latérale d'analyse
  analysis: {
    title: 'Analyse du moteur',
    startAnalysis: "Démarrer l'analyse",
    stopAnalysis: "Arrêter l'analyse",
    engineNotLoaded: 'Moteur non chargé',
    loadEngine: 'Charger un moteur',
    loadEngineSaf: 'Charger un moteur (SAF)',
    analysisResults: 'Résultats',
    bestMove: 'Meilleur coup',
    score: 'Score',
    depth: 'Prof.',
    nodes: 'Nœuds',
    time: 'Temps',
    pv: 'Variante principale (PV)',
    engineLoaded: 'Moteur chargé',
    playBestMove: 'Jouer le meilleur coup',
    undoMove: 'Annuler le coup',
    redAiOn: 'IA Rouge (On)',
    redAiOff: 'IA Rouge (Off)',
    blackAiOn: 'IA Noire (On)',
    blackAiOff: 'IA Noire (Off)',
    freeFlipMode: 'Mode retournement libre',
    darkPiecePool: 'Réserve pièces cachées (prises)',
    captureHistory: 'Historique des prises',
    myCaptured: 'Mes prises',
    opponentCaptured: 'Prises adverses',
    noCaptured: 'Aucune',
    engineAnalysis: 'Analyse Moteur',
    notation: 'Notation',
    moveComments: 'Commentaires',
    noComment: 'Aucun commentaire',
    enterComment: 'Entrer un commentaire...',
    saveComment: 'Enregistrer',
    cancelComment: 'Annuler',
    opening: 'Ouverture',
    adjustment: 'Ajustement',
    engineLog: 'Journal Moteur',
    uciTerminal: 'Terminal UCI',
    about: 'À propos',
    undockPanel: 'Détacher le panneau',
    dockPanel: 'Ancrer le panneau',
    restorePanels: 'Rétablir la disposition',
    flipBoard: "Retourner l'échiquier",
    flipBoardBack: "Rétablir l'orientation",
    ponderMode: 'Mode Ponder',
    selectEngine: 'Choisir le moteur',
    manageEngines: 'Gérer',
    unloadEngine: 'Décharger',
    noEngineLoaded: 'Aucun moteur chargé.',
    // Mode match
    enterMatchMode: 'Mode Match',
    exitMatchMode: 'Quitter le mode Match',
    // Mode Humain vs IA
    enterHumanVsAiMode: 'Humain vs IA',
    exitHumanVsAiMode: 'Quitter Humain vs IA',
    startMatch: 'Démarrer le match',
    stopMatch: 'Arrêter le match',
    jaiSettings: 'Options du match',
    matchInfo: 'Infos du match',
    multiPv: 'Multi PV',
    fullLine: 'Ligne complète',
    matchStatus: 'État',
    gameProgress: 'Progression',
    engineInfo: 'Moteur',
    lastResult: 'Résultat',
    matchWld: 'G/N/P',
    eloRating: 'Classement Elo',
    eloCalculator: 'Calculateur Elo',
    matchEngines: 'Moteurs',
    running: 'En cours',
    stopped: 'Arrêté',
    noMatchEngine: 'Aucun moteur de match chargé',
    noAnalysis: "Pas d'analyse",
    // Indice de chance
    luckIndex: 'Indice de chance',
    luckIndexBasedOnFlipSequence: 'Estimé selon la séquence de retournement',
    blackFavor: 'Faveur Noirs',
    redFavor: 'Faveur Rouges',
    currentValue: 'Valeur actuelle',
    // Boutons de navigation
    goToFirst: 'Premier coup',
    goToPrevious: 'Coup précédent',
    goToNext: 'Coup suivant',
    goToLast: 'Dernier coup',
    play: 'Lecture',
    pause: 'Pause',
    annotateMove: 'Annoter le coup',
    // Annotations de coup
    brilliant: 'Brillant',
    good: 'Bon',
    interesting: 'Intéressant',
    dubious: 'Douteux',
    mistake: 'Erreur',
    blunder: 'Gaffe',
    clear: 'Effacer',
  },

  // Gestionnaire de moteurs
  engineManager: {
    title: 'Gestionnaire de moteurs',
    addEngine: 'Ajouter un moteur',
    addEngineAndroid: 'Ajouter (SAF)',
    editEngine: 'Éditer le moteur',
    engineName: 'Nom du moteur',
    enginePath: 'Chemin du moteur',
    arguments: 'Arguments de ligne de commande',
    actions: 'Actions',
    confirmDeleteTitle: 'Confirmer la suppression',
    confirmDeleteMessage:
      'Êtes-vous sûr de vouloir supprimer le moteur "{name}" ? Cette action est irréversible.',
    promptEngineName: 'Veuillez entrer un nom unique pour le moteur :',
    promptEngineArgs:
      'Veuillez entrer les arguments de ligne de commande (optionnel) :',
    promptHasNnue: 'Ce moteur utilise-t-il un fichier NNUE ? (o/n) :',
    promptNnueFile: 'Veuillez sélectionner le fichier NNUE :',
    nameExists: 'Ce nom existe déjà. Veuillez utiliser un nom unique.',
    engineAddedSuccess: 'Le moteur {name} a été ajouté avec succès !',
  },

  // Éditeur d'options UCI sauvegardées
  uciEditor: {
    title: 'Options UCI sauvegardées',
    noSaved:
      'Aucune option sauvegardée pour ce moteur. Ajoutez des éléments ci-dessous pour préconfigurer le moteur avant son chargement.',
    addOption: 'Ajouter une option',
    optionName: "Nom de l'option",
    optionValue: 'Valeur',
    type: 'Type',
    typeString: 'Chaîne',
    typeNumber: 'Nombre',
    typeSwitch: 'Interrupteur',
    typeCombo: 'Liste (Combo)',
    typeButton: 'Bouton',
    willExecute: 'Exécuter au chargement',
    noExecute: 'Ne pas exécuter',
  },

  // Options JAI
  jaiOptions: {
    title: 'Options de match JAI',
    loadingText: 'Chargement des options...',
    noEngineLoaded: 'Aucun moteur de match chargé.',
    pleaseLoadEngineFirst: "Veuillez d'abord charger un moteur de match.",
    loadEngine: 'Charger un moteur',
    noOptionsAvailable: 'Aucune option JAI disponible.',
    refreshOptions: 'Actualiser',
    range: 'Plage',
    execute: 'Exécuter',
    resetToDefaults: 'Rétablir par défaut',
    clearSettings: 'Effacer les paramètres',
    confirmClearSettings:
      'Êtes-vous sûr de vouloir effacer toutes les options JAI ? Cette action est irréversible.',
    settingsCleared: 'Options JAI effacées',
    // Descriptions des options JAI
    optionDescriptions: {
      Engine1Path:
        'Le chemin complet du premier exécutable de moteur Jieqi compatible UCI.',
      Engine1Options:
        'Une chaîne de commandes UCI "setoption" pour le Moteur 1. Format : "name <Nom> value <Valeur>". Séparez par des espaces. Exemple : "name Threads value 4 name Hash value 256"',
      Engine2Path:
        'Le chemin complet du second exécutable de moteur Jieqi compatible UCI.',
      Engine2Options:
        'Une chaîne de commandes UCI "setoption" pour le Moteur 2. Voir "Engine1Options" pour le format.',
      TotalRounds:
        'Le nombre de paires de parties à jouer. Le nombre total de parties sera "TotalRounds * 2", car les moteurs échangent les couleurs.',
      Concurrency: 'Le nombre de parties à exécuter en parallèle.',
      BookFile:
        "Chemin vers un fichier de bibliothèque d'ouvertures. Une position FEN par ligne. Une FEN est choisie aléatoirement par ronde.",
      MainTimeMs:
        'Le temps de réflexion de base pour chaque joueur (en millisecondes).',
      IncTimeMs:
        "L'incrément de temps ajouté après chaque coup (en millisecondes).",
      TimeoutBufferMs:
        'Une période de grâce (ms) pour compenser la latence. Un joueur ne perd au temps que si son horloge descend sous "-(TimeoutBufferMs)".',
      Logging:
        'Si activé ("true"), le moteur de match créera des fichiers journaux détaillés pour chaque processus.',
      SaveNotation:
        'Active la sauvegarde des fichiers de notation pour chaque partie.',
      SaveNotationDir:
        'Dossier où les fichiers de notation seront sauvegardés.',
      TimeControl: 'Paramètres de contrôle du temps pour chaque moteur.',
      AdjudicationRule: 'Règles pour adjuger les parties nulles ou décisives.',
    },
  },

  // Messages JAI
  jai: {
    engineReady: 'Moteur de match prêt',
    matchStarted: 'Match démarré',
    matchStopped: 'Match arrêté',
    gameProgress: 'Partie {current} sur {total}',
    matchResult: 'Résultat du match : {result}',
  },

  // Calculateur Elo
  eloCalculator: {
    title: 'Calculateur Elo',
    inputSection: 'Résultats du match',
    wins: 'Victoires',
    losses: 'Défaites',
    draws: 'Nulles',
    totalGames: 'Total parties',
    resultsFormat: 'Format des résultats',
    formatWDL: 'WDL (Victoires/Nulles/Défaites)',
    formatPTNML: 'PTNML (Paires)',
    ptnml: {
      ll: 'LL (Déf.+Déf.)',
      lddl: 'LD+DL (Déf.+Nulle)',
      center: 'LW+DD+WL (Échange/Nulles)',
      dwwd: 'DW+WD (Nulle+Vict.)',
      ww: 'WW (Vict.+Vict.)',
    },
    resultsSection: 'Performance Elo',
    performance: 'Différence Elo (avec erreur 95%)',
    confidenceInterval: 'Intervalle de confiance 95%',
    scoreRate: 'Taux de score',
    los: 'LOS (Probabilité de supériorité)',
    drawRatio: 'Taux de nulles',
    standardError: 'Erreur standard',
    noResults: 'Entrez les résultats pour voir les calculs.',
    basicRequiresWDL: 'Le mode basique requiert une entrée WDL.',
    close: 'Fermer',
    basicMode: 'Basique',
  },

  // Messages d'erreur
  errors: {
    saveNotationFailed: 'Échec de la sauvegarde de la notation',
    openNotationFailed: "Échec de l'ouverture de la notation",
    engineNotLoaded: "Moteur non chargé, impossible d'envoyer la commande",
    engineSendUnavailable: "Méthode d'envoi du moteur indisponible",
    redDarkPiecesMismatch:
      'Erreur : Rouges {darkCount} cachées > {poolCount} réserve',
    blackDarkPiecesMismatch:
      'Erreur : Noires {darkCount} cachées > {poolCount} réserve',
    pieceCountExceeded: 'Erreur : Nombre total de {pieceName} dépassé !',
    engineLoadFailed: 'Échec du chargement du moteur {name} : {error}',
    jaiEngineLoadFailed: 'Échec du chargement du moteur JAI {name} : {error}',
    engineUnloadFailed: 'Échec du déchargement du moteur',
    failedToOpenFileSelector: "Échec de l'ouverture du sélecteur de fichier",
    failedToProcessEngine: 'Échec du traitement du fichier moteur',
    invalidFenFormat: 'Format FEN invalide',
  },

  // Bas de l'échiquier
  chessboard: {
    copyFen: 'Copier FEN',
    pasteFen: 'Coller FEN',
    inputFen: 'Saisir FEN',
    inputCopyFen: 'Saisir/Copier FEN',
    newGame: 'Nouvelle partie',
    copied: '✓ Copié',
    clearDrawings: 'Effacer les dessins',
  },

  // Graphique d'évaluation
  evaluationChart: {
    title: "Graphique d'évaluation",
    rightClickHint: 'Clic droit pour les options',
    longPressHint: 'Appui long pour les options',
    showMoveLabels: 'Afficher les étiquettes',
    linearYAxis: 'Axe Y linéaire',
    showOnlyLines: 'Lignes seulement',
    blackPerspective: 'Perspective des Noirs',
    clampYAxis: "Limiter l'axe Y",
    clampValue: 'Valeur limite',
    colorScheme: 'Schéma de couleurs',
    redGreen: 'Rouge-Vert',
    blueOrange: 'Bleu-Orange',
    showSeparateLines: 'Lignes séparées Rouge & Noir',
    opening: 'Ouverture',
    noData: "Aucune donnée d'analyse",
    newGame: 'Nouvelle partie',
    copied: '✓ Copié',
    saveChartImage: "Enregistrer l'image",
    chartImageSaved: 'Image enregistrée dans {path}',
    saveChartImageFailed: "Échec de l'enregistrement",
    viewMode: "Mode d'affichage",
    evaluation: 'Évaluation',
    time: 'Temps',
    depth: 'Profondeur',
  },

  // Sélection de la langue
  languages: {
    current: 'Langue actuelle',
    zh_cn: '简体中文',
    zh_tw: '繁體中文',
    en: 'English',
    vi: 'Tiếng Việt',
    ja: '日本語',
    ko: '한국어',
    ru: 'Русский',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    th: 'ไทย',
    ms: 'Bahasa Melayu',
  },

  // Paramètres de l'interface
  interfaceSettings: {
    title: "Paramètres de l'interface",
    showCoordinates: 'Afficher les coordonnées',
    parseUciInfo: 'Analyser les infos UCI',
    showAnimations: 'Activer les animations',
    showPositionChart: 'Afficher le graphique',
    showEvaluationBar: "Afficher la barre d'évaluation",
    darkMode: 'Mode sombre',
    autosave: 'Sauvegarde auto dans Autosave.json',
    useNewFenFormat: 'Utiliser le nouveau format FEN',
    engineLogLineLimit: 'Limite de lignes du journal moteur',
    validationTimeout: 'Délai validation moteur (ms)',
    showChineseNotation: 'Notation chinoise',
    showLuckIndex: "Afficher l'indice de chance",
    showArrows: 'Afficher les flèches',
    enableSoundEffects: 'Activer les effets sonores',
    soundVolume: 'Volume sonore',
    pieceStyle: 'Style de pièce',
    pieceStyles: {
      default: 'Défaut',
      internationalized: 'Internationalisé',
    },
  },

  // Messages UCI
  uci: {
    depth: 'Prof.',
    seldepth: 'SelDepth',
    multipv: 'MultiPV',
    score: 'Score',
    mate: 'Mat',
    wdl: 'G/N/P',
    nodes: 'Nœuds',
    nps: 'NPS',
    hashfull: 'HashFull',
    tbhits: 'TBHits',
    time: 'Temps',
    pv: 'PV',
    checkmate: 'Échec et mat ! Aucun coup disponible.',
    bestMove: 'Meilleur coup : {move}',
    noMoves: 'Aucun coup disponible',
    engineReady: 'Le moteur est prêt',
  },

  // Confirmation d'opération de jeu
  gameConfirm: {
    clearHistoryTitle: "Effacer l'historique futur",
    clearHistoryMessage:
      "Vous jouez un coup dans une position historique. Cela effacera tout l'historique des coups suivants. Continuer ?",
    confirm: 'Confirmer',
    cancel: 'Annuler',
  },

  // Notifications de fin de jeu
  gameEnd: {
    humanWins: 'Félicitations ! Vous avez gagné !',
    aiWins: "Partie terminée - L'IA gagne",
    humanWinsMessage: "Vous avez vaincu l'IA ! L'IA n'a plus de coups légaux.",
    aiWinsMessage:
      "L'IA a gagné cette partie. Vous n'avez plus de coups légaux.",
    ok: 'OK',
  },

  // Mode Humain vs IA
  humanVsAi: {
    title: 'Mode Humain vs IA',
    selectAiSide: "Choisir le camp de l'IA",
    redAiBlackHuman: 'IA Rouge, Humain Noir',
    blackAiRedHuman: 'IA Noire, Humain Rouge',
    options: 'Options',
    showEngineAnalysis: "Afficher l'analyse du moteur",
    engineAnalysisHint:
      "Si activé, vous pouvez voir les résultats d'analyse, mais cela n'affecte pas les règles du jeu",
    ponderNote: 'À propos du Ponder :',
    ponderUnifiedHint:
      'Le mode Ponder utilise les paramètres globaux, activables dans la barre latérale en mode normal',
    rulesTitle: 'Règles du jeu',
    rule1: 'Le mode de retournement aléatoire est forcé automatiquement',
    rule2: "Vous ne voyez que les pièces cachées que vous capturez à l'IA",
    rule3: "L'IA ne voit que les pièces cachées qu'elle vous capture",
    rule4: 'Bataille à information limitée selon les règles standard du Jieqi',
    startGame: 'Démarrer la partie',
  },

  // Bibliothèque d'ouvertures
  openingBook: {
    title: "Bibliothèque d'ouvertures",
    currentMoves: 'Coups de la position actuelle',
    manage: 'Gérer',
    settings: 'Paramètres',
    statistics: 'Statistiques',
    noMoves: 'Aucun coup de bibliothèque pour cette position',
    foundMoves: '{count} coups trouvés',
    positions: 'Positions',
    move: 'Coup',
    priority: 'Priorité',
    stats: 'G/N/P',
    allowed: 'Autorisé',
    comment: 'Commentaire',
    addPosition: 'Ajouter la position actuelle',
    editMove: 'Éditer le coup',
    addMove: 'Ajouter un coup',
    moveUci: 'Coup UCI',
    moveRequired: 'Le coup est requis',
    invalidUci: 'Format UCI invalide',
    invalidMoveFormat:
      'Format de coup invalide, utilisez le format UCI (ex: a1a2) ou la notation chinoise',
    invalidLegalMove: "Ce coup n'est pas légal dans la position actuelle",
    wins: 'Victoires',
    draws: 'Nulles',
    losses: 'Défaites',
    import: 'Importer',
    export: 'Exporter',
    selectFile: 'Choisir un fichier',
    format: 'Format',
    dangerZone: 'Zone de danger',
    clearAll: 'Tout effacer',
    confirmClear: "Confirmer l'effacement",
    clearWarning:
      'Cela supprimera définitivement toutes les entrées de la bibliothèque. Action irréversible.',
    confirmDelete: 'Confirmer la suppression',
    deleteWarning:
      'Êtes-vous sûr de vouloir supprimer ce coup ? Action irréversible.',
    enableInGame: 'Activer en jeu',
    showMoves: 'Afficher les coups',
    show: 'Afficher',
    preferHighPriority: 'Préférer la haute priorité',
    totalPositions: 'Total positions',
    totalMoves: 'Total coups',
    allowedMoves: 'Coups autorisés',
    disallowedMoves: 'Coups interdits',
    refreshStats: 'Actualiser stats',
    refresh: 'Actualiser',
    getBookMove: 'Jouer un coup de la bibliothèque',
    initializing: 'Initialisation...',
    showLess: 'Voir moins',
    showMore: 'Voir plus',
    addMarkedMoves: 'Ajouter les tracés',
    addMarkedMovesTitle: 'Ajouter les coups tracés à la bibliothèque',
    markedMovesCount: '{count} coups tracés légaux trouvés',
    noMarkedMoves: 'Aucun coup tracé légal trouvé',
    batchSettings: 'Paramètres par lot',
  },
}
