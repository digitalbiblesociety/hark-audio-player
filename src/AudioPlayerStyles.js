const defaultClasses = {
  playerHeader: "",
  playerContainer: "w-full mx-auto max-w-7xl",
  bibleListContainer: "",
  chapterListContainer: "relative w-full max-w-4xl mx-auto",
  bibleListGrid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",

  bibleBlock: {
    wrapper: `flex flex-col justify-between text-sm text-center md:text-base lg:text-lg font-semibold text-black`,
    infoWrap: "flex flex-row justify-between gap-4 max-w-md w-full mx-auto bg-stone-100 border border-stone-200 mt-12 p-3",
    titleGroup: "flex-shrink truncate",
    vernacular: "truncate text-sm mb-1",
    title: "truncate text-2xl font-semibold",
    languageGroup: "",
    iso: "text-sm",
    buttonGroup: "flex flex-col justify-between",
  },

  container: "audio-player-container mx-auto max-w-7xl w-full",
  audio: "",
  controlsContainer: "controls-container flex flex-col",
  navRow: "flex flex-row items-center justify-center gap-4 py-4 bg-stone-100 border border-stone-200 w-full max-w-md mx-auto",
  prevBookButton: "prev-book-button flex justify-center items-center",
  nextBookButton: "next-book-button flex justify-center transform -scale-x-100 items-center",
  prevChapterButton: "prev-chapter-button flex justify-center items-center",
  nextChapterButton: "next-chapter-button flex justify-center transform -scale-x-100 items-center",
  playPauseButton: "play-pause-button flex justify-center items-center",
  playPauseIcon: "icon-play",
  controlRow2: "grid grid-cols-5 mb-1",
  leftControls: "flex flex-row justify-center items-center col-span-2 space-x-6",

  playbackRate: {
    wrapper: "flex mx-auto w-full max-w-md justify-center px-8 py-2 bg-stone-100 text-xs",
    display: "mx-1 text-stone-400 text-sm",
    increase: "w-6 h-6 border-2 rounded-2xl text-stone-500",
    decrease: "w-6 h-6 border-2 rounded-2xl text-stone-500",
    disabled: "opacity-50",
  },

  rightControls: "flex flex-row justify-center items-center col-span-2 space-x-6",
  playSpeedControl: "flex flex-row justify-center items-center text-xs",
  decrementIcon: "size-6",
  incrementIcon: "size-6",
  decreaseSpeedButton: `w-6 h-6 border-2 rounded-2xl hover:border-blue-600 dark:hover:border-white text-stone-500 dark:hover:text-white`,
  increaseSpeedButton: `w-6 h-6 border-2 rounded-2xl hover:border-blue-600 dark:hover:border-white text-stone-500 dark:hover:text-white`,
  prevSkipButton: `flex justify-center items-center text-stone-600 hover:text-blue-600`,
  nextSkipButton: `flex justify-center items-center transform -scale-x-100 text-stone-600 hover:text-blue-600`,

  progress: {
    container: "relative flex flex-col mx-auto w-full max-w-md justify-around px-1 pt-4 bg-stone-100 text-xs",
    barContainer: "flex flex-row justify-between relative z-10",
    barWrapper: "mx-auto min-w-80 mx-3 w-3/4 sm:w-5/6 h-3 rounded-lg relative border bg-gradient-to-br shadow-inner border-stone-300 from-white to-stone-200 dark:from-neutral-50 dark:to-stone-400 border-stone-500",
    barInner: "h-3 w-0 bg-blue-600 rounded-md",
    circleTip: "absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border border-blue-500",
    currentTimeDisplay: "text-black",
    durationDisplay: "text-black",
    timestamps: "flex w-5/6 mx-auto h-8 absolute inset-x-2 z-0 block my-4",
    tick: "absolute top-0 h-full",
    tickWrapper: "group relative h-full bg-stone-400 rounded-sm",
    tickLabel: "verse-label hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-xs bg-gray-200 text-gray-900 rounded-lg shadow border whitespace-nowrap",
  },

  mediaPlayerWrap: "w-full flex flex-col justify-center",
  mediaPlayerHeader: "",
  mediaPlayerBody: "",
  mediaPlayerNavRow: "grid grid-cols-5 px-2 text-stone-700 dark:text-stone-300 divide-x divide-stone-500 dark:divide-stone-600",
  bibleListNavButton: "",
  bookListNavButton: "",
  chapterListNavButton: "",

  volumeRow: "flex mx-auto w-full max-w-md justify-center items-center px-8 bg-stone-100 text-xs",
  volumeControl: "volume-control w-full",
  volumeInput: "w-full",
  volumeLabel: "flex flex-row pl-2 mx-4 w-1/2",

  selectBookChapterWrap: "relative bg-stone-100 flex flex-row gap-2 w-full max-w-md mx-auto",
  selectBook: "inline-flex items-center gap-x-1.5 bg-stone-100 hover:bg-stone-200 px-3 py-2 w-full",
  selectChapter: "inline-flex items-center text-center bg-stone-100 w-12 hover:bg-stone-200 border-none appearance-none",
  selectVerseSeparator: "inline-flex items-center bg-stone-100",
  selectVerse: "inline-flex items-center text-center bg-stone-100 w-12 hover:bg-stone-200 border-none appearance-none",

  bibleButton: {
    wrapper: "relative bg-stone-100 border border-stone-200 rounded min-h-20",
    button: "flex flex-row bg-stone-100 h-full w-full hover:bg-stone-200",
    languageWrap: "py-1 bg-stone-200 h-full w-24 flex flex-col justify-center items-center",
    language: "text-sm font-medium text-stone-900",
    iso: "truncate font-mono mt-1 text-sm text-stone-500",
    titleWrap: "py-1 h-full w-full flex flex-col justify-center items-center",
    title: "line-clamp-2 text-center text-sm font-medium text-stone-900",
    vernacular: "text-sm text-stone-500 max-w-64",
    download: "absolute text-stone-500 right-0 bottom-0 rounded-tl size-8 flex justify-center items-center bg-stone-200 hover:bg-stone-300",
  },

  bibleDownloadDialog: {
    wrapper: "p-4 shadow-lg text-center",
    button_download: "px-5 py-2 mx-1 bg-blue-500 text-white rounded cursor-pointer",
    cancel: "px-5 py-2 mx-1 bg-red-600 text-white rounded cursor-pointer",
    audio_copyright: "block text-stone-600",
    text_copyright: "block text-stone-600 text-sm",
  },

  sleepTimerButton: "sleep-timer-button group block py-1.5 px-1",
  sleepTimerDuration: "text-xs pl-1 pt-2 inline-block timer-display",
  sleepTimerWrap: "flex flex-row justify-center align-start text-stone-400 hover:text-blue-600",
  searchWrapper: "mx-auto flex items-center w-1/3 my-3",
  searchInput: "px-4 py-2 w-full max-w-7xl mx-auto bg-white border border-stone-200",

  searchInputContainer: "flex w-full max-w-xl mx-auto my-4",
  bookList: {
    container: "w-full",
    grid: "grid grid-cols-3 md:grid-cols-4 gap-2",
    button: "bg-stone-100 border rounded md:rounded-lg",
    buttonActive: "bg-stone-100 border border-stone-300",
    title: "font-medium text-sm lg:text-base",
    id: "w-full flex justify-end opacity-60 text-sm mr-8",
  },

  chapterButton: "bg-stone-100/90 w-12 h-12 m-2 border border-stone-700 rounded text-lg hover:bg-stone-300",
  chapterButtonActive: "bg-stone-500 text-stone-100",
};

/**
 * Merges custom CSS class definitions with a set of default classes. If a key in the custom classes starts
 * with an underscore, it will overwrite the corresponding default class after removing the underscore.
 * Keys without an underscore will simply merge by replacing the existing default with the custom class.
 *
 * @param {Object} customClasses - An object containing custom class definitions. Keys starting with
 *                 an underscore indicate classes that should overwrite default classes.
 * @returns {Object} An object containing the merged classes.
 */
export const mergeClasses = (customClasses = {}) => {
  const mergedClasses = { ...defaultClasses };
  for (const key of Object.keys(customClasses)) {
    if (key.startsWith("_")) {
      mergedClasses[key.substring(1)] = customClasses[key];
    } else {
      mergedClasses[key] = customClasses[key];
    }
  }

  return mergedClasses;
};

const defaultIcons = {
  speedSlow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30"><path d="M4.83 10.06a.67.67 0 1 0 0 1.34.67.67 0 0 0 0-1.34zm.56-2.02c.43 0 .85.09 1.22.28 1.07.55 1.4 1.46 1.64 2.4.3 1.22-.07 1.95.12 2.75.17.77 1.14 3.28 4.6 5.41 3.1 1.92 8.61 2.37 15.01.26.44-.14.87-.08 1 .72a13 13 0 0 0 .76 2.78c.15.36.2.66.1.93-.11.27-.35.43-.63.56-.93.42-1.77.6-2.73.63-.36.01-.65-.15-.84-.38a1.6 1.6 0 0 1-.3-.77c-.1-.65-.16-1.37-.16-2.08 0-.25-.13-.39-.4-.25a10.32 10.32 0 0 1-5.08 1.08 9.96 9.96 0 0 1-4.97-1.46c-.25-.16-.44-.02-.44.21-.02.74.03 1.52.14 2.25.06.4.04.71-.14.94-.17.24-.45.33-.76.38a6.5 6.5 0 0 1-2.88-.16 1.26 1.26 0 0 1-.85-.76 2.01 2.01 0 0 1-.1-.93c.13-1.23.06-2.66.69-3.97.17-.36.18-.54-.34-.62-2.83-.38-6.17-2.19-7.4-3.84a3.03 3.03 0 0 1-.54-1.1c-.07-.33-.05-.68.44-.48.58.24 1.24.21 1.88-.03.3-.12.16-.44-.15-.32-.53.16-1.11.05-1.64-.14-.43-.15-.6-.53-.67-.88-.09-.5.08-1 .33-1.38a4.84 4.84 0 0 1 1.8-1.71c.42-.2.86-.31 1.29-.32Zm9.17 1.25.53 2.31a12.91 12.91 0 0 0-2.73 4.28c-.17.5.28.74.41.4.59-1.49 1.6-3.16 2.67-4.3l3.5 1.42a8.7 8.7 0 0 0-.32 2.66c0 .94.1 1.83.12 2.5.02.41.54.4.52.04-.03-.69-.12-1.6-.12-2.54 0-.98.1-1.95.32-2.57l3.99-.54a13.05 13.05 0 0 1 2.63 4.57c.11.35.59.11.5-.16a13.5 13.5 0 0 0-2.67-4.68l1.84-1.84c1.01.45 2.03 1.6 2.75 2.78.4.66.7 1.33.9 1.86.1.26.14.52.18.77l.2-.08c.5-.2.85.02 1.01.42.21.52-.09.9-.47 1.07-7.3 3.24-13.8 2.76-17.06.75-3.33-2.06-4.2-4.46-4.35-5.07-.1-.42.14-.72.5-.83.43-.13.84.03 1.01.44.24-.62.8-1.65 1.29-2.13a5.37 5.37 0 0 1 2.85-1.53zm4.38-1.24c.5-.02 1.02 0 1.52.06 2 .24 3.86 1.1 4.76 2.48l-1.8 1.84-4.12.56-3.7-1.5-.54-2.37a7.93 7.93 0 0 1 3.88-1.07z" /></svg>`,
  speedFast: ``,
  sleepTimer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-7 h-7"><path d="M22.97 16.84h-3.25l3.56-3.26c.07-.05.1-.08.1-.14a.43.4 0 0 0-.37-.56h-4.38a.45.41 0 0 0 0 .82h3.29l-3.6 3.25a.43.4 0 0 0-.09.43.43.4 0 0 0 .4.25h4.34a.43.4 0 0 0 0-.79zm-6.44 1.98h-2.45l2.79-2.49a.43.4 0 0 0 .06-.45.43.4 0 0 0-.4-.26h-3.48a.45.41 0 0 0 0 .82h2.48l-2.79 2.5-.06.14a.31.28 0 0 0 0 .28.43.4 0 0 0 .37.28h3.5a.45.41 0 0 0 0-.82zm2.75 3.9h-1.42l1.73-1.55.1-.14v-.28a.43.4 0 0 0-.44-.29h-2.48a.43.4 0 0 0 0 .8h1.43l-1.74 1.55a.43.4 0 0 0-.09.46.43.4 0 0 0 .4.22h2.48a.43.4 0 0 0 0-.79z" style="stroke-width:.296239"/></svg>`,
  chapters: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" /></svg>`,
  bibles: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>`,
  books: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" /></svg>`,
  Book: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="w-7 h-7 hover:text-blue-600 dark:hover:text-blue-300" viewBox="0 0 23 13"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M22 2.7c0-.9-1-1.4-1.7-1l-7 4a1.1 1.1 0 0 0 0 2l7 4a1.1 1.1 0 0 0 1.7-.9V2.7h0Zm-9.7 0c0-.9-1-1.4-1.7-1l-7.1 4a1.1 1.1 0 0 0 0 2l7 4a1.1 1.1 0 0 0 1.8-.9V2.7h0Z"/><path d="M1.5 1v11"/></g></svg>`,
  Chapter: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7"><path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" /></svg>`,
  Skip: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7 hover:text-blue-600 dark:hover:text-blue-300"><path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" /></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 hover:text-blue-400" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.3 5.7c0-.9.9-1.4 1.6-1L18.5 11a1.1 1.1 0 0 1 0 2L6.9 19.3a1.1 1.1 0 0 1-1.6-1V5.7z"/></svg>`,
  pause: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 hover:text-blue-600 dark:hover:text-blue-300" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.8 5.3v13.4M8.2 5.3v13.4"/></svg>`,
  volumeIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-5" viewBox="0 0 20 20"><path d="M11 4a1 1 0 0 0-2-1L5 7H3a1 1 0 0 0-1 0 7 7 0 0 0 0 3v3h3l4 4a1 1 0 0 0 2-1V4Zm5 1a1 1 0 0 0-1 1 6 6 0 0 1 0 8 1 1 0 0 0 1 1 7 7 0 0 0 0-10Z"/><path d="M14 7a1 1 0 0 0-1 1 3 3 0 0 1 0 4 1 1 0 0 0 1 1 4 4 0 0 0 0-6Z"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M2 4.75C2 3.784 2.784 3 3.75 3h4.836c.464 0 .909.184 1.237.513l1.414 1.414a.25.25 0 0 0 .177.073h4.836c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 16.25 17H3.75A1.75 1.75 0 0 1 2 15.25V4.75Zm8.75 4a.75.75 0 0 0-1.5 0v2.546l-.943-1.048a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.114 0l2.25-2.5a.75.75 0 1 0-1.114-1.004l-.943 1.048V8.75Z" clip-rule="evenodd" /></svg>`,
};

export const mergeIcons = (customIcons = {}) => {
  const mergedIcons = { ...defaultIcons };
  for (const key of Object.keys(customIcons)) {
    mergedIcons[key] = customIcons[key];
  }
  return mergedIcons;
};

const defaultArt = {};
export const mergeArt = (customArt = {}) => {
  const mergedArt = { ...defaultArt };
  for (const key of Object.keys(customArt)) {
    mergedArt[key] = customArt[key];
  }
  return mergedArt;
};
