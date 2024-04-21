export const USER_API_END_POINT = "http://localhost:8080/api/v1/user";
export const TWEET_API_END_POINT = "http://localhost:8080/api/v1/tweet";

export const timeSince = (timestamp) => {
    if (!timestamp) return '';

    const time = Date.parse(timestamp);
    if (isNaN(time)) return '';

    const now = Date.now();
    const secondsPast = (now - time) / 1000;
    const suffix = 'ago';

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (let i in intervals) {
        const interval = intervals[i];
        if (secondsPast >= interval) {
            const count = Math.floor(secondsPast / interval);
            return `${count} ${i}${count > 1 ? 's' : ''} ${suffix}`;
        }
    }

    return 'Just now';
};
