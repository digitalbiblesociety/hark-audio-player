import { mergeClasses, mergeIcons, mergeArt } from "./AudioPlayerStyles.js";
import { loadProviders } from "./AudioPlayerProviders.js";
import { elem } from "./AudioPlayerHelpers.js";
import { createAudioElement } from "./AudioPlayerMedia.js";
import { initBibleList, handleBibleButtonClick, initBookList } from "./AudioPlayerBibleList.js";
import { chapterList, handleBookChange, updateBookList, updateCurrentBibleBlock } from "./AudioPlayerChapterList.js";

export default class AudioPlayer {
  constructor(containerId, options) {
    this.container = document.getElementById(containerId);
    this.providers = options.providers ?? ["hark"];
    this.bibles = [];
    this.currentBible = {};
    this.currentBooks = [];
    this.currentBook = {};
    this.currentChapter = { number: 0 };
    this.audio = document.createElement("audio");
    this.currentType = "hark";
    this.isDragging = false;
    this.class = mergeClasses(options.classes);
    this.icons = mergeIcons(options.icons);
    this.art = mergeArt(options.art);
    this.results = [];
    this.query = "";
    this.titles = options?.titles ?? [];
    this.view = "bible";
    this.numeralFormatter = new Intl.NumberFormat()
    this.idPrefix = options?.idPrefix ?? "audio-player";
    this.views = {
        bible: {player: "none", bibleListContainer: "block", bookListContainer: "none", chapterListContainer: "none"},
        book: {player: "block", bibleListContainer: "none", bookListContainer: "block", chapterListContainer: "none"},
        chapter: {player: "block", bibleListContainer: "none", bookListContainer: "none", chapterListContainer: "block"},
    };
  }

  static async create(containerId, options) {
    const player = new AudioPlayer(containerId, options);
    await loadProviders(player)
    player.container.innerHTML = "";
    const idp = player.idPrefix;
    const playerContainer = elem("div", {id: `${idp}-player-container`,className: player.class.playerContainer});
    player.bibleListContainer = elem("div", {id: `${idp}-bible-list-container`,className: player.class.bibleListContainer});
    player.bookListContainer = elem("div", {id: `${idp}-book-list-container`,className: player.class.bookList.container});
    player.chapterListContainer = elem("div", {id: `${idp}-chapter-list-container`,className: player.class.chapterList.container});
    player.copyrightContainer = elem("div", {id: `${idp}-copyright-container`,className: player.class.copyright.container});
    player.bibleBlock = elem("div", {id: `${idp}-bible-block`,className: player.class.bibleBlock.wrapper});
    player.player = createMediaPlayer(player);
    player.player.prepend(player.bibleBlock)
    playerContainer.append(player.audio, player.player);
    initBookList(player);
    playerContainer.append(player.bookListContainer, player.chapterListContainer, player.bibleListContainer, player.copyrightContainer);
    player.container.appendChild(playerContainer);
    console.log(player)
    this.setDefaultView(player);
    return player;
  }

  static async setDefaultView(player) {
    const url = new URL(window.location);
    if (url.searchParams.get("bibleId")) {
      await handleBibleButtonClick(player, player.bibles.find((bible) => bible.id == url.searchParams.get("bibleId")));
      player.view = "book";
    }
    if (url.searchParams.get("bookId")) {
      await handleBookChange(player, url.searchParams.get("bookId"));
      player.view = "chapter";
    }
    if (player.view === "bible") {
      initBibleList(player);
    }

    setView(player)
  }

  render() {
    if (this.view === "bible") {
      initBibleList(this);
      this.copyrightContainer.innerHTML = ``
    } else if (this.view === "book") {
      updateBookList(this);
      updateCurrentBibleBlock(this, this.currentBible);
    } else if (this.view === "chapter") {
      chapterList(this);
      updateCurrentBibleBlock(this, this.currentBible);
    }
    setView(this)
  }

  setData(newData) {
    Object.assign(this, newData);
  }
}

function setView(player) {
    const currentView = player.views[player.view] || views.bible;
    player.player.style.display = currentView.player;
    player.bibleListContainer.style.display = currentView.bibleListContainer;
    player.bookListContainer.style.display = currentView.bookListContainer;
    player.chapterListContainer.style.display = currentView.chapterListContainer;
}

function createMediaPlayer(ctx) {
  const mediaPlayerWrap = elem("div", {
    id: "media-player-wrap",
    className: ctx.class.mediaPlayerWrap,
  });

  const audioElement = createAudioElement(ctx);
  mediaPlayerWrap.appendChild(audioElement);

  return mediaPlayerWrap;
}
