export function elem(tag, props = {}) {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(props)) {
        if (key === 'style' && typeof val === 'object') {
            Object.assign(el.style, val);
        } else {
            el[key] = val;
        }
    }
    return el;
}

export function formatTime(timeInSeconds) {
    const minutes = (timeInSeconds / 60) | 0;
    const seconds = (timeInSeconds % 60) | 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const parseTimestampToSeconds = (timestampStr) => {
    const [hours, minutes, seconds] = timestampStr.split(':');
    return (parseInt(hours, 10) * 3600) + (parseInt(minutes, 10) * 60) + parseFloat(seconds);
}

HTMLDialogElement.prototype.triggerShow = HTMLDialogElement.prototype.showModal;
HTMLDialogElement.prototype.showModal = function() {
    this.triggerShow();
    this.onclick = event => {
        let rect = this.getBoundingClientRect();
        if(event.clientY < rect.top || event.clientY > rect.bottom) return this.close();
        if(event.clientX < rect.left || event.clientX > rect.right) return this.close();
    }
}