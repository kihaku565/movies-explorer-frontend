export const formatDuration = (time) => {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`;
};