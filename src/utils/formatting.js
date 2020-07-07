import * as dateFns from 'date-fns';

const toDate = (date) => (date instanceof Date) ? date : new Date(date);

export function formatDate(date) {
    return dateFns.format(toDate(date), 'M/d/yyyy');
}

export function formatTime(date) {
    return dateFns.format(toDate(date), 'h:mm a');
}

export function formatDateTime(date) {
    return dateFns.format(toDate(date), 'MMM d, h:mm a');
}

export function formatDateDistance(date) {
    return dateFns.formatDistance(toDate(date), new Date(), {
        addSuffix: true,
    });
}
