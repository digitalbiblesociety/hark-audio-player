import { mergeClasses, mergeIcons, mergeArt } from "./AudioPlayerStyles.mjs";
import { harkList } from "./AudioPlayerProviders.mjs";
import { elem } from "./AudioPlayerHelpers.mjs";
import { createAudioElement } from "./AudioPlayerMedia.mjs";
import {
  initBibleList,
  handleBibleButtonClick,
  initBookList,
  updateBookList,
} from "./AudioPlayerBibleList.mjs";
import { handleBookChange } from "./AudioPlayerBibleList.mjs";

export default class AudioPlayer {
  constructor(containerId, options) {
    this.container = document.getElementById(containerId);
    this.bookListGrid = null;
    this.mediaPlayerWrap = null;
    this.providers = options.providers ?? ["hark"];
    this.bibles = [];
    this.engineBibles = null;
    this.currentBible = null;
    this.currentBooks = [];
    this.currentBook = null;
    this.currentChapter = { number: 0 };
    this.audio = document.createElement("audio");
    this.currentType = "hark";

    this.isDragging = false;

    this.class = mergeClasses(options.classes);
    this.icons = mergeIcons(options.icons);
    this.art = mergeArt(options.art);

    this.results = [];
    this.query = "";
    this.engineBooks = null;
    this.view = "bible";
    this.idPrefix = options?.idPrefix ?? "audio-player";

    this.bookSelect = null;
    this.chapterSelect = null;
  }

  static async create(containerId, options) {
    const player = new AudioPlayer(containerId, options);
    if (player.providers.includes("hark")) {
      player.bibles = player.bibles.concat(await harkList());
    }
    if (player.providers.includes("dbp")) {
      player.bibles = player.bibles.concat(await dbpList());
    }
    player.container.innerHTML = "";
    const playerContainer = elem("div", {
      id: `${player.idPrefix}-player-container`,
      className: player.class.playerContainer,
    });
    player.bibleListContainer = elem("div", {
      id: `${player.idPrefix}-bible-list-container`,
      className: player.class.bibleListContainer,
    });
    player.bookListContainer = elem("div", {
      id: `${player.idPrefix}-book-list-container`,
      className: player.class.bookListContainer,
    });
    player.chapterListContainer = elem("div", {
      id: `${player.idPrefix}-chapter-list-container`,
      className: player.class.chapterListContainer,
    });
    player.bibleBlock = elem("div", {
      id: `${player.idPrefix}-bible-block`,
      className: player.class.bibleBlock,
    });
    player.player = createMediaPlayer(player);
    playerContainer.appendChild(player.bibleBlock);
    playerContainer.appendChild(player.audio);
    playerContainer.appendChild(player.player);
    initBookList(player);
    playerContainer.appendChild(player.bookListContainer);
    playerContainer.appendChild(player.chapterListContainer);
    playerContainer.appendChild(player.bibleListContainer);
    player.container.appendChild(playerContainer);
    this.setPlayerView(player);
    return player;
  }

  static async setPlayerView(player) {
    const url = new URL(window.location);
    if (url.searchParams.get("bibleId")) {
      await handleBibleButtonClick(
        player,
        player.bibles.find(
          (bible) => bible.id == url.searchParams.get("bibleId"),
        ),
      );
      player.view = "book";
    }
    if (url.searchParams.get("bookId")) {
      await handleBookChange(player, url.searchParams.get("bookId"));
      player.view = "chapter";
    }
    if (player.view === "bible") {
      initBibleList(player);
    }

    const views = {
      bible: {
        player: "none",
        bibleListContainer: "block",
        bookListContainer: "none",
        chapterListContainer: "none",
      },
      book: {
        player: "block",
        bibleListContainer: "none",
        bookListContainer: "block",
        chapterListContainer: "none",
      },
      chapter: {
        player: "block",
        bibleListContainer: "none",
        bookListContainer: "none",
        chapterListContainer: "block",
      },
    };

    const currentView = views[player.view] || views.bible;
    player.player.style.display = currentView.player;
    player.bibleListContainer.style.display = currentView.bibleListContainer;
    player.bookListContainer.style.display = currentView.bookListContainer;
    player.chapterListContainer.style.display =
      currentView.chapterListContainer;
  }

  render() {
    if (this.view === "bible") {
      initBibleList(this);

      this.bibleListContainer.style.display = "block";
      this.bookListContainer.style.display = "none";
      this.chapterListContainer.style.display = "none";

      if (this.player && !this.currentChapter) {
        this.player.style.display = "none";
      }
    } else if (this.view === "book") {
      this.bibleListContainer.style.display = "none";
      this.chapterListContainer.style.display = "none";
      this.bookListContainer.style.display = "block";
      updateBookList(this);

      // Show media player
      if (this.player) {
        this.player.style.display = "block";
      }
    } else if (this.view === "chapter") {
      this.bibleListContainer.style.display = "none";
      this.chapterListContainer.style.display = "block";
      this.bookListContainer.style.display = "none";
      chapterList(this);

      // Show media player
      if (this.player) {
        this.player.style.display = "block";
      }
    }
  }

  setData(newData) {
    Object.assign(this, newData);
    // If necessary, re-render or update the UI here
  }
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
