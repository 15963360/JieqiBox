export default {
  // Allgemein
  common: {
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    close: 'Schließen',
    save: 'Speichern',
    open: 'Öffnen',
    refresh: 'Aktualisieren',
    reset: 'Zurücksetzen',
    clear: 'Löschen',
    apply: 'Anwenden',
    execute: 'Ausführen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    warning: 'Warnung',
    info: 'Info',
    delete: 'Löschen',
    add: 'Hinzufügen',
    actions: 'Aktionen',
    required: 'Dieses Feld ist erforderlich',
  },

  // Obere Werkzeugleiste
  toolbar: {
    newGame: 'Neues Spiel',
    copyFen: 'FEN kopieren',
    inputFen: 'FEN eingeben',
    editPosition: 'Stellung bearbeiten',
    uciSettings: 'UCI-Einstellungen',
    analysisParams: 'Analyse-Parameter',
    saveNotation: 'Partie speichern',
    openNotation: 'Partie öffnen',
    interfaceSettings: 'Oberflächen-Einstellungen',
    gameTitle: 'Jieqi-Spiel',
    variation: 'Aktuellen Zug verbieten',
    analyzeDrawings: 'Zeichnungen analysieren',
    noDrawingMoves: 'Keine gültigen gezeichneten Züge',
    noMoreVariations: 'Keine weiteren Varianten verfügbar',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    viewPasteNotation: 'Notation ansehen/eingeben',
    reviewAnalysis: 'Analyse überprüfen',
    openingBook: 'Eröffnungsbibliothek',
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

  // UCI-Optionen Dialog
  uciOptions: {
    title: 'UCI-Engine-Optionen',
    loadingText: 'Lade Engine-Optionen...',
    noEngineLoaded: 'Derzeit ist keine Engine geladen.',
    pleaseLoadEngineFirst:
      'Bitte laden Sie zuerst eine Engine, um deren Optionen zu konfigurieren.',
    loadEngine: 'Engine laden',
    noOptionsAvailable: 'Für diese Engine sind keine UCI-Optionen verfügbar.',
    refreshOptions: 'Optionen aktualisieren',
    range: 'Bereich',
    execute: 'Ausführen',
    resetToDefaults: 'Standardwerte',
    clearSettings: 'Einstellungen löschen',
    confirmClearSettings:
      'Sind Sie sicher, dass Sie alle UCI-Konfigurationen für die aktuelle Engine löschen möchten? Dies kann nicht rückgängig gemacht werden.',
    settingsCleared: 'UCI-Konfigurationen gelöscht',
    // Beschreibungen der UCI-Optionen
    optionDescriptions: {
      'Debug Log File':
        'Die Debug-Datei, die die Kommunikation zwischen Engine und GUI aufzeichnet.',
      Threads:
        'Anzahl der Threads für die Engine-Suche. Es wird empfohlen, diesen Wert auf die Anzahl der verfügbaren System-Threads minus eins oder zwei zu setzen.',
      Hash: 'Größe der Hash-Tabelle der Engine (in MB). Empfohlen wird der gesamte verfügbare Speicher minus 1 bis 2 GiB.',
      'Clear Hash': 'Leert die Hash-Tabelle.',
      MultiPV:
        'Multi-Principal Variation. Erlaubt der Engine, mehrere empfohlene Züge anzuzeigen. Empfohlen ist 1. Höhere Werte können die Qualität des besten Zuges verringern, da Ressourcen aufgeteilt werden.',
      NumaPolicy:
        'Bindet Threads an bestimmte NUMA-Knoten. Verbessert die Leistung auf Systemen mit mehreren CPUs oder CPUs mit mehreren NUMA-Domänen.',
      Ponder:
        'Erlaubt der Engine, während des Zuges des Gegners zu "denken" (Pondern).',
      'Move Overhead':
        'Nimmt eine Verzögerung von x Millisekunden aufgrund von Netzwerk- und GUI-Overhead an. Nützlich zur Vermeidung von Zeitverlusten.',
      nodestime:
        'Weist die Engine an, die Anzahl der durchsuchten Knoten anstelle der Wanduhrzeit zur Berechnung der verstrichenen Zeit zu verwenden. Nützlich für Engine-Tests.',
      UCI_ShowWDL:
        'Wenn aktiviert, werden ungefähre WDL-Statistiken (Sieg/Remis/Niederlage) in der Engine-Ausgabe angezeigt based auf der internen Bewertung.',
      EvalFile:
        'Der Name der NNUE-Bewertungsparameterdatei. Je nach GUI muss der Dateiname möglicherweise den vollständigen Pfad enthalten.',
    },
  },

  // Analyse-Überprüfungs-Dialog
  reviewDialog: {
    title: 'Analyse überprüfen',
    movetime: 'Zeit pro Zug (ms)',
    progress: 'Fortschritt: {current}/{total}',
  },

  // UCI-Terminal Dialog
  uciTerminal: {
    title: 'UCI-Terminal',
    enterCommand: 'UCI-Befehl eingeben...',
    sendCommand: 'Befehl senden',
    noEngineLoaded: 'Derzeit ist keine Engine geladen.',
    pleaseLoadEngineFirst:
      'Bitte laden Sie zuerst eine Engine, um das Terminal zu nutzen.',
    quickCommands: 'Schnellbefehle',
    clear: 'Terminal leeren',
    commandHistory: 'Befehlsverlauf',
    terminalOutput: 'Terminal-Ausgabe',
  },

  // Zeit-Dialog
  timeDialog: {
    title: 'Engine-Analyse-Parameter',
    movetime: 'Zeit pro Zug (ms)',
    maxThinkTime: 'Max. Bedenkzeit (ms)',
    maxDepth: 'Max. Tiefe',
    maxNodes: 'Max. Knoten',
    analysisMode: 'Analyse-Modus',
    advanced: 'Erweitertes Skript',
    resetToDefaults: 'Standardwerte',
    clearSettings: 'Einstellungen löschen',
    confirmClearSettings:
      'Sind Sie sicher, dass Sie alle Analyse-Parameter löschen möchten? Dies kann nicht rückgängig gemacht werden.',
    settingsCleared: 'Analyse-Parameter gelöscht',
    analysisModes: {
      movetime: 'Nach Zeit pro Zug analysieren',
      maxThinkTime: 'Nach max. Bedenkzeit analysieren',
      depth: 'Nach Tiefe analysieren',
      nodes: 'Nach Knotenanzahl analysieren',
      advanced: 'Erweiterter Programmiermodus',
    },
    advancedHint1:
      'Unterstützt einfache Programmierung: Zuweisung, Arithmetik, Bitweise Operationen, if-Bedingungen',
    advancedHint2:
      'Verfügbare Variablen: movetime, depth, nodes, maxThinkTime, prev',
    advancedPlaceholder: 'Bitte schreiben Sie Ihr Skript hier...',
    advancedExamples: {
      title: 'Beispielcode',
      basic: 'Grundeinstellungen',
      basicCode: `depth=20
movetime=1000
nodes=2000000`,
      conditional: 'Bedingte Steuerung',
      conditionalCode: `if (!prev.prev.exists()){
  movetime=1000
} else {
  movetime=prev.prev.movetime / 1.05
}`,
      scoreBased: 'Bewertungsbasierte Anpassung',
      scoreBasedCode: `if (-prev.score < -300){
  movetime = 4000
} else if (-prev.score < -200) {
  movetime = 3000
} else {
  movetime = 2000
}`,
      variables: 'Verfügbare Variablen',
      variablesDesc: `prev.exists() - Prüft, ob der vorherige Zug existiert
prev.movetime - Angeforderte Zeit des vorherigen Zuges
prev.depth - Suchtiefe des vorherigen Zuges
prev.nodes - Suchknoten des vorherigen Zuges
prev.score - Bewertung des vorherigen Zuges
prev.timeUsed - Tatsächlich genutzte Zeit des vorherigen Zuges
prev.prev - Vorheriger-vorheriger Zug (unendlich verschachtelbar)`,
    },
  },

  // Positions-Editor Dialog
  positionEditor: {
    title: 'Positions-Editor',
    flipBoard: '🔄 Brett drehen',
    mirrorLeftRight: '↔️ Links-Rechts spiegeln',
    switchSide: '⚡ Seite wechseln',
    resetPosition: '🔄 Position zurücksetzen',
    clearPosition: '🔄 Position leeren',
    recognizeImage: '🖼️ Bilderkennung',
    addPieces: 'Figuren hinzufügen',
    revealedPieces: 'Offene Figuren',
    darkPieces: 'Verdeckte Figuren',
    darkPiece: 'Verdeckt',
    selectedPosition: 'Ausgewählte Position',
    selectedPiece: 'Ausgewählte Figur',
    clickToPlace: 'Klicken zum Platzieren',
    piece: 'Figur',
    currentSide: 'Am Zug',
    redToMove: 'Rot am Zug',
    blackToMove: 'Schwarz am Zug',
    imageRecognition: 'Bilderkennung',
    clickOrDragImage: 'Klicken oder Bild hierher ziehen',
    supportedFormats: 'Unterstützt JPG, PNG und andere Formate',
    startRecognition: 'Erkennung starten',
    applyResults: 'Ergebnisse anwenden',
    recognitionResults: 'Erkennungsergebnisse',
    imageRecognitionStatus: {
      loadingModel: 'Lade Modell...',
      modelLoadedSuccessfully: 'Modell erfolgreich geladen',
      modelLoadingFailed: 'Laden des Modells fehlgeschlagen: {error}',
      loadingImage: 'Lade Bild...',
      preprocessingImage: 'Bildvorverarbeitung...',
      runningModelInference: 'Führe Modell-Inferenz aus...',
      postProcessingResults: 'Nachbearbeitung der Ergebnisse...',
      recognitionCompleted: 'Erkennung abgeschlossen!',
      processingFailed: 'Verarbeitung fehlgeschlagen: {error}',
      unknownError: 'Unbekannter Fehler',
    },
    showBoundingBoxes: 'Begrenzungsrahmen anzeigen',
    preserveDarkPools: 'Pools der verdeckten Steine beibehalten',
    validationStatus: {
      normal: 'Normal',
      error: 'Fehler: Anzahl der verdeckten Steine stimmt nicht',
      noRedKing: 'Fehler: Kein roter König',
      noBlackKing: 'Fehler: Kein schwarzer König',
      kingOutOfPalace: 'Fehler: König außerhalb des Palastes',
      kingFacing: 'Fehler: Könige stehen sich gegenüber',
      inCheck: 'Fehler: Seite am Zug steht im Schach',
      tooManyPieces: 'Fehler: Zu viele Figuren dieses Typs',
      tooManyTotalPieces: 'Fehler: Gesamtanzahl der Figuren überschreitet 16',
      darkPieceInvalidPosition:
        'Fehler: Verdeckter Stein auf ungültiger Position',
      duplicatePosition: 'Fehler: Doppelte Figurenposition',
    },
    cancel: 'Abbrechen',
    applyChanges: 'Änderungen anwenden',
    clear: 'Leeren',
    pieces: {
      red_chariot: 'Roter Wagen',
      red_horse: 'Rotes Pferd',
      red_elephant: 'Roter Elefant',
      red_advisor: 'Roter Mandarine',
      red_king: 'Roter König',
      red_cannon: 'Rote Kanone',
      red_pawn: 'Roter Soldat',
      black_chariot: 'Schwarzer Wagen',
      black_horse: 'Schwarzes Pferd',
      black_elephant: 'Schwarzer Elefant',
      black_advisor: 'Schwarzer Mandarine',
      black_king: 'Schwarzer König',
      black_cannon: 'Schwarze Kanone',
      black_pawn: 'Schwarzer Soldat',
      unknown: 'Verdeckt',
      red_unknown: 'Rot Verdeckt',
      black_unknown: 'Schwarz Verdeckt',
    },
  },

  // FEN Eingabe Dialog
  fenInput: {
    title: 'FEN-String eingeben',
    placeholder: 'Bitte FEN-String eingeben...',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
  },

  // Notation JSON Dialog
  notationTextDialog: {
    title: 'Notation ansehen / einfügen (JSON)',
    placeholder:
      'Hier erscheint das JSON der aktuellen Partienotation. Sie können es kopieren oder ein Notations-JSON einfügen und auf "Anwenden" klicken, um es zu laden.',
    copy: 'JSON kopieren',
    apply: 'Anwenden',
  },

  // Aufdeck-Hinweis Dialog
  flipPrompt: {
    title: 'Figur aufdecken',
    message: 'Bitte wählen Sie die aufzudeckende Figur',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
  },

  // Über Dialog
  about: {
    title: 'Über JieqiBox',
    version: 'Version',
    description:
      'Eine moderne Desktop-Anwendung für Jieqi-Analyse und Spiel, erstellt mit Tauri und Vue 3.',
    author: 'Autor',
    license: 'Lizenz',
    github: 'GitHub',
    downloadLatest: 'Neueste Version herunterladen',
    viewLicense: 'Lizenzdetails ansehen',
    credits: 'Credits',
    piecesCredit: 'Figuren-Design: Couch Tomato',
    checkUpdate: 'Nach Updates suchen',
    checkingUpdate: 'Suche nach Updates...',
    updateAvailable: 'Neue Version verfügbar: {version}',
    upToDate: 'Sie verwenden die neueste Version.',
    updateError: 'Fehler beim Suchen nach Updates.',
  },

  // Analyse Seitenleiste
  analysis: {
    title: 'Engine-Analyse',
    startAnalysis: 'Analyse starten',
    stopAnalysis: 'Analyse stoppen',
    engineNotLoaded: 'Engine nicht geladen',
    loadEngine: 'Engine laden',
    loadEngineSaf: 'Engine laden (SAF)',
    analysisResults: 'Analyse-Ergebnisse',
    bestMove: 'Bester Zug',
    score: 'Bewertung',
    depth: 'Tiefe',
    nodes: 'Knoten',
    time: 'Zeit',
    pv: 'Hauptvariante',
    engineLoaded: 'Engine geladen',
    playBestMove: 'Besten Zug spielen',
    undoMove: 'Zug zurücknehmen',
    redAiOn: 'Rot KI (Ein)',
    redAiOff: 'Rot KI (Aus)',
    blackAiOn: 'Schwarz KI (Ein)',
    blackAiOff: 'Schwarz KI (Aus)',
    freeFlipMode: 'Freier Aufdeck-Modus',
    darkPiecePool: 'Vorrat (geschlagener) verdeckter Steine',
    captureHistory: 'Schlaghistorie',
    myCaptured: 'Von mir geschlagen',
    opponentCaptured: 'Vom Gegner geschlagen',
    noCaptured: 'Keine',
    engineAnalysis: 'Engine-Analyse',
    notation: 'Notation',
    moveComments: 'Zugkommentare',
    noComment: 'Kein Kommentar',
    enterComment: 'Kommentar eingeben...',
    saveComment: 'Speichern',
    cancelComment: 'Abbrechen',
    opening: 'Eröffnung',
    adjustment: 'Anpassung',
    engineLog: 'Engine-Log',
    uciTerminal: 'UCI-Terminal',
    about: 'Über',
    undockPanel: 'Panel abdocken',
    dockPanel: 'Panel andocken',
    restorePanels: 'Panel-Layout wiederherstellen',
    flipBoard: 'Brett drehen',
    flipBoardBack: 'Richtung wiederherstellen',
    ponderMode: 'Ponder-Modus',
    selectEngine: 'Engine wählen',
    manageEngines: 'Verwalten',
    unloadEngine: 'Engine entladen',
    noEngineLoaded: 'Derzeit ist keine Engine geladen.',
    // Match Modus
    enterMatchMode: 'Match-Modus',
    exitMatchMode: 'Match-Modus verlassen',
    // Mensch vs KI Modus
    enterHumanVsAiMode: 'Mensch vs KI',
    exitHumanVsAiMode: 'Mensch vs KI verlassen',
    startMatch: 'Match starten',
    stopMatch: 'Match stoppen',
    jaiSettings: 'Match-Optionen',
    matchInfo: 'Match-Informationen',
    multiPv: 'Multi PV',
    fullLine: 'Vollständige Linie',
    matchStatus: 'Status',
    gameProgress: 'Fortschritt',
    engineInfo: 'Engine',
    lastResult: 'Ergebnis',
    matchWld: 'S/R/N',
    eloRating: 'Elo-Rating',
    eloCalculator: 'Elo-Rechner',
    matchEngines: 'Engines',
    running: 'Läuft',
    stopped: 'Gestoppt',
    noMatchEngine: 'Keine Match-Engine geladen',
    noAnalysis: 'Keine Analysedaten',
    // Glücksindex
    luckIndex: 'Glücksindex',
    luckIndexBasedOnFlipSequence: 'Geschätzt basierend auf Aufdeckreihenfolge',
    blackFavor: 'Vorteil Schwarz',
    redFavor: 'Vorteil Rot',
    currentValue: 'Aktueller Wert',
    // Navigations-Buttons
    goToFirst: 'Zum ersten Zug',
    goToPrevious: 'Vorheriger Zug',
    goToNext: 'Nächster Zug',
    goToLast: 'Zum letzten Zug',
    play: 'Abspielen',
    pause: 'Pause',
    annotateMove: 'Zug bewerten',
    // Zugbewertungen
    brilliant: 'Brillant',
    good: 'Gut',
    interesting: 'Interessant',
    dubious: 'Fragwürdig',
    mistake: 'Fehler',
    blunder: 'Patzer',
    clear: 'Löschen',
  },

  // Engine Manager
  engineManager: {
    title: 'Engine-Manager',
    addEngine: 'Engine hinzufügen',
    addEngineAndroid: 'Engine hinzufügen (SAF)',
    editEngine: 'Engine bearbeiten',
    engineName: 'Engine-Name',
    enginePath: 'Engine-Pfad',
    arguments: 'Kommandozeilen-Argumente',
    actions: 'Aktionen',
    confirmDeleteTitle: 'Löschen bestätigen',
    confirmDeleteMessage:
      'Sind Sie sicher, dass Sie die Engine "{name}" löschen möchten? Dies kann nicht rückgängig gemacht werden.',
    promptEngineName:
      'Bitte geben Sie einen eindeutigen Namen für die Engine ein:',
    promptEngineArgs:
      'Bitte geben Sie Kommandozeilen-Argumente ein (optional, leer lassen falls unbekannt):',
    promptHasNnue: 'Verwendet diese Engine NNUE-Dateien? (j/n):',
    promptNnueFile: 'Bitte wählen Sie die NNUE-Datei für die Engine:',
    nameExists:
      'Dieser Name existiert bereits. Bitte wählen Sie einen eindeutigen Namen.',
    engineAddedSuccess: 'Engine {name} wurde erfolgreich hinzugefügt!',
  },

  // Editor für gespeicherte UCI-Optionen im Engine Manager
  uciEditor: {
    title: 'Gespeicherte UCI-Optionen',
    noSaved:
      'Noch keine gespeicherten Optionen für diese Engine. Fügen Sie unten Einträge hinzu, um sie vor dem Laden der Engine vorzukonfigurieren.',
    addOption: 'Option hinzufügen',
    optionName: 'Optionsname',
    optionValue: 'Wert',
    type: 'Typ',
    typeString: 'String',
    typeNumber: 'Zahl',
    typeSwitch: 'Schalter',
    typeCombo: 'Auswahl (Combo)',
    typeButton: 'Button',
    willExecute: 'Beim Laden ausführen',
    noExecute: 'Nicht ausführen',
  },

  // JAI Optionen Dialog
  jaiOptions: {
    title: 'JAI Match-Optionen',
    loadingText: 'Lade Engine-Optionen...',
    noEngineLoaded: 'Derzeit ist keine Match-Engine geladen.',
    pleaseLoadEngineFirst:
      'Bitte laden Sie zuerst eine Match-Engine, um deren Optionen zu konfigurieren.',
    loadEngine: 'Engine laden',
    noOptionsAvailable: 'Keine JAI-Optionen für diese Engine verfügbar.',
    refreshOptions: 'Optionen aktualisieren',
    range: 'Bereich',
    execute: 'Ausführen',
    resetToDefaults: 'Auf Standardwerte zurücksetzen',
    clearSettings: 'Einstellungen löschen',
    confirmClearSettings:
      'Sind Sie sicher, dass Sie alle JAI-Optionen für die aktuelle Engine löschen möchten? Dies kann nicht rückgängig gemacht werden.',
    settingsCleared: 'JAI-Optionen gelöscht',
    // JAI Optionen Beschreibungen
    optionDescriptions: {
      Engine1Path:
        'Der vollständige Pfad zur ersten UCI-kompatiblen Jieqi-Engine.',
      Engine1Options:
        'Ein String mit UCI "setoption"-Befehlen für Engine 1. Jede Option muss dem Format "name <Name> value <Wert>" folgen. Mehrere Optionen werden durch Leerzeichen getrennt. Beispiel: "name Threads value 4 name Hash value 256"',
      Engine2Path:
        'Der vollständige Pfad zur zweiten UCI-kompatiblen Jieqi-Engine.',
      Engine2Options:
        'Ein String mit UCI "setoption"-Befehlen für Engine 2. Format siehe "Engine1Options".',
      TotalRounds:
        'Die Anzahl der zu spielenden Partie-Paare. Die Gesamtzahl der Spiele beträgt "TotalRounds * 2", da die Engines jede Runde die Farben wechseln.',
      Concurrency: 'Die Anzahl der parallel laufenden Spiele.',
      BookFile:
        'Pfad zu einer Eröffnungsbibliothek-Datei. Die Datei sollte eine FEN-Position pro Zeile enthalten. Zu Beginn jeder Runde wird zufällig eine FEN ausgewählt und für beide Spiele der Runde verwendet. Bei leerem/ungültigem Pfad wird die Standard-Startposition verwendet.',
      MainTimeMs:
        'Die Grundbedenkzeit für jeden Spieler pro Spiel in Millisekunden.',
      IncTimeMs:
        'Der Zeitinkrement, das nach jedem Zug zur Uhr hinzugefügt wird (in ms).',
      TimeoutBufferMs:
        'Eine Gnadenfrist in Millisekunden für Prozess- und Kommunikationsoverhead. Ein Spieler verliert nur dann auf Zeit, wenn seine Uhr unter "-(TimeoutBufferMs)" fällt.',
      Logging:
        'Wenn aktiviert ("true"), erstellt die Match-Engine detaillierte Protokolldateien für jeden Engine-Prozess.',
      SaveNotation:
        'Schalter zum Aktivieren des Speicherns von Partienotationen.',
      SaveNotationDir:
        'Verzeichnispfad, in dem die Notationsdateien gespeichert werden, wenn das Speichern aktiviert ist.',
      TimeControl: 'Zeitkontroll-Einstellungen für jede Engine.',
      AdjudicationRule:
        'Regeln für die Bewertung von Remis- oder entschiedenen Stellungen.',
    },
  },

  // JAI Nachrichten
  jai: {
    engineReady: 'Match-Engine ist bereit',
    matchStarted: 'Match gestartet',
    matchStopped: 'Match gestoppt',
    gameProgress: 'Spiel {current} von {total}',
    matchResult: 'Match-Ergebnis: {result}',
  },

  // Elo Rechner
  eloCalculator: {
    title: 'Elo-Rechner',
    inputSection: 'Match-Ergebnisse',
    wins: 'Siege',
    losses: 'Niederlagen',
    draws: 'Remis',
    totalGames: 'Gesamtspiele',
    resultsFormat: 'Ergebnisformat',
    formatWDL: 'WDL (Siege/Remis/Niederlagen)',
    formatPTNML: 'PTNML (Paare)',
    ptnml: {
      ll: 'LL (Verl.+Verl.)',
      lddl: 'LD+DL (Verl.+Remis)',
      center: 'LW+DD+WL (Verl.+Sieg / Remis+Remis)',
      dwwd: 'DW+WD (Remis+Sieg)',
      ww: 'WW (Sieg+Sieg)',
    },
    resultsSection: 'Elo-Leistung',
    performance: 'Elo-Differenz (mit 95% Fehler)',
    confidenceInterval: '95% Konfidenzintervall',
    scoreRate: 'Punktrate',
    los: 'LOS (Wahrscheinlichkeit der Überlegenheit)',
    drawRatio: 'Remis-Quote',
    standardError: 'Standardfehler',
    noResults: 'Geben Sie Match-Ergebnisse ein, um Berechnungen zu sehen.',
    basicRequiresWDL:
      'Der Basis-Modus erfordert WDL-Eingabe. Bitte zu WDL wechseln.',
    close: 'Schließen',
    basicMode: 'Basis',
  },

  // Fehlermeldungen
  errors: {
    saveNotationFailed: 'Speichern der Notation fehlgeschlagen',
    openNotationFailed: 'Öffnen der Notation fehlgeschlagen',
    engineNotLoaded: 'Engine nicht geladen, Befehl kann nicht gesendet werden',
    engineSendUnavailable: 'Engine-Sendemethode nicht verfügbar',
    redDarkPiecesMismatch:
      'Fehler: Rot {darkCount} verdeckte > {poolCount} im Vorrat',
    blackDarkPiecesMismatch:
      'Fehler: Schwarz {darkCount} verdeckte > {poolCount} im Vorrat',
    pieceCountExceeded: 'Fehler: Gesamtanzahl für {pieceName} überschritten!',
    engineLoadFailed: 'Laden der Engine {name} fehlgeschlagen: {error}',
    jaiEngineLoadFailed:
      'Laden der JAI Match-Engine {name} fehlgeschlagen: {error}',
    engineUnloadFailed: 'Entladen der Engine fehlgeschlagen',
    failedToOpenFileSelector: 'Öffnen des Dateiwählers fehlgeschlagen',
    failedToProcessEngine: 'Verarbeitung der Engine-Datei fehlgeschlagen',
    invalidFenFormat: 'Ungültiges FEN-Format',
  },

  // Schachbrett unten
  chessboard: {
    copyFen: 'FEN kopieren',
    pasteFen: 'FEN einfügen',
    inputFen: 'FEN eingeben',
    inputCopyFen: 'Eingabe/Kopie FEN',
    newGame: 'Neues Spiel',
    copied: '✓ Kopiert',
    clearDrawings: 'Zeichnungen löschen',
  },

  // Bewertungsdiagramm
  evaluationChart: {
    title: 'Bewertungsdiagramm',
    rightClickHint: 'Rechtsklick für Optionen',
    longPressHint: 'Lange drücken für Optionen',
    showMoveLabels: 'Zug-Labels anzeigen',
    linearYAxis: 'Lineare Y-Achse',
    showOnlyLines: 'Nur Linien anzeigen',
    blackPerspective: 'Sicht von Schwarz',
    clampYAxis: 'Y-Achse beschränken',
    clampValue: 'Grenzwert',
    colorScheme: 'Farbschema',
    redGreen: 'Rot-Grün',
    blueOrange: 'Blau-Orange',
    showSeparateLines: 'Separate Linien für Rot & Schwarz',
    opening: 'Eröffnung',
    noData: 'Keine Analysedaten verfügbar',
    newGame: 'Neues Spiel',
    copied: '✓ Kopiert',
    saveChartImage: 'Diagramm speichern',
    chartImageSaved: 'Diagramm unter {path} gespeichert',
    saveChartImageFailed: 'Speichern fehlgeschlagen',
    viewMode: 'Ansichtsmodus',
    evaluation: 'Bewertung',
    time: 'Zeit',
    depth: 'Tiefe',
  },

  // Sprachauswahl
  languages: {
    current: 'Aktuelle Sprache',
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

  // Oberflächen-Einstellungen
  interfaceSettings: {
    title: 'Oberflächen-Einstellungen',
    showCoordinates: 'Koordinaten anzeigen',
    parseUciInfo: 'UCI-Info parsen',
    showAnimations: 'Zug-Animationen aktivieren',
    showPositionChart: 'Bewertungsdiagramm anzeigen',
    showEvaluationBar: 'Bewertungsbalken anzeigen',
    darkMode: 'Dunkelmodus',
    autosave: 'Automatisch in Autosave.json speichern',
    useNewFenFormat: 'Neues FEN-Format verwenden',
    engineLogLineLimit: 'Zeilenlimit für Engine-Log',
    validationTimeout: 'Engine-Validierungs-Timeout (ms)',
    showChineseNotation: 'Chinesische Notation anzeigen',
    showLuckIndex: 'Glücksindex anzeigen',
    showArrows: 'Pfeile anzeigen',
    enableSoundEffects: 'Soundeffekte aktivieren',
    soundVolume: 'Lautstärke',
    pieceStyle: 'Figurenstil',
    pieceStyles: {
      default: 'Standard',
      internationalized: 'Internationalisiert',
    },
  },

  // UCI Nachrichten
  uci: {
    depth: 'Tiefe',
    seldepth: 'SelTiefe',
    multipv: 'MultiPV',
    score: 'Bewertung',
    mate: 'Matt',
    wdl: 'S/R/N',
    nodes: 'Knoten',
    nps: 'NPS',
    hashfull: 'HashFull',
    tbhits: 'TB-Treffer',
    time: 'Zeit',
    pv: 'PV',
    checkmate: 'Matt! Keine Züge möglich.',
    bestMove: 'Bester Zug: {move}',
    noMoves: 'Keine Züge verfügbar',
    engineReady: 'Engine ist bereit',
  },

  // Spiel-Bestätigungen
  gameConfirm: {
    clearHistoryTitle: 'Nachfolgenden Verlauf löschen',
    clearHistoryMessage:
      'Sie machen einen Zug in einer historischen Position. Dadurch wird der gesamte nachfolgende Verlauf gelöscht. Möchten Sie fortfahren?',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
  },

  // Spielende Benachrichtigungen
  gameEnd: {
    humanWins: 'Herzlichen Glückwunsch! Sie haben gewonnen!',
    aiWins: 'Spiel vorbei - KI gewinnt',
    humanWinsMessage:
      'Sie haben die KI besiegt! Die KI hat keine legalen Züge mehr.',
    aiWinsMessage:
      'Die KI hat dieses Spiel gewonnen. Sie haben keine legalen Züge mehr.',
    ok: 'OK',
  },

  // Mensch vs KI Modus
  humanVsAi: {
    title: 'Mensch vs KI Modus',
    selectAiSide: 'KI-Seite wählen',
    redAiBlackHuman: 'Rot KI, Schwarz Mensch',
    blackAiRedHuman: 'Schwarz KI, Rot Mensch',
    options: 'Optionen',
    showEngineAnalysis: 'Engine-Analyse anzeigen',
    engineAnalysisHint:
      'Wenn aktiviert, können Sie die Analyseergebnisse sehen, aber es beeinflusst nicht die Spielregeln',
    ponderNote: 'Über Ponder:',
    ponderUnifiedHint:
      'Ponder verwendet globale Einstellungen, die in der Seitenleiste im normalen Modus umgeschaltet werden können',
    rulesTitle: 'Spielregeln',
    rule1: 'Zufälliger Aufdeck-Modus wird automatisch erzwungen',
    rule2:
      'Sie können nur die verdeckten Steine sehen, die Sie der KI schlagen',
    rule3: 'Die KI kann nur die verdeckten Steine sehen, die sie Ihnen schlägt',
    rule4: 'Kampf mit begrenzten Informationen nach Standard-Jieqi-Regeln',
    startGame: 'Spiel starten',
  },

  // Eröffnungsbibliothek
  openingBook: {
    title: 'Eröffnungsbibliothek',
    currentMoves: 'Züge in aktueller Position',
    manage: 'Verwalten',
    settings: 'Einstellungen',
    statistics: 'Statistiken',
    noMoves: 'Keine Buchzüge für die aktuelle Position',
    foundMoves: '{count} Züge gefunden',
    positions: 'Positionen',
    move: 'Zug',
    priority: 'Priorität',
    stats: 'S/R/N',
    allowed: 'Erlaubt',
    comment: 'Kommentar',
    addPosition: 'Aktuelle Position hinzufügen',
    editMove: 'Zug bearbeiten',
    addMove: 'Zug hinzufügen',
    moveUci: 'UCI-Zug',
    moveRequired: 'Zug ist erforderlich',
    invalidUci: 'Ungültiges UCI-Format',
    invalidMoveFormat:
      'Ungültiges Zugformat, bitte verwenden Sie das UCI-Format (z.B.: a1a2) oder das chinesische Notationsformat (z.B.: 炮二平五)',
    invalidLegalMove: 'Dieser Zug ist in der aktuellen Position nicht legal',
    wins: 'Siege',
    draws: 'Remis',
    losses: 'Niederlagen',
    import: 'Importieren',
    export: 'Exportieren',
    selectFile: 'Datei auswählen',
    format: 'Format',
    dangerZone: 'Gefahrenzone',
    clearAll: 'Alles löschen',
    confirmClear: 'Löschen bestätigen',
    clearWarning:
      'Dies wird alle Einträge in der Eröffnungsbibliothek dauerhaft löschen. Diese Aktion kann nicht rückgängig gemacht werden.',
    confirmDelete: 'Löschen bestätigen',
    deleteWarning:
      'Sind Sie sicher, dass Sie diesen Zug löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    enableInGame: 'Eröffnungsbibliothek im Spiel aktivieren',
    showMoves: 'Buchzüge anzeigen',
    show: 'Anzeigen',
    preferHighPriority: 'Züge mit hoher Priorität bevorzugen',
    totalPositions: 'Gesamtpositionen',
    totalMoves: 'Gesamtzüge',
    allowedMoves: 'Erlaubte Züge',
    disallowedMoves: 'Verbotene Züge',
    refreshStats: 'Statistiken aktualisieren',
    refresh: 'Aktualisieren',
    getBookMove: 'Zug aus Buch spielen',
    initializing: 'Initialisiere...',
    showLess: 'Weniger anzeigen',
    showMore: 'Mehr anzeigen',
    addMarkedMoves: 'Gezeichnete Züge hinzufügen',
    addMarkedMovesTitle: 'Gezeichnete Züge zur Bibliothek hinzufügen',
    markedMovesCount: '{count} gezeichnete legale Züge gefunden',
    noMarkedMoves: 'Keine gezeichneten legalen Züge gefunden',
    batchSettings: 'Stapel-Einstellungen',
  },
}
