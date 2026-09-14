export default {
  // Общее
  common: {
    confirm: 'Подтвердить',
    cancel: 'Отмена',
    close: 'Закрыть',
    save: 'Сохранить',
    open: 'Открыть',
    refresh: 'Обновить',
    reset: 'Сброс',
    clear: 'Очистить',
    apply: 'Применить',
    execute: 'Выполнить',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    warning: 'Предупреждение',
    info: 'Информация',
    delete: 'Удалить',
    add: 'Добавить',
    actions: 'Действия',
    required: 'Это поле обязательно',
  },

  // Верхняя панель инструментов
  toolbar: {
    newGame: 'Новая игра',
    copyFen: 'Коп. FEN',
    inputFen: 'Ввод FEN',
    editPosition: 'Ред. позицию',
    uciSettings: 'Настройки UCI',
    analysisParams: 'Параметры анализа',
    saveNotation: 'Сохранить партию',
    openNotation: 'Открыть партию',
    interfaceSettings: 'Интерфейс',
    gameTitle: 'Игра Цзецзи (Jieqi)',
    variation: 'Запретить текущий ход',
    analyzeDrawings: 'Анализ нарисованных ходов',
    noDrawingMoves: 'Нет допустимых нарисованных ходов',
    noMoreVariations: 'Больше нет доступных вариантов',
    darkMode: 'Тёмная тема',
    lightMode: 'Светлая тема',
    viewPasteNotation: 'Просмотр/Ввод нотации',
    reviewAnalysis: 'Обзор анализа',
    openingBook: 'Дебютная книга',
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

  // Диалог опций UCI
  uciOptions: {
    title: 'Опции UCI движка',
    loadingText: 'Загрузка опций движка...',
    noEngineLoaded: 'Движок не загружен.',
    pleaseLoadEngineFirst: 'Сначала загрузите движок для настройки его опций.',
    loadEngine: 'Загрузить движок',
    noOptionsAvailable: 'Для этого движка нет доступных опций UCI.',
    refreshOptions: 'Обновить опции',
    range: 'Диапазон',
    execute: 'Выполнить',
    resetToDefaults: 'По умолчанию',
    clearSettings: 'Очистить настройки',
    confirmClearSettings:
      'Вы уверены, что хотите очистить все настройки UCI для текущего движка? Это действие необратимо.',
    settingsCleared: 'Настройки UCI очищены',
    // Описания опций UCI
    optionDescriptions: {
      'Debug Log File':
        'Файл отладки, в который записывается взаимодействие между движком и интерфейсом.',
      Threads:
        'Количество потоков для поиска. Рекомендуется установить значение, равное количеству доступных потоков системы минус 1 или 2.',
      Hash: 'Размер хеш-таблицы движка (в МБ). Рекомендуется установить значение, равное общему объему доступной памяти минус 1-2 ГБ.',
      'Clear Hash': 'Очищает хеш-таблицу.',
      MultiPV:
        'Multi-Principal Variation (Многовариантный анализ). Позволяет движку показывать несколько лучших ходов. Рекомендуется значение 1. При больших значениях сила игры может снизиться из-за распределения ресурсов.',
      NumaPolicy:
        'Привязывает потоки к конкретным узлам NUMA. Улучшает производительность на системах с несколькими процессорами или сложной архитектурой памяти.',
      Ponder: 'Разрешает движку думать во время хода противника.',
      'Move Overhead':
        'Задержка в миллисекундах, учитывающая сетевые задержки и работу интерфейса. Полезно для предотвращения просрочки времени.',
      nodestime:
        'Указывает движку использовать количество узлов вместо реального времени для расчета прошедшего времени. Полезно для тестов.',
      UCI_ShowWDL:
        'Если включено, показывает статистику WDL (Победа/Ничья/Поражение). Эти числа моделируют ожидаемый результат игры на основе оценки движка.',
      EvalFile:
        'Имя файла параметров оценки NNUE. В зависимости от GUI может потребоваться полный путь к файлу.',
    },
  },

  // Диалог обзора анализа
  reviewDialog: {
    title: 'Обзор анализа',
    movetime: 'Время на ход (мс)',
    progress: 'Прогресс: {current}/{total}',
  },

  // Терминал UCI
  uciTerminal: {
    title: 'Терминал UCI',
    enterCommand: 'Введите команду UCI...',
    sendCommand: 'Отправить',
    noEngineLoaded: 'Движок не загружен.',
    pleaseLoadEngineFirst: 'Загрузите движок для использования терминала.',
    quickCommands: 'Быстрые команды',
    clear: 'Очистить терминал',
    commandHistory: 'История команд',
    terminalOutput: 'Вывод терминала',
  },

  // Диалог времени
  timeDialog: {
    title: 'Параметры анализа движка',
    movetime: 'Время на ход (мс)',
    maxThinkTime: 'Макс. время раздумья (мс)',
    maxDepth: 'Макс. глубина',
    maxNodes: 'Макс. узлов',
    analysisMode: 'Режим анализа',
    advanced: 'Скрипт',
    resetToDefaults: 'По умолчанию',
    clearSettings: 'Очистить',
    confirmClearSettings:
      'Вы уверены, что хотите очистить все параметры анализа? Это действие необратимо.',
    settingsCleared: 'Параметры анализа очищены',
    analysisModes: {
      movetime: 'По времени на ход',
      maxThinkTime: 'По макс. времени',
      depth: 'По глубине',
      nodes: 'По количеству узлов',
      advanced: 'Расширенный режим (скрипт)',
    },
    advancedHint1:
      'Поддержка простого программирования: присваивание, арифметика, битовые операции, условия if',
    advancedHint2:
      'Доступные переменные: movetime, depth, nodes, maxThinkTime, prev',
    advancedPlaceholder: 'Напишите ваш скрипт здесь...',
    advancedExamples: {
      title: 'Примеры кода',
      basic: 'Базовые настройки',
      basicCode: `depth=20
movetime=1000
nodes=2000000`,
      conditional: 'Условное управление',
      conditionalCode: `if (!prev.prev.exists()){
  movetime=1000
} else {
  movetime=prev.prev.movetime / 1.05
}`,
      scoreBased: 'Корректировка по оценке',
      scoreBasedCode: `if (-prev.score < -300){
  movetime = 4000
} else if (-prev.score < -200) {
  movetime = 3000
} else {
  movetime = 2000
}`,
      variables: 'Переменные',
      variablesDesc: `prev.exists() - существует ли предыдущий ход
prev.movetime - запрошенное время пред. хода
prev.depth - глубина поиска пред. хода
prev.nodes - кол-во узлов пред. хода
prev.score - оценка пред. хода
prev.timeUsed - реально затраченное время
prev.prev - пред-предыдущий ход (вложенность)`,
    },
  },

  // Редактор позиции
  positionEditor: {
    title: 'Редактор позиции',
    flipBoard: '🔄 Перевернуть',
    mirrorLeftRight: '↔️ Отразить (Л/П)',
    switchSide: '⚡ Сменить ход',
    resetPosition: '🔄 Сброс',
    clearPosition: '🔄 Очистить',
    recognizeImage: '🖼️ Распознать',
    addPieces: 'Добавить фигуры',
    revealedPieces: 'Открытые фигуры',
    darkPieces: 'Тёмные фигуры',
    darkPiece: 'Тёмная',
    selectedPosition: 'Выбранная позиция',
    selectedPiece: 'Выбранная фигура',
    clickToPlace: 'Нажмите для размещения',
    piece: 'Фигура',
    currentSide: 'Сейчас ходят',
    redToMove: 'Красные',
    blackToMove: 'Чёрные',
    imageRecognition: 'Распознавание изображения',
    clickOrDragImage: 'Нажмите или перетащите изображение сюда',
    supportedFormats: 'Поддержка JPG, PNG и др.',
    startRecognition: 'Начать',
    applyResults: 'Применить',
    recognitionResults: 'Результаты',
    imageRecognitionStatus: {
      loadingModel: 'Загрузка модели...',
      modelLoadedSuccessfully: 'Модель загружена',
      modelLoadingFailed: 'Ошибка загрузки модели: {error}',
      loadingImage: 'Загрузка изображения...',
      preprocessingImage: 'Обработка изображения...',
      runningModelInference: 'Запуск нейросети...',
      postProcessingResults: 'Обработка результатов...',
      recognitionCompleted: 'Готово!',
      processingFailed: 'Ошибка обработки: {error}',
      unknownError: 'Неизвестная ошибка',
    },
    showBoundingBoxes: 'Показать границы',
    preserveDarkPools: 'Сохранять пулы тёмных фигур',
    validationStatus: {
      normal: 'Норма',
      error: 'Ошибка: Несовпадение кол-ва тёмных фигур',
      noRedKing: 'Ошибка: Нет красного короля',
      noBlackKing: 'Ошибка: Нет чёрного короля',
      kingOutOfPalace: 'Ошибка: Король вне дворца',
      kingFacing: 'Ошибка: Короли смотрят друг на друга',
      inCheck: 'Ошибка: Король под шахом',
      tooManyPieces: 'Ошибка: Слишком много фигур этого типа',
      tooManyTotalPieces: 'Ошибка: Всего фигур больше 16',
      darkPieceInvalidPosition: 'Ошибка: Тёмная фигура в неверной позиции',
      duplicatePosition: 'Ошибка: Повторяющиеся позиции фигур',
    },
    cancel: 'Отмена',
    applyChanges: 'Применить',
    clear: 'Очистить',
    pieces: {
      red_chariot: 'Кр. Ладья',
      red_horse: 'Кр. Конь',
      red_elephant: 'Кр. Слон',
      red_advisor: 'Кр. Советник',
      red_king: 'Кр. Король',
      red_cannon: 'Кр. Пушка',
      red_pawn: 'Кр. Пешка',
      black_chariot: 'Чёрн. Ладья',
      black_horse: 'Чёрн. Конь',
      black_elephant: 'Чёрн. Слон',
      black_advisor: 'Чёрн. Советник',
      black_king: 'Чёрн. Король',
      black_cannon: 'Чёрн. Пушка',
      black_pawn: 'Чёрн. Пешка',
      unknown: 'Тёмная',
      red_unknown: 'Кр. Тёмная',
      black_unknown: 'Чёрн. Тёмная',
    },
  },

  // Ввод FEN
  fenInput: {
    title: 'Ввод FEN строки',
    placeholder: 'Введите строку FEN...',
    confirm: 'OK',
    cancel: 'Отмена',
  },

  // Диалог JSON нотации
  notationTextDialog: {
    title: 'Просмотр / Ввод нотации (JSON)',
    placeholder:
      'Здесь будет отображаться JSON текущей партии. Вы можете скопировать его или вставить свой JSON и нажать "Применить".',
    copy: 'Копировать JSON',
    apply: 'Применить',
  },

  // Подсказка переворота
  flipPrompt: {
    title: 'Переворот фигуры',
    message: 'Выберите фигуру для переворота',
    confirm: 'Подтвердить',
    cancel: 'Отмена',
  },

  // О программе
  about: {
    title: 'О программе JieqiBox',
    version: 'Версия',
    description:
      'Современное настольное приложение для анализа и игры в Цзецзи (Jieqi), созданное на Tauri и Vue 3.',
    author: 'Автор',
    license: 'Лицензия',
    github: 'GitHub',
    downloadLatest: 'Скачать последнюю версию',
    viewLicense: 'Посмотреть лицензию',
    credits: 'Благодарности',
    piecesCredit: 'Дизайн фигур: Couch Tomato',
    checkUpdate: 'Проверить обновления',
    checkingUpdate: 'Проверка обновлений...',
    updateAvailable: 'Доступна новая версия: {version}',
    upToDate: 'У вас установлена последняя версия.',
    updateError: 'Не удалось проверить обновления.',
  },

  // Боковая панель анализа
  analysis: {
    title: 'Анализ движка',
    startAnalysis: 'Старт',
    stopAnalysis: 'Стоп',
    engineNotLoaded: 'Движок не загружен',
    loadEngine: 'Загрузить',
    loadEngineSaf: 'Загрузить (SAF)',
    analysisResults: 'Результаты',
    bestMove: 'Лучший ход',
    score: 'Оценка',
    depth: 'Глубина',
    nodes: 'Узлы',
    time: 'Время',
    pv: 'Вариант (PV)',
    engineLoaded: 'Движок готов',
    playBestMove: 'Сделать лучший ход',
    undoMove: 'Вернуть ход',
    redAiOn: 'Красный ИИ (Вкл)',
    redAiOff: 'Красный ИИ (Выкл)',
    blackAiOn: 'Чёрный ИИ (Вкл)',
    blackAiOff: 'Чёрный ИИ (Выкл)',
    freeFlipMode: 'Свободный переворот',
    darkPiecePool: 'Пул (взятых) тёмных',
    captureHistory: 'История взятий',
    myCaptured: 'Я взял',
    opponentCaptured: 'Оппонент взял',
    noCaptured: 'Нет',
    engineAnalysis: 'Анализ',
    notation: 'Нотация',
    moveComments: 'Комментарии',
    noComment: 'Нет комментариев',
    enterComment: 'Введите комментарий...',
    saveComment: 'Сохранить',
    cancelComment: 'Отмена',
    opening: 'Дебют',
    adjustment: 'Настройка',
    engineLog: 'Лог движка',
    uciTerminal: 'Терминал',
    about: 'О прог.',
    undockPanel: 'Открепить панель',
    dockPanel: 'Закрепить панель',
    restorePanels: 'Сброс макета',
    flipBoard: 'Перевернуть доску',
    flipBoardBack: 'Вернуть ориентацию',
    ponderMode: 'Ponder (Фон)',
    selectEngine: 'Выбрать движок',
    manageEngines: 'Управление',
    unloadEngine: 'Выгрузить',
    noEngineLoaded: 'Движок не загружен.',
    // Режим матча
    enterMatchMode: 'Режим матча',
    exitMatchMode: 'Выйти из матча',
    // Человек против ИИ
    enterHumanVsAiMode: 'Человек vs ИИ',
    exitHumanVsAiMode: 'Выйти из Человек vs ИИ',
    startMatch: 'Начать матч',
    stopMatch: 'Стоп матч',
    jaiSettings: 'Настройки матча',
    matchInfo: 'Инфо о матче',
    multiPv: 'MultiPV',
    fullLine: 'Полная линия',
    matchStatus: 'Статус',
    gameProgress: 'Прогресс',
    engineInfo: 'Движок',
    lastResult: 'Результат',
    matchWld: 'Статистика (W/L/D)',
    eloRating: 'Рейтинг Elo',
    eloCalculator: 'Калькулятор Elo',
    matchEngines: 'Движки',
    running: 'Запущен',
    stopped: 'Остановлен',
    noMatchEngine: 'Матчевый движок не загружен',
    noAnalysis: 'Нет данных',
    // Индекс удачи
    luckIndex: 'Индекс удачи',
    luckIndexBasedOnFlipSequence:
      'Оценка на основе последовательности переворотов',
    blackFavor: 'В пользу Чёрных',
    redFavor: 'В пользу Красных',
    currentValue: 'Текущее знач.',
    // Навигация
    goToFirst: 'К первому ходу',
    goToPrevious: 'Предыдущий ход',
    goToNext: 'Следующий ход',
    goToLast: 'К последнему ходу',
    play: 'Воспроизвести',
    pause: 'Пауза',
    annotateMove: 'Оценка хода',
    // Оценки ходов
    brilliant: 'Блестяще',
    good: 'Хорошо',
    interesting: 'Интересно',
    dubious: 'Сомнительно',
    mistake: 'Ошибка',
    blunder: 'Зевок',
    clear: 'Очистить',
  },

  // Менеджер движков
  engineManager: {
    title: 'Менеджер движков',
    addEngine: 'Добавить',
    addEngineAndroid: 'Добавить (SAF)',
    editEngine: 'Редактировать',
    engineName: 'Имя движка',
    enginePath: 'Путь к файлу',
    arguments: 'Аргументы запуска',
    actions: 'Действия',
    confirmDeleteTitle: 'Подтверждение удаления',
    confirmDeleteMessage:
      'Вы уверены, что хотите удалить движок "{name}"? Это действие необратимо.',
    promptEngineName: 'Введите уникальное имя для движка:',
    promptEngineArgs: 'Введите аргументы командной строки (опционально):',
    promptHasNnue: 'Использует ли этот движок файл NNUE? (y/n):',
    promptNnueFile: 'Выберите файл NNUE:',
    nameExists: 'Это имя уже существует. Пожалуйста, выберите другое.',
    engineAddedSuccess: 'Движок {name} успешно добавлен!',
  },

  // Редактор сохраненных UCI опций
  uciEditor: {
    title: 'Сохраненные опции UCI',
    noSaved:
      'Нет сохраненных опций. Добавьте их ниже для предварительной настройки перед загрузкой движка.',
    addOption: 'Добавить опцию',
    optionName: 'Имя опции',
    optionValue: 'Значение',
    type: 'Тип',
    typeString: 'Строка',
    typeNumber: 'Число',
    typeSwitch: 'Переключатель',
    typeCombo: 'Список (Combo)',
    typeButton: 'Кнопка',
    willExecute: 'Выполнять при загрузке',
    noExecute: 'Не выполнять',
  },

  // Опции матча JAI
  jaiOptions: {
    title: 'Опции матча JAI',
    loadingText: 'Загрузка опций...',
    noEngineLoaded: 'Матчевый движок не загружен.',
    pleaseLoadEngineFirst: 'Сначала загрузите матчевый движок.',
    loadEngine: 'Загрузить движок',
    noOptionsAvailable: 'Нет доступных опций JAI.',
    refreshOptions: 'Обновить',
    range: 'Диапазон',
    execute: 'Выполнить',
    resetToDefaults: 'Сброс',
    clearSettings: 'Очистить',
    confirmClearSettings:
      'Вы уверены, что хотите очистить все настройки JAI? Это действие необратимо.',
    settingsCleared: 'Настройки JAI очищены',
    // Описания опций JAI
    optionDescriptions: {
      Engine1Path: 'Полный путь к первому UCI-совместимому движку Цзецзи.',
      Engine1Options:
        'Строка команд UCI "setoption" для Движка 1. Формат: "name <Имя> value <Значение>". Разделяйте пробелами. Пример: "name Threads value 4 name Hash value 256"',
      Engine2Path: 'Полный путь ко второму UCI-совместимому движку Цзецзи.',
      Engine2Options:
        'Строка команд UCI "setoption" для Движка 2. См. формат в "Engine1Options".',
      TotalRounds:
        'Количество партий (пар). Так как в каждом раунде движки меняются цветами, общее число игр будет "TotalRounds * 2".',
      Concurrency: 'Количество игр, запускаемых параллельно.',
      BookFile:
        'Путь к файлу дебютной книги (FEN строки). Если путь пуст или неверен, используется начальная позиция.',
      MainTimeMs: 'Основное время на обдумывание для каждого игрока (в мс).',
      IncTimeMs: 'Добавление времени за каждый ход (в мс).',
      TimeoutBufferMs:
        'Буферное время (мс) для компенсации задержек процесса. Поражение по времени засчитывается, только если часы упадут ниже "-(TimeoutBufferMs)".',
      Logging:
        'Если включено ("true"), создаются подробные лог-файлы для каждого процесса движка.',
      SaveNotation: 'Включает сохранение файлов нотации для каждой игры.',
      SaveNotationDir: 'Папка для сохранения файлов нотации.',
      TimeControl: 'Настройки контроля времени для каждого движка.',
      AdjudicationRule:
        'Правила присуждения ничьей или победы в затянувшихся позициях.',
    },
  },

  // Сообщения JAI
  jai: {
    engineReady: 'Матчевый движок готов',
    matchStarted: 'Матч начался',
    matchStopped: 'Матч остановлен',
    gameProgress: 'Игра {current} из {total}',
    matchResult: 'Результат матча: {result}',
  },

  // Калькулятор Elo
  eloCalculator: {
    title: 'Калькулятор Elo',
    inputSection: 'Результаты матча',
    wins: 'Победы',
    losses: 'Поражения',
    draws: 'Ничьи',
    totalGames: 'Всего игр',
    resultsFormat: 'Формат результатов',
    formatWDL: 'WDL (Победы/Ничьи/Поражения)',
    formatPTNML: 'PTNML (Пары)',
    ptnml: {
      ll: 'LL (Пораж+Пораж)',
      lddl: 'LD+DL (Пораж+Ничья)',
      center: 'LW+DD+WL (Размен/Ничьи)',
      dwwd: 'DW+WD (Ничья+Победа)',
      ww: 'WW (Победа+Победа)',
    },
    resultsSection: 'Показатели Elo',
    performance: 'Разница Elo (с ошибкой 95%)',
    confidenceInterval: '95% Доверительный интервал',
    scoreRate: 'Процент очков',
    los: 'LOS (Вероятность превосходства)',
    drawRatio: 'Процент ничьих',
    standardError: 'Стандартная ошибка',
    noResults: 'Введите результаты для расчета.',
    basicRequiresWDL: 'Базовый режим требует ввода WDL.',
    close: 'Закрыть',
    basicMode: 'Базовый',
  },

  // Сообщения об ошибках
  errors: {
    saveNotationFailed: 'Не удалось сохранить партию',
    openNotationFailed: 'Не удалось открыть партию',
    engineNotLoaded: 'Движок не загружен, невозможно отправить команду',
    engineSendUnavailable: 'Метод отправки недоступен',
    redDarkPiecesMismatch:
      'Ошибка: Красных тёмных {darkCount} > пул {poolCount}',
    blackDarkPiecesMismatch:
      'Ошибка: Чёрных тёмных {darkCount} > пул {poolCount}',
    pieceCountExceeded: 'Ошибка: Превышено количество фигур {pieceName}!',
    engineLoadFailed: 'Ошибка загрузки движка {name}: {error}',
    jaiEngineLoadFailed: 'Ошибка загрузки матчевого движка {name}: {error}',
    engineUnloadFailed: 'Ошибка выгрузки движка',
    failedToOpenFileSelector: 'Не удалось открыть выбор файла',
    failedToProcessEngine: 'Не удалось обработать файл движка',
    invalidFenFormat: 'Неверный формат FEN',
  },

  // Нижняя панель доски
  chessboard: {
    copyFen: 'Коп. FEN',
    pasteFen: 'Вст. FEN',
    inputFen: 'Ввод FEN',
    inputCopyFen: 'Ввод/Копия FEN',
    newGame: 'Новая игра',
    copied: '✓ Скопировано',
    clearDrawings: 'Очистить рисунки',
  },

  // График оценки
  evaluationChart: {
    title: 'График оценки',
    rightClickHint: 'ПКМ для опций',
    longPressHint: 'Долгое нажатие для опций',
    showMoveLabels: 'Метки ходов',
    linearYAxis: 'Линейная ось Y',
    showOnlyLines: 'Только линии',
    blackPerspective: 'Со стороны Чёрных',
    clampYAxis: 'Ограничить ось Y',
    clampValue: 'Значение ограничения',
    colorScheme: 'Цветовая схема',
    redGreen: 'Красно-Зеленая',
    blueOrange: 'Сине-Оранжевая',
    showSeparateLines: 'Отдельные линии (Крас/Чёрн)',
    opening: 'Дебют',
    noData: 'Нет данных анализа',
    newGame: 'Новая игра',
    copied: '✓ Скопировано',
    saveChartImage: 'Сохранить изображение',
    chartImageSaved: 'Изображение сохранено в {path}',
    saveChartImageFailed: 'Не удалось сохранить',
    viewMode: 'Режим просмотра',
    evaluation: 'Оценка',
    time: 'Время',
    depth: 'Глубина',
  },

  // Выбор языка
  languages: {
    current: 'Текущий язык',
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

  // Настройки интерфейса
  interfaceSettings: {
    title: 'Настройки интерфейса',
    showCoordinates: 'Показать координаты',
    parseUciInfo: 'Парсить UCI Info',
    showAnimations: 'Анимация ходов',
    showPositionChart: 'Показать график',
    showEvaluationBar: 'Показать панель оценки',
    darkMode: 'Тёмная тема',
    autosave: 'Автосохранение в Autosave.json',
    useNewFenFormat: 'Новый формат FEN',
    engineLogLineLimit: 'Лимит строк лога движка',
    validationTimeout: 'Таймаут проверки движка (мс)',
    showChineseNotation: 'Китайская нотация',
    showLuckIndex: 'Показать индекс удачи',
    showArrows: 'Показать стрелки',
    enableSoundEffects: 'Звуковые эффекты',
    soundVolume: 'Громкость',
    pieceStyle: 'Стиль фигур',
    pieceStyles: {
      default: 'По умолчанию',
      internationalized: 'Интернациональный',
    },
  },

  // Сообщения UCI
  uci: {
    depth: 'Глубина',
    seldepth: 'SelDepth',
    multipv: 'MultiPV',
    score: 'Оценка',
    mate: 'Мат',
    wdl: 'W/D/L',
    nodes: 'Узлы',
    nps: 'NPS',
    hashfull: 'HashFull',
    tbhits: 'TBHits',
    time: 'Время',
    pv: 'PV',
    checkmate: 'Мат! Ходов нет.',
    bestMove: 'Лучший ход: {move}',
    noMoves: 'Нет доступных ходов',
    engineReady: 'Движок готов',
  },

  // Подтверждения в игре
  gameConfirm: {
    clearHistoryTitle: 'Очистить историю',
    clearHistoryMessage:
      'Вы делаете ход в исторической позиции. Это очистит все последующие ходы. Продолжить?',
    confirm: 'Да',
    cancel: 'Нет',
  },

  // Конец игры
  gameEnd: {
    humanWins: 'Поздравляем! Вы победили!',
    aiWins: 'Игра окончена - ИИ победил',
    humanWinsMessage:
      'Вы победили ИИ! У компьютера не осталось допустимых ходов.',
    aiWinsMessage: 'ИИ выиграл эту партию. У вас не осталось допустимых ходов.',
    ok: 'ОК',
  },

  // Режим Человек против ИИ
  humanVsAi: {
    title: 'Режим Человек vs ИИ',
    selectAiSide: 'Выбор стороны ИИ',
    redAiBlackHuman: 'ИИ: Красные, Вы: Чёрные',
    blackAiRedHuman: 'ИИ: Чёрные, Вы: Красные',
    options: 'Опции',
    showEngineAnalysis: 'Показать анализ движка',
    engineAnalysisHint:
      'Если включено, вы видите анализ, но это не влияет на правила игры',
    ponderNote: 'О Ponder:',
    ponderUnifiedHint:
      'Ponder использует глобальные настройки, переключается в боковой панели обычного режима',
    rulesTitle: 'Правила игры',
    rule1: 'Автоматически включается режим случайного переворачивания',
    rule2: 'Вы видите только те тёмные фигуры, которые съели у ИИ',
    rule3: 'ИИ видит только те тёмные фигуры, которые съел у вас',
    rule4: 'Битва с ограниченной информацией по правилам Цзецзи',
    startGame: 'Начать игру',
  },

  // Дебютная книга
  openingBook: {
    title: 'Дебютная книга',
    currentMoves: 'Ходы в текущей позиции',
    manage: 'Управление',
    settings: 'Настройки',
    statistics: 'Статистика',
    noMoves: 'Нет ходов в книге для текущей позиции',
    foundMoves: 'Найдено ходов: {count}',
    positions: 'Позиции',
    move: 'Ход',
    priority: 'Приоритет',
    stats: 'В/Н/П',
    allowed: 'Разрешено',
    comment: 'Коммент.',
    addPosition: 'Добавить позицию',
    editMove: 'Ред. ход',
    addMove: 'Добавить ход',
    moveUci: 'Ход UCI',
    moveRequired: 'Ход обязателен',
    invalidUci: 'Неверный формат UCI',
    invalidMoveFormat:
      'Неверный формат. Используйте UCI (напр. a1a2) или китайскую нотацию.',
    invalidLegalMove: 'Этот ход недопустим в текущей позиции',
    wins: 'Победы',
    draws: 'Ничьи',
    losses: 'Поражения',
    import: 'Импорт',
    export: 'Экспорт',
    selectFile: 'Выбрать файл',
    format: 'Формат',
    dangerZone: 'Опасная зона',
    clearAll: 'Очистить всё',
    confirmClear: 'Подтвердить очистку',
    clearWarning:
      'Это навсегда удалит все записи в дебютной книге. Действие необратимо.',
    confirmDelete: 'Подтвердить удаление',
    deleteWarning:
      'Вы уверены, что хотите удалить этот ход? Действие необратимо.',
    enableInGame: 'Использовать книгу в игре',
    showMoves: 'Показывать ходы книги',
    show: 'Показать',
    preferHighPriority: 'Предпочитать высокий приоритет',
    totalPositions: 'Всего позиций',
    totalMoves: 'Всего ходов',
    allowedMoves: 'Разрешенные ходы',
    disallowedMoves: 'Запрещенные ходы',
    refreshStats: 'Обновить статистику',
    refresh: 'Обновить',
    getBookMove: 'Сделать ход из книги',
    initializing: 'Инициализация...',
    showLess: 'Свернуть',
    showMore: 'Развернуть',
    addMarkedMoves: 'Добавить нарисованные',
    addMarkedMovesTitle: 'Добавить нарисованные ходы в книгу',
    markedMovesCount: 'Найдено {count} допустимых нарисованных ходов',
    noMarkedMoves: 'Нет допустимых нарисованных ходов',
    batchSettings: 'Пакетные настройки',
  },
}
