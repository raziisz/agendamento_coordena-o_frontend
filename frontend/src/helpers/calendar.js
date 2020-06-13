export function daysInMounth(mounth, year) {
    const data = new Date(year, mounth, 0);
    return data.getDate();
}
