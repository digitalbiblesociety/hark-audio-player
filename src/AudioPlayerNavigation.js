import { elem } from "./AudioPlayerHelpers.js";

export function createBibleBlockButtons(ctx) {
    let bibleBlockButtonGroup = elem('div', {
        id: `${ctx.idPrefix}-bible-block`,
        className: ctx.class.bibleBlock.buttonGroup });
    const buttons = [
        {
            condition: true,
            innerHTML: ctx.icons.bibles,
            className: ctx.class.bibleListNavButton,
            onclick: () => {ctx.view = 'bible';ctx.render()}
        },
        {
            condition: ctx.view === "book",
            innerHTML: ctx.icons.books,
            className: ctx.class.bookList.navButton,
            onclick: () => {ctx.view = 'chapter';ctx.render()}
        },
        {
            condition: ctx.view === "chapter",
            innerHTML: ctx.icons.chapters,
            className: ctx.class.chapterListNavButton,
            onclick: () => {ctx.view = 'book';ctx.render()}
        }
    ];
    buttons.forEach(({ condition, innerHTML, className, onclick }) => {
        if (condition) {
            bibleBlockButtonGroup.appendChild(elem('button', {
                innerHTML,
                className,
                onclick
            }));
        }
    });
    return bibleBlockButtonGroup;
}
