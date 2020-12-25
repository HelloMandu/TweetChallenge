export const getYearOptions = (): number[] => {
    const years: number[] = [];
    const LIMIT: number = 50;
    const thisYear: number = new Date().getFullYear();
    for (let i = 0; i < LIMIT; i++) {
        years.push(thisYear - i);
    }
    return years;
}

export const getMonthOptions = (): number[] => {
    const months: number[] = [];
    const LIMIT: number = 12;
    for (let i = 0; i < LIMIT; i++) {
        months.push(i + 1);
    }
    return months;
}

export const getDayOptions = (): number[] => {
    const days: number[] = [];
    const LIMIT: number = 31;
    for (let i = 0; i < LIMIT; i++) {
        days.push(i + 1);
    }
    return days;
}