const re = {
  playerContainer: "w-full mx-auto max-w-7xl",
  controlsContainer: "controls-container flex flex-col",
  mediaPlayerWrap: "w-full flex flex-col justify-center",
  bibleListContainer: "",
  bibleListGrid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
  bibleListNavButton: "bible-list-nav",
  selectBookChapterWrap: "relative bg-stone-100 flex flex-row gap-2 w-full max-w-md mx-auto",
  selectBook: "inline-flex items-center gap-x-1.5 bg-stone-100 hover:bg-stone-200 px-3 py-2 w-full",
  selectChapter: "inline-flex items-center text-center bg-stone-100 w-12 hover:bg-stone-200 border-none appearance-none",
  selectVerseSeparator: "inline-flex items-center bg-stone-100",
  selectVerse: "inline-flex items-center text-center bg-stone-100 w-12 hover:bg-stone-200 border-none appearance-none",
  controls: {
    navRow: "flex flex-row items-center justify-center gap-4 py-4 bg-stone-100 border border-stone-200 w-full max-w-md mx-auto",
    prevBookButton: "prev-book-button flex justify-center items-center",
    nextBookButton: "next-book-button flex justify-center transform -scale-x-100 items-center",
    prevChapterButton: "prev-chapter-button flex justify-center items-center",
    nextChapterButton: "next-chapter-button flex justify-center transform -scale-x-100 items-center",
    playPauseButton: "play-pause-button flex justify-center items-center",
    playPauseIcon: "icon-play",
    prevSkipButton: "flex justify-center items-center text-stone-600 hover:text-blue-600",
    nextSkipButton: "flex justify-center items-center transform -scale-x-100 text-stone-600 hover:text-blue-600"
  },
  chapterList: {
    navButton: "chapter-list-nav",
    container: "relative w-full max-w-4xl mx-auto",
    button: "bg-stone-100/90 w-12 h-12 m-2 border border-stone-700 rounded text-lg hover:bg-stone-300",
    buttonActive: "bg-stone-500 text-stone-100"
  },
  bibleBlock: {
    wrapper: "flex flex-col justify-between text-sm text-center md:text-base lg:text-lg font-semibold text-black",
    infoWrap: "flex flex-row justify-between gap-4 max-w-md w-full mx-auto bg-stone-100 border border-stone-200 mt-12 p-3",
    titleGroup: "flex-shrink truncate",
    vernacular: "truncate text-sm mb-1",
    title: "truncate text-2xl font-semibold",
    languageGroup: "",
    iso: "text-sm",
    buttonGroup: "flex flex-col justify-between"
  },
  playbackRate: {
    wrapper: "flex mx-auto w-full max-w-md justify-center px-8 py-2 bg-stone-100 text-xs",
    display: "mx-1 text-stone-400 text-sm",
    increase: "w-6 h-6 border-2 rounded-2xl text-stone-500",
    decrease: "w-6 h-6 border-2 rounded-2xl text-stone-500",
    disabled: "opacity-50"
  },
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
    tickLabel: "verse-label hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-xs bg-gray-200 text-gray-900 rounded-lg shadow border whitespace-nowrap"
  },
  volume: {
    row: "flex mx-auto w-full max-w-md justify-center items-center px-8 bg-stone-100 text-xs",
    input: "w-full",
    label: "flex flex-row pl-2 mx-4 w-1/2"
  },
  bibleButton: {
    icon: "float-left",
    wrapper: "relative bg-stone-100 border border-stone-200 rounded min-h-20",
    button: "relative flex flex-row bg-stone-100 h-full w-full hover:bg-stone-200",
    country: "absolute bottom-1 left-22 block text-sm text-stone-600",
    languageWrap: "py-1 bg-stone-200 h-full w-24 flex flex-col justify-center items-center",
    language: "text-sm font-medium text-stone-900",
    iso: "truncate font-mono mt-1 text-sm text-stone-500",
    titleWrap: "py-1 h-full w-full flex flex-col justify-center items-center",
    title: "line-clamp-2 text-center text-sm font-medium text-stone-900",
    vernacular: "text-sm text-stone-500 max-w-64",
    download: "absolute text-stone-500 right-0 bottom-0 rounded-tl size-8 flex justify-center items-center bg-stone-200 hover:bg-stone-300"
  },
  bibleDownloadDialog: {
    wrapper: "p-4 shadow-lg text-center",
    button_download: "px-5 py-2 mx-1 bg-blue-500 text-white rounded cursor-pointer",
    cancel: "px-5 py-2 mx-1 bg-red-600 text-white rounded cursor-pointer",
    audio_copyright: "block text-stone-600",
    text_copyright: "block text-stone-600 text-sm"
  },
  sleepTimer: {
    button: "sleep-timer-button group block py-1.5 px-1",
    duration: "text-xs pl-1 pt-2 inline-block timer-display",
    wrap: "flex flex-row justify-center align-start text-stone-400 hover:text-blue-600"
  },
  search: {
    wrapper: "mx-auto flex items-center w-1/3 my-3",
    input: "px-4 py-2 w-full max-w-7xl mx-auto bg-white border border-stone-200",
    inputContainer: "flex w-full max-w-xl mx-auto my-4"
  },
  bookList: {
    navButton: "book-list-nav",
    container: "w-full",
    grid: "grid grid-cols-3 md:grid-cols-4 gap-2",
    button: "bg-stone-100 border rounded md:rounded-lg",
    buttonActive: "bg-stone-200 border border-stone-300",
    title: "font-medium text-sm lg:text-base",
    id: "w-full flex justify-end opacity-60 text-sm mr-8"
  },
  copyright: {
    container: "text-center my-12",
    copyrightAudio: "text-sm text-stone-700",
    copyrightText: "text-xs text-stone-500"
  }
}, ie = (e = {}) => {
  const t = { ...re };
  for (const n of Object.keys(e))
    n.startsWith("_") ? t[n.substring(1)] = e[n] : t[n] = e[n];
  return t;
}, le = {
  speedSlow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30"><path d="M4.83 10.06a.67.67 0 1 0 0 1.34.67.67 0 0 0 0-1.34zm.56-2.02c.43 0 .85.09 1.22.28 1.07.55 1.4 1.46 1.64 2.4.3 1.22-.07 1.95.12 2.75.17.77 1.14 3.28 4.6 5.41 3.1 1.92 8.61 2.37 15.01.26.44-.14.87-.08 1 .72a13 13 0 0 0 .76 2.78c.15.36.2.66.1.93-.11.27-.35.43-.63.56-.93.42-1.77.6-2.73.63-.36.01-.65-.15-.84-.38a1.6 1.6 0 0 1-.3-.77c-.1-.65-.16-1.37-.16-2.08 0-.25-.13-.39-.4-.25a10.32 10.32 0 0 1-5.08 1.08 9.96 9.96 0 0 1-4.97-1.46c-.25-.16-.44-.02-.44.21-.02.74.03 1.52.14 2.25.06.4.04.71-.14.94-.17.24-.45.33-.76.38a6.5 6.5 0 0 1-2.88-.16 1.26 1.26 0 0 1-.85-.76 2.01 2.01 0 0 1-.1-.93c.13-1.23.06-2.66.69-3.97.17-.36.18-.54-.34-.62-2.83-.38-6.17-2.19-7.4-3.84a3.03 3.03 0 0 1-.54-1.1c-.07-.33-.05-.68.44-.48.58.24 1.24.21 1.88-.03.3-.12.16-.44-.15-.32-.53.16-1.11.05-1.64-.14-.43-.15-.6-.53-.67-.88-.09-.5.08-1 .33-1.38a4.84 4.84 0 0 1 1.8-1.71c.42-.2.86-.31 1.29-.32Zm9.17 1.25.53 2.31a12.91 12.91 0 0 0-2.73 4.28c-.17.5.28.74.41.4.59-1.49 1.6-3.16 2.67-4.3l3.5 1.42a8.7 8.7 0 0 0-.32 2.66c0 .94.1 1.83.12 2.5.02.41.54.4.52.04-.03-.69-.12-1.6-.12-2.54 0-.98.1-1.95.32-2.57l3.99-.54a13.05 13.05 0 0 1 2.63 4.57c.11.35.59.11.5-.16a13.5 13.5 0 0 0-2.67-4.68l1.84-1.84c1.01.45 2.03 1.6 2.75 2.78.4.66.7 1.33.9 1.86.1.26.14.52.18.77l.2-.08c.5-.2.85.02 1.01.42.21.52-.09.9-.47 1.07-7.3 3.24-13.8 2.76-17.06.75-3.33-2.06-4.2-4.46-4.35-5.07-.1-.42.14-.72.5-.83.43-.13.84.03 1.01.44.24-.62.8-1.65 1.29-2.13a5.37 5.37 0 0 1 2.85-1.53zm4.38-1.24c.5-.02 1.02 0 1.52.06 2 .24 3.86 1.1 4.76 2.48l-1.8 1.84-4.12.56-3.7-1.5-.54-2.37a7.93 7.93 0 0 1 3.88-1.07z" /></svg>',
  speedFast: "",
  sleepTimer: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-7 h-7"><path d="M22.97 16.84h-3.25l3.56-3.26c.07-.05.1-.08.1-.14a.43.4 0 0 0-.37-.56h-4.38a.45.41 0 0 0 0 .82h3.29l-3.6 3.25a.43.4 0 0 0-.09.43.43.4 0 0 0 .4.25h4.34a.43.4 0 0 0 0-.79zm-6.44 1.98h-2.45l2.79-2.49a.43.4 0 0 0 .06-.45.43.4 0 0 0-.4-.26h-3.48a.45.41 0 0 0 0 .82h2.48l-2.79 2.5-.06.14a.31.28 0 0 0 0 .28.43.4 0 0 0 .37.28h3.5a.45.41 0 0 0 0-.82zm2.75 3.9h-1.42l1.73-1.55.1-.14v-.28a.43.4 0 0 0-.44-.29h-2.48a.43.4 0 0 0 0 .8h1.43l-1.74 1.55a.43.4 0 0 0-.09.46.43.4 0 0 0 .4.22h2.48a.43.4 0 0 0 0-.79z" style="stroke-width:.296239"/></svg>',
  chapters: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" /></svg>',
  bibleButton: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5"><path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z" /><path d="M14.329 7.172a.75.75 0 0 0-1.061 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 0 0 1.06 1.06 4 4 0 0 0 0-5.656Z" /></svg>',
  bibles: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>',
  books: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" /></svg>',
  Book: '<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="w-7 h-7 hover:text-blue-600 dark:hover:text-blue-300" viewBox="0 0 23 13"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M22 2.7c0-.9-1-1.4-1.7-1l-7 4a1.1 1.1 0 0 0 0 2l7 4a1.1 1.1 0 0 0 1.7-.9V2.7h0Zm-9.7 0c0-.9-1-1.4-1.7-1l-7.1 4a1.1 1.1 0 0 0 0 2l7 4a1.1 1.1 0 0 0 1.8-.9V2.7h0Z"/><path d="M1.5 1v11"/></g></svg>',
  Chapter: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7"><path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" /></svg>',
  Skip: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7 hover:text-blue-600 dark:hover:text-blue-300"><path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" /></svg>',
  play: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 hover:text-blue-400" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.3 5.7c0-.9.9-1.4 1.6-1L18.5 11a1.1 1.1 0 0 1 0 2L6.9 19.3a1.1 1.1 0 0 1-1.6-1V5.7z"/></svg>',
  pause: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-10 hover:text-blue-600 dark:hover:text-blue-300" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.8 5.3v13.4M8.2 5.3v13.4"/></svg>',
  volumeIcon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-5" viewBox="0 0 20 20"><path d="M11 4a1 1 0 0 0-2-1L5 7H3a1 1 0 0 0-1 0 7 7 0 0 0 0 3v3h3l4 4a1 1 0 0 0 2-1V4Zm5 1a1 1 0 0 0-1 1 6 6 0 0 1 0 8 1 1 0 0 0 1 1 7 7 0 0 0 0-10Z"/><path d="M14 7a1 1 0 0 0-1 1 3 3 0 0 1 0 4 1 1 0 0 0 1 1 4 4 0 0 0 0-6Z"/></svg>',
  download: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5"><path fill-rule="evenodd" d="M2 4.75C2 3.784 2.784 3 3.75 3h4.836c.464 0 .909.184 1.237.513l1.414 1.414a.25.25 0 0 0 .177.073h4.836c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 16.25 17H3.75A1.75 1.75 0 0 1 2 15.25V4.75Zm8.75 4a.75.75 0 0 0-1.5 0v2.546l-.943-1.048a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.114 0l2.25-2.5a.75.75 0 1 0-1.114-1.004l-.943 1.048V8.75Z" clip-rule="evenodd" /></svg>'
}, ce = (e = {}) => {
  const t = { ...le };
  for (const n of Object.keys(e))
    t[n] = e[n];
  return t;
}, de = {}, ue = (e = {}) => {
  const t = { ...de };
  for (const n of Object.keys(e))
    t[n] = e[n];
  return t;
}, H = "https://content.dbs.org";
async function pe(e) {
  let t = {
    hark: me,
    dbp: he
  };
  for (const n of e.providers)
    t[n] && (e.bibles = e.bibles.concat(await t[n]()));
  for (let n = 0; n < e.bibles.length; n++) {
    let o = e.titles[e.bibles[n].id];
    o && (e.bibles[n].tt = o.tt, e.bibles[n].tv = o.tv);
  }
}
async function me(e = "all", t = "all") {
  return (await fetch(`${H}/bibles/audio-new/index.json`).then((a) => a.json())).map((a) => ({
    ...a,
    tp: "hark",
    dl: a.dl ? `${H}/bibles/audio-new/${a.id}.zip` : ""
  })).filter((a) => e === "all" || a.ci === e).filter((a) => t === "all" || a.id.includes(t));
}
async function be(e) {
  const t = {
    "01": "GEN",
    "02": "EXO",
    "03": "LEV",
    "04": "NUM",
    "05": "DEU",
    "06": "JOS",
    "07": "JDG",
    "08": "RUT",
    "09": "1SA",
    10: "2SA",
    11: "1KI",
    12: "2KI",
    13: "1CH",
    14: "2CH",
    15: "EZR",
    16: "NEH",
    17: "EST",
    18: "JOB",
    19: "PSA",
    20: "PRO",
    21: "ECC",
    22: "SNG",
    23: "ISA",
    24: "JER",
    25: "LAM",
    26: "EZK",
    27: "DAN",
    28: "HOS",
    29: "JOL",
    30: "AMO",
    31: "OBA",
    32: "JON",
    33: "MIC",
    34: "NAM",
    35: "HAB",
    36: "ZEP",
    37: "HAG",
    38: "ZEC",
    39: "MAL",
    40: "MAT",
    41: "MRK",
    42: "LUK",
    43: "JHN",
    44: "ACT",
    45: "ROM",
    46: "1CO",
    47: "2CO",
    48: "GAL",
    49: "EPH",
    50: "PHP",
    51: "COL",
    52: "1TH",
    53: "2TH",
    54: "1TI",
    55: "2TI",
    56: "TIT",
    57: "PHM",
    58: "HEB",
    59: "JAS",
    60: "1PE",
    61: "2PE",
    62: "1JN",
    63: "2JN",
    64: "3JN",
    65: "JUD",
    66: "REV"
  }, o = await (await fetch(`${H}/bibles/audio-new/${e}/index.txt`)).text(), a = /* @__PURE__ */ new Map(), r = /^(\d+)_(\w+)_(\d+)\.mp3$/;
  o.split(`
`).sort().forEach((i) => {
    const u = i.match(r);
    if (u) {
      const [, p, d, h] = u, f = parseInt(h, 10), g = t[p];
      a.has(g) || a.set(g, {
        name: d,
        book_number: p,
        book_id: g,
        chapters: []
      }), a.get(g).chapters.push(f);
    }
  });
  let l = [];
  const c = await fetch(`${H}/bibles/audio-new/${e}/timingfiles/_index.txt`);
  c.ok ? l = (await c.text()).split(`
`) : console.warn("timing files could not be found");
  for (const i of a.values())
    i.chapters.sort((u, p) => u - p);
  return {
    bible_id: e,
    bible_folder: e,
    timestamps: l,
    data: Array.from(a.values())
  };
}
async function he(e) {
  let t = `https://4.dbt.io/api/bibles?v=4&key=${key}&media=audio`;
  e && (t += "&country=" + e), bibles = await fetch(t).then(function(a) {
    return a.json();
  });
  let n = bibles.meta.pagination.last_page, o = 1;
  for (; o >= n; )
    o++, results = await fetch(t + "page=" + o).then(function(a) {
      return a.json();
    }), bibles.data.concat(results.data);
  return bibles;
}
async function fe(e, t) {
  e.query = "";
  const n = await be(t);
  e.currentBooks = n, e.numeralFormatter = e.currentBible.nm ? new Intl.NumberFormat(e.currentBible.nm) : new Intl.NumberFormat();
  const o = e.bibles.find((r) => r.id === e.currentBooks.bible_id);
  e.currentBible = o, new URL(window.location).searchParams.set("id", e.currentBible.id), await ge(e, n.data[0], 1);
}
async function ge(e, t, n) {
  e.currentBook = t, await D(e, t, n);
}
async function D(e, t, n) {
  var a;
  e.currentBook = t;
  let o = n;
  if ((a = t == null ? void 0 : t.chapters) != null && a.includes(n) || (o = 1), e.currentType === "hark") {
    const r = t.book_number === "19" ? 3 : 2;
    e.currentChapter = {
      path: `https://content.dbs.org/bibles/audio-new/${e.currentBooks.bible_folder}/${t.book_number}_${t.name}_${o.toString().padStart(r, "0")}.mp3`,
      title: `${t.name} ${o}`,
      number: o,
      book_id: t.book_id,
      timestamps: []
    }, e.audio.src = e.currentChapter.path;
    const l = new URL(window.location);
    if (l.searchParams.set("book", t.book_id), l.searchParams.set("c", o), Array.isArray(e.currentBooks.timestamps) && e.currentBooks.timestamps.length > 0) {
      const c = /Verse (\d+)	(\d+:\d+:\d+\.\d+)/gm;
      let i = await fetch(`https://content.dbs.org/bibles/audio-new/${e.currentBooks.bible_folder}/timingfiles/${e.currentBook.book_id}_${o.toString().padStart(3, "0")}.txt`).then(function(d) {
        return d.text();
      }).catch((d) => {
        console.error("Error:", d);
      }), u = [], p;
      for (; (p = c.exec(i)) !== null; ) {
        p[1];
        const d = p[2];
        u.push(d);
      }
      e.currentChapter.timestamps = u;
    }
  }
}
function s(e, t = {}) {
  const n = document.createElement(e);
  for (const [o, a] of Object.entries(t))
    o === "style" && typeof a == "object" ? Object.assign(n.style, a) : n[o] = a;
  return n;
}
function v(e, t) {
  const n = t / 60 | 0, o = t % 60 | 0;
  return `${e.numeralFormatter.format(n)}:${o < 10 ? e.numeralFormatter.format(0) : ""}${e.numeralFormatter.format(o)}`;
}
const V = (e) => {
  const [t, n, o] = e.split(":");
  return parseInt(t, 10) * 3600 + parseInt(n, 10) * 60 + parseFloat(o);
};
HTMLDialogElement.prototype.triggerShow = HTMLDialogElement.prototype.showModal;
HTMLDialogElement.prototype.showModal = function() {
  this.triggerShow(), this.onclick = (e) => {
    let t = this.getBoundingClientRect();
    if (e.clientY < t.top || e.clientY > t.bottom) return this.close();
    if (e.clientX < t.left || e.clientX > t.right) return this.close();
  };
};
function ve(e) {
  var p, d, h, f, g, w, C, y, B, L, T, N;
  const t = ((d = (p = e.options) == null ? void 0 : p.playbackRate) == null ? void 0 : d.min) ?? 0.5, n = ((f = (h = e.options) == null ? void 0 : h.playbackRate) == null ? void 0 : f.max) ?? 2.25, o = ((w = (g = e.options) == null ? void 0 : g.playbackRate) == null ? void 0 : w.step) ?? 0.25, a = (k, R) => {
    var M;
    k.className = `${k.baseClassName} ${R ? (M = e.class.playbackRate) == null ? void 0 : M.disabled : ""}`;
  }, r = (k) => {
    e.audio.playbackRate = Math.min(
      n,
      Math.max(t, e.audio.playbackRate + k)
    ), i.textContent = e.numeralFormatter.format(
      e.audio.playbackRate
    ), a(c, e.audio.playbackRate === t), a(u, e.audio.playbackRate === n);
  }, l = s("div", {
    className: (C = e.class.playbackRate) == null ? void 0 : C.wrapper
  }), c = s("button", {
    baseClassName: (y = e.class.playbackRate) == null ? void 0 : y.decrease,
    className: (B = e.class.playbackRate) == null ? void 0 : B.decrease,
    textContent: "-",
    onclick: () => r(-o)
  }), i = s("span", {
    className: (L = e.class.playbackRate) == null ? void 0 : L.display,
    textContent: e.numeralFormatter.format(e.audio.playbackRate)
  }), u = s("button", {
    baseClassName: (T = e.class.playbackRate) == null ? void 0 : T.increase,
    className: (N = e.class.playbackRate) == null ? void 0 : N.increase,
    textContent: "+",
    onclick: () => r(o)
  });
  return e.audio.addEventListener("loadedmetadata", () => {
    i.textContent = e.numeralFormatter.format(
      e.audio.playbackRate
    );
  }), l.append(
    c,
    i,
    u
  ), l;
}
function ke(e) {
  const t = s("div", { className: e.class.volume.row }), n = s("input", {
    type: "range",
    min: "0",
    max: "1",
    step: "0.01",
    className: e.class.volume.input,
    id: "volume-control",
    value: e.audio.volume,
    "aria-label": "Volume Control"
  });
  n.addEventListener("input", () => e.audio.volume = parseFloat(n.value));
  const o = s("label", {
    htmlFor: "volume-control",
    className: e.class.volume.label,
    innerHTML: e.icons.volumeIcon
  });
  o.appendChild(n), t.appendChild(o);
  const a = we(e, n);
  return t.appendChild(a), t;
}
function we(e, t) {
  const n = s("button", {
    className: e.class.sleepTimer.button,
    innerHTML: e.icons.sleepTimer,
    "aria-label": "Sleep Timer"
  });
  let o = null, a = 0;
  const r = 1 * 60 * 1e3, l = s("span", {
    className: e.class.sleepTimer.duration,
    textContent: v(e, r / 1e3),
    "aria-live": "polite"
  });
  n.appendChild(l), n.addEventListener("click", () => {
    o ? (clearInterval(o), o = null, t.value = 1, e.audio.volume = 1, a = 0, c(r)) : (a = 0, o = setInterval(() => {
      a += 1e3;
      const i = r - a, u = i / r;
      t.value = Math.max(0, u), e.audio.volume = parseFloat(t.value), c(i), a >= r && (clearInterval(o), o = null, e.audio.pause(), c(0));
    }, 1e3));
  }), e.audio.addEventListener("loadedmetadata", () => {
    l.textContent = v(e, r / 1e3);
  });
  function c(i) {
    const u = a / r, p = 2 * Math.PI * 9;
    l.textContent = v(e, i / 1e3);
    const d = n.querySelector("svg circle:nth-child(2)");
    d && d.setAttribute(
      "stroke-dashoffset",
      (1 - u) * p
    );
  }
  return n;
}
function Ce(e) {
  let t = s("div", {
    id: `${e.idPrefix}-bible-block`,
    className: e.class.bibleBlock.buttonGroup
  });
  return [
    {
      condition: !0,
      innerHTML: e.icons.bibles,
      className: e.class.bibleListNavButton,
      onclick: () => {
        e.view = "bible", e.render();
      }
    },
    {
      condition: e.view === "book",
      innerHTML: e.icons.books,
      className: e.class.bookList.navButton,
      onclick: () => {
        e.view = "chapter", e.render();
      }
    },
    {
      condition: e.view === "chapter",
      innerHTML: e.icons.chapters,
      className: e.class.chapterList.navButton,
      onclick: () => {
        e.view = "book", e.render();
      }
    }
  ].forEach(({ condition: o, innerHTML: a, className: r, onclick: l }) => {
    o && t.appendChild(s("button", {
      innerHTML: a,
      className: r,
      onclick: l
    }));
  }), t;
}
function x(e, t) {
  e.bibleBlock.innerHTML = "", e.bibleBlock.className = e.class.bibleBlock.wrapper;
  const n = ye(e, t), o = s("div", { className: e.class.selectBookChapterWrap });
  o.append(Be(e), Le(e)), Te(e, o), n.append(Ce(e)), e.bibleBlock.append(n, o);
}
function ye(e, t) {
  const n = s("div", { className: e.class.bibleBlock.infoWrap }), o = s("div", { className: e.class.bibleBlock.languageGroup });
  o.append(
    s("div", { className: e.class.bibleBlock.iso, innerText: t.iso }),
    s("div", { innerText: t.cn })
  ), n.append(o);
  const a = s("div", { className: e.class.bibleBlock.titleGroup });
  return a.appendChild(s("div", { className: e.class.bibleBlock.title, innerText: t.tt })), t.tv && t.tv !== t.tt && a.appendChild(s("div", { className: e.class.bibleBlock.vernacular, innerText: t.tv })), n.appendChild(a), n;
}
function P(e) {
  var n, o;
  const t = e.bookListGrid;
  t.innerHTML = "", e.resultsBooks && e.resultsBooks.length && e.query !== "" ? e.resultsBooks.forEach((a) => {
    t.appendChild(q(e, a.item));
  }) : e.currentBooks && e.query === "" && e.currentBooks.data && e.currentBooks.data.forEach((a) => {
    t.appendChild(q(e, a));
  }), e.currentBible.audio_copyright && e.copyrightContainer.appendChild(s("div", { className: e.class.copyright.copyrightAudio, innerText: (n = e.currentBible) == null ? void 0 : n.audio_copyright })), e.currentBible.text_copyright && e.copyrightContainer.appendChild(s("div", { className: e.class.copyright.copyrightText, innerText: (o = e.currentBible) == null ? void 0 : o.text_copyright }));
}
function q(e, t) {
  const n = s("button", {
    className: `${t.book_id} ${e.class.bookList.button} ${e.currentBook.book_id == t.book_id ? e.class.bookList.ButtonActive : ""}`,
    ariaLabel: t.name,
    onclick: () => A(e, t.book_id)
  });
  n.dataset.bookId = t.book_id;
  const o = s("div", { className: e.class.bookList.buttonContentWrapper });
  return o.append(
    s("h2", { className: e.class.bookList.title, textContent: t.name }),
    s("h3", { className: e.class.bookList.id, textContent: t.book_id })
  ), n.appendChild(o), n;
}
function A(e, t, n = 1) {
  const o = e.currentBooks.data.find((r) => r.book_id === t);
  if (!o) return;
  D(o, n);
  const a = new URL(window.location);
  a.searchParams.set("bookId", o.book_id), window.history.replaceState({}, "", a), e.query = "", e.chapterListContainer.style.display = "block", e.view = "chapter", e.currentBook = o, W(e), x(e, e.currentBible);
}
function Be(e) {
  const t = s("select", { className: e.class.selectBook });
  return e.currentBooks && e.currentBooks.data && e.currentBooks.data.forEach((n) => {
    const o = s("option", {
      value: n.book_id,
      innerText: n.name,
      selected: n.book_id === e.currentBook.book_id
    });
    t.appendChild(o);
  }), t.addEventListener("change", (n) => {
    A(e, n.target.value);
  }), e.bookSelect = t, t;
}
function Le(e) {
  const t = s("select", { className: e.class.selectChapter });
  return e.currentBook && e.currentBook.chapters && e.currentBook.chapters.forEach((n) => {
    const o = s("option", {
      value: n,
      innerText: e.numeralFormatter.format(n),
      selected: n == e.currentChapter.number
    });
    t.appendChild(o);
  }), t.addEventListener(
    "change",
    (n) => $(e, e.currentBook, parseInt(n.target.value))
  ), e.chapterSelect = t, t;
}
function Te(e, t) {
  if (!e.currentChapter || !e.currentChapter.timestamps || e.currentChapter.timestamps.length == 0) return;
  const n = s("select", { className: e.class.selectVerse });
  e.currentChapter.timestamps.forEach((a, r) => {
    const l = r + 1, c = s("option", {
      value: l,
      innerText: e.numeralFormatter.format(parseInt(l))
    });
    n.appendChild(c);
  }), n.addEventListener("change", (a) => {
    const l = parseInt(a.target.value, 10) - 1;
    if (e.currentChapter.timestamps && e.currentChapter.timestamps[l]) {
      const c = e.currentChapter.timestamps[l], i = V(c);
      e.audio.currentTime = i;
    }
  });
  const o = s("div", { innerText: ":", className: e.class.selectVerseSeparator });
  t.append(o, n), e.verseSelect = n, Ne(e);
}
function Ne(e) {
  let t = null;
  e.audio.addEventListener("timeupdate", () => {
    const n = e.audio.currentTime, o = e.currentChapter.timestamps;
    let a = -1;
    for (let r = 0; r < o.length && n >= V(o[r]); r++)
      a = r;
    a !== -1 && a !== t && (t = a, e.verseSelect.value = a + 1);
  });
}
function W(e) {
  var n, o;
  e.chapterListContainer.innerHTML = "", e.bibleListContainer.style.display = "none", e.bookListContainer.style.display = "none", e.chapterListContainer.style.display = "block";
  const t = document.createDocumentFragment();
  if (e.currentBook.chapters.forEach(
    (a) => {
      const r = s("button", {
        className: `${e.class.chapterList.button} ${e.currentChapter.number == a ? " " + e.class.chapterList.buttonActive : ""}`,
        ariaLabel: `Play Chapter ${a}`,
        textContent: e.numeralFormatter.format(a),
        onclick: () => $(e, e.currentBook, a)
      });
      t.appendChild(r);
    }
  ), e.chapterListContainer.appendChild(t), (n = e.currentBook) != null && n.book_id) {
    const a = (o = e.art[e.currentBook.book_id]) == null ? void 0 : o[0];
    if (!a) {
      console.warn(`No art found for book ID: ${e.currentBook.book_id}`);
      return;
    }
    const r = document.createElement("img");
    r.src = `./img/chars/${a.file}`, r.className = a.class, e.chapterListContainer.appendChild(r);
  }
}
function $(e, t, n) {
  D(e, t, n), e.chapterSelect.value = n, e.audio.play();
  const o = document.querySelector(".icon-play");
  o.innerHTML = e.audio.paused ? e.icons.play : e.icons.pause, W(e);
}
function Me(e) {
  var h, f, g, w, C, y, B, L, T, N, k, R, M, F, G, z;
  function t(b, E, S) {
    const _ = S.getBoundingClientRect(), m = (b.clientX - _.left) / _.width;
    E.audio.currentTime = Math.max(0, Math.min(m, 1)) * E.audio.duration;
  }
  const n = s("div", {
    className: (f = (h = e.class) == null ? void 0 : h.progress) == null ? void 0 : f.container
  }), o = s("div", {
    id: "currentTime",
    className: (w = (g = e.class) == null ? void 0 : g.progress) == null ? void 0 : w.currentTimeDisplay,
    textContent: v(e, e.audio.currentTime)
  }), a = s("div", {
    id: "progress-barContainer",
    className: (y = (C = e.class) == null ? void 0 : C.progress) == null ? void 0 : y.barContainer
  }), r = s("div", {
    id: "progress-barWrapper",
    className: (L = (B = e.class) == null ? void 0 : B.progress) == null ? void 0 : L.barWrapper
  }), l = s("div", {
    id: "progress-bar",
    className: (N = (T = e.class) == null ? void 0 : T.progress) == null ? void 0 : N.barInner,
    style: { width: "0%" }
  }), c = s("div", {
    id: "timestamps-wrapper",
    className: (R = (k = e.class) == null ? void 0 : k.progress) == null ? void 0 : R.timestamps
  }), i = s("div", {
    className: (F = (M = e.class) == null ? void 0 : M.progress) == null ? void 0 : F.circleTip,
    style: { left: "0%" }
  });
  r.append(l, i);
  const u = (b) => {
    e.isDragging && t(b, e, r);
  }, p = () => {
    e.isDragging && (e.isDragging = !1, document.body.style.userSelect = "", document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", p));
  };
  r.addEventListener("mousedown", () => {
    e.isDragging = !0, document.body.style.userSelect = "none", document.addEventListener("mousemove", u), document.addEventListener("mouseup", p);
  }), r.addEventListener("click", (b) => {
    t(b, e, r);
  });
  const d = s("div", {
    id: "currentDuration",
    className: (z = (G = e.class) == null ? void 0 : G.progress) == null ? void 0 : z.durationDisplay,
    textContent: v(e, e.audio.duration || 0)
  });
  return e.audio.addEventListener("timeupdate", () => {
    const b = e.audio.currentTime / e.audio.duration * 100;
    l.style.width = `${b}%`, i.style.left = `calc(${b}% - 3px)`, o.textContent = v(e, e.audio.currentTime);
  }), e.audio.addEventListener("loadedmetadata", () => {
    var b, E;
    if (c.innerHTML = "", currentTime.textContent = v(e, e.audio.currentTime), d.textContent = v(e, e.audio.duration), e.currentChapter.timestamps && Array.isArray(e.currentChapter.timestamps)) {
      const S = e.currentChapter.timestamps.map(V).filter((m) => m >= 0 && m <= e.audio.duration).sort((m, I) => m - I), _ = 0.25;
      for (let m = 0; m < S.length - 1; m++) {
        const I = S[m], oe = (S[m + 1] - I) / e.audio.duration * 100, ae = Math.max(0, oe - _), se = I / e.audio.duration * 100 + _ / 2, j = s("div", {
          className: e.class.progress.tickWrapper,
          style: {
            position: "absolute",
            left: `${se}%`,
            width: `${ae}%`
          }
        }), O = s("div", {
          className: `progress-tick ${(E = (b = e == null ? void 0 : e.class) == null ? void 0 : b.progress) == null ? void 0 : E.tick} w-full h-full`
        });
        O.addEventListener("click", () => {
          e.audio.currentTime = I;
        });
        const Z = s("div", {
          className: e.class.progress.tickLabel
        });
        Z.textContent = `${m + 1}`, j.appendChild(O), j.appendChild(Z), c.appendChild(j);
      }
    }
  }), a.append(o), a.append(r), a.append(d), n.append(a, c), n;
}
function Ee(e) {
  const t = s("div", { className: e.class.controls.navRow });
  t.append(
    U(e, "prev"),
    J(e, "prev"),
    K(e, "prev"),
    Se(e),
    K(e, "next"),
    J(e, "next"),
    U(e, "next")
  );
  const n = s("div", {
    className: e.class.controlsContainer
  });
  return n.append(
    Me(e),
    ve(e),
    t,
    ke(e)
  ), n;
}
function Se(e) {
  const t = s("button", {
    className: e.class.controls.playPauseButton,
    onclick: () => e.audio.paused ? e.audio.play() : e.audio.pause()
  }), n = s("span", {
    className: e.class.controls.playPauseIcon,
    innerHTML: e.icons.play
  });
  return t.appendChild(n), e.audio.addEventListener("play", () => {
    n.innerHTML = e.icons.pause;
  }), e.audio.addEventListener("pause", () => {
    n.innerHTML = e.icons.play;
  }), t;
}
function U(e, t) {
  return s("button", {
    className: e.class.controls[`${t}BookButton`],
    innerHTML: e.icons.Book,
    onclick: () => {
      const n = e.currentBooks.data.findIndex(
        (a) => a.book_id === e.currentBook.book_id
      ), o = t === "prev" ? n - 1 : n + 1;
      e.currentBooks.data[o] && (A(e, e.currentBooks.data[o].book_id), $(e, e.currentBooks.data[o], 1));
    }
  });
}
function J(e, t) {
  return s("button", {
    className: e.class.controls[`${t}ChapterButton`],
    innerHTML: e.icons.Chapter,
    onclick: () => _e(e, t)
  });
}
async function _e(e, t) {
  const n = t === "prev" ? -1 : 1, o = e.currentChapter.number + n;
  if (t === "prev" ? o > 0 : o < e.currentBook.chapters.length + 1) {
    $(e, e.currentBook, o);
    return;
  }
  const l = e.currentBooks.data.findIndex(
    (i) => i.book_id === e.currentBook.book_id
  ) + n, c = e.currentBooks.data[l];
  c && (A(e, c.book_id), $(e, c, 1));
}
function K(e, t) {
  return s("button", {
    id: `${t}SkipButton`,
    className: e.class.controls[`${t}SkipButton`],
    innerHTML: e.icons.Skip,
    onclick: () => {
      e.audio.currentTime + (t == "next" ? 15 : -15), e.audio.currentTime = Math.min(
        Math.max(e.audio.currentTime, 0),
        e.audio.duration
      );
    }
  });
}
function ee(e, t, n) {
  const o = e.toLowerCase(), l = Math.max(0.8, 0.95 - (o.length > 10 ? 0.15 : o.length * 0.05));
  return t.reduce((c, i) => {
    let u = 0, p = 0;
    return n.forEach((d) => {
      if (i[d]) {
        const h = i[d].toString().toLowerCase(), f = Ie(o, h);
        (f >= l || h.includes(o)) && (u += f, p++);
      }
    }), p > 0 && c.push({ item: i, score: u / p }), c;
  }, []).sort((c, i) => i.score - c.score);
}
function Ie(e, t, n = 0.1, o = 4) {
  if (e === t) return 1;
  if (e.length === 0 || t.length === 0) return 0;
  const a = $e(e, t);
  if (a.matches === 0) return 0;
  const r = (a.matches / e.length + a.matches / t.length + (a.matches - a.transpositions / 2) / a.matches) / 3, l = Ae(e, t, o);
  return r + l * n * (1 - r);
}
function $e(e, t) {
  const n = Math.max(e.length, t.length), o = Math.floor(n / 2) - 1, a = new Array(t.length).fill(!1), r = [], l = [];
  for (let i = 0; i < e.length; i++) {
    const u = Math.max(0, i - o), p = Math.min(i + o + 1, t.length);
    for (let d = u; d < p; d++)
      if (!a[d] && e[i] === t[d]) {
        r.push(e[i]), l.push(t[d]), a[d] = !0;
        break;
      }
  }
  let c = 0;
  for (let i = 0; i < r.length; i++)
    r[i] !== l[i] && c++;
  return {
    matches: r.length,
    transpositions: c
  };
}
function Ae(e, t, n) {
  const o = Math.min(n, e.length, t.length);
  let a = 0;
  for (let r = 0; r < o && e[r] === t[r]; r++)
    a++;
  return a;
}
function X(e) {
  e.bibleListContainer.innerHTML = "";
  const t = s("div", { className: e.class.search.wrapper }), n = s("input", {
    type: "search",
    placeholder: `Filter (${e.bibles.length}) Audio Bibles`,
    autocomplete: "off",
    className: e.class.search.input,
    oninput: () => {
      e.query = n.value, e.results = ee(e.query, e.bibles, ["tt", "tv", "ln", "cn"]), Y(e);
    }
  });
  n.setAttribute("aria-label", "Search"), t.appendChild(n), e.bibleListContainer.appendChild(t);
  const o = s("div", { className: e.class.bibleListGrid });
  e.bibleListGrid = o, e.bibleListContainer.appendChild(o), Y(e);
}
function Y(e) {
  const t = e.bibleListGrid;
  t.innerHTML = "";
  const n = e.query ? e.results.map((a) => a.item) : e.bibles, o = document.createDocumentFragment();
  n.forEach((a) => o.appendChild(Re(e, a))), t.appendChild(o);
}
function Re(e, t) {
  const n = s("div", { className: e.class.bibleButton.wrapper }), o = s("button", { className: e.class.bibleButton.button, onclick: () => te(e, t) });
  n.appendChild(o), o.dataset.testId = t.id, o.setAttribute("aria-label", t.tv ?? t.tt);
  const a = s("div", { className: e.class.bibleButton.languageWrap });
  a.appendChild(s("h2", { className: e.class.bibleButton.language, textContent: t.ln })), a.appendChild(s("small", { className: e.class.bibleButton.iso, textContent: t.iso }));
  const r = s("div", { className: e.class.bibleButton.country, textContent: t.cn }), l = s("div", { className: e.class.bibleButton.titleWrap }), c = s("span", { innerHTML: e.icons.bibleButton, className: e.class.bibleButton.icon });
  if (l.appendChild(c), l.appendChild(s("h4", { className: e.class.bibleButton.title, textContent: t.tt })), t.tt !== t.tv && t.tv) {
    const i = s("p", {
      className: e.class.bibleButton.vernacular,
      textContent: t.tv
    });
    l.appendChild(i);
  }
  if (o.appendChild(a), o.appendChild(l), o.appendChild(r), t.dl) {
    const i = s("button", {
      className: e.class.bibleButton.download,
      innerHTML: e.icons.download,
      onclick: () => He(e, t)
    });
    n.appendChild(i);
  }
  return n;
}
async function He(e, t) {
  try {
    if (!t.dl) {
      console.log("Bible object does not contain a valid download URL");
      return;
    }
    const n = s("dialog", { className: e.class.bibleDownloadDialog.wrapper }), o = s("div", { innerHTML: (e == null ? void 0 : e.download_text) ?? '<div class="text-sm max-w-sm"></div>' }), a = s("div", {
      innerHTML: `
            <p class="${e.class.bibleDownloadDialog.audio_copyright}">${t.audio_copyright}</p>
            <p class="${e.class.bibleDownloadDialog.text_copyright}">${t.text_copyright}</p>`
    });
    n.append(o, a);
    const r = s("button", { className: e.class.bibleDownloadDialog.button_download, textContent: `Download ${t.dl_size ?? ""}` });
    r.addEventListener("click", () => {
      const c = document.body.appendChild(s("a", { href: t.dl, download: "" }));
      c.click(), c.remove(), n.close(), n.remove();
    }), n.appendChild(r);
    const l = s("button", { className: e.class.bibleDownloadDialog.cancel, textContent: "Cancel" });
    l.addEventListener("click", () => {
      n.close(), document.body.removeChild(n);
    }), n.appendChild(l), document.body.appendChild(n), n.showModal();
  } catch (n) {
    console.error("An error occurred while trying to display the dialog:", n);
  }
}
async function te(e, t) {
  if (t.tp === "hark") {
    e.view = "book", e.currentBible = t, await fe(e, t.id), x(e, t), e.render();
    const n = new URL(window.location);
    n.searchParams.set("bibleId", t.id), window.history.replaceState({}, "", n);
  } else t.tp;
}
function je(e) {
  var o;
  const t = s("input", {
    type: "search",
    placeholder: ((o = e.i18n) == null ? void 0 : o.filter_books) ?? "Filter Books",
    className: e.class.search.input,
    ariaLabel: "search",
    autocomplete: "off",
    oninput: () => {
      e.query = t.value, console.log(t.value, e.currentBooks.data), e.resultsBooks = ee(e.query, e.currentBooks.data, ["name"]), P(e);
    }
  }), n = s("div", { className: e.class.search.inputContainer });
  n.appendChild(t), e.bookListContainer.appendChild(n), e.bookListContainer.appendChild(e.bookListGrid = s("div", { className: e.class.bookList.grid })), P(e);
}
class ne {
  constructor(t, n) {
    this.container = document.getElementById(t), this.providers = n.providers ?? ["hark"], this.bibles = [], this.currentBible = {}, this.currentBooks = [], this.currentBook = {}, this.currentChapter = { number: 0 }, this.audio = document.createElement("audio"), this.currentType = "hark", this.isDragging = !1, this.class = ie(n.classes), this.icons = ce(n.icons), this.art = ue(n.art), this.results = [], this.query = "", this.titles = (n == null ? void 0 : n.titles) ?? [], this.view = "bible", this.numeralFormatter = new Intl.NumberFormat(), this.idPrefix = (n == null ? void 0 : n.idPrefix) ?? "audio-player", this.views = {
      bible: { player: "none", bibleListContainer: "block", bookListContainer: "none", chapterListContainer: "none" },
      book: { player: "block", bibleListContainer: "none", bookListContainer: "block", chapterListContainer: "none" },
      chapter: { player: "block", bibleListContainer: "none", bookListContainer: "none", chapterListContainer: "block" }
    };
  }
  static async create(t, n) {
    const o = new ne(t, n);
    await pe(o), o.container.innerHTML = "";
    const a = o.idPrefix, r = s("div", { id: `${a}-player-container`, className: o.class.playerContainer });
    return o.bibleListContainer = s("div", { id: `${a}-bible-list-container`, className: o.class.bibleListContainer }), o.bookListContainer = s("div", { id: `${a}-book-list-container`, className: o.class.bookList.container }), o.chapterListContainer = s("div", { id: `${a}-chapter-list-container`, className: o.class.chapterList.container }), o.copyrightContainer = s("div", { id: `${a}-copyright-container`, className: o.class.copyright.container }), o.bibleBlock = s("div", { id: `${a}-bible-block`, className: o.class.bibleBlock.wrapper }), o.player = Pe(o), o.player.prepend(o.bibleBlock), r.append(o.audio, o.player), je(o), r.append(o.bookListContainer, o.chapterListContainer, o.bibleListContainer, o.copyrightContainer), o.container.appendChild(r), console.log(o), this.setDefaultView(o), o;
  }
  static async setDefaultView(t) {
    const n = new URL(window.location);
    n.searchParams.get("bibleId") && (await te(t, t.bibles.find((o) => o.id == n.searchParams.get("bibleId"))), t.view = "book"), n.searchParams.get("bookId") && (await A(t, n.searchParams.get("bookId")), t.view = "chapter"), t.view === "bible" && X(t), Q(t);
  }
  render() {
    this.view === "bible" ? (X(this), this.copyrightContainer.innerHTML = "") : this.view === "book" ? P(this) : this.view === "chapter" && W(this), Q(this);
  }
  setData(t) {
    Object.assign(this, t);
  }
}
function Q(e) {
  const t = e.views[e.view] || views.bible;
  e.player.style.display = t.player, e.bibleListContainer.style.display = t.bibleListContainer, e.bookListContainer.style.display = t.bookListContainer, e.chapterListContainer.style.display = t.chapterListContainer;
}
function Pe(e) {
  const t = s("div", {
    id: "media-player-wrap",
    className: e.class.mediaPlayerWrap
  }), n = Ee(e);
  return t.appendChild(n), t;
}
export {
  ne as default
};
