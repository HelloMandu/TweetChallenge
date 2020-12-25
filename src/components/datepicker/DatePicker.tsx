import {
    getDayOptions,
    getMonthOptions,
    getYearOptions,
} from "../../lib/calculateDate";

import "./DatePicker.scss";

interface DatePickerProps {
    date: {
        year: number;
        month: number;
        day: number;
    };
    onChange: () => void;
}

const DatePicker = ({ date, onChange }: DatePickerProps) => {
    const years: number[] = getYearOptions();
    const months: number[] = getMonthOptions();
    const days: number[] = getDayOptions();

    const yearOptions = years.map((year, index) => (
        <option className={"date-picker-option"} key={index} value={year}>
            {year + "년"}
        </option>
    ));
    const monthOptions = months.map((month, index) => (
        <option className={"date-picker-option"} key={index} value={month}>
            {month + "월"}
        </option>
    ));
    const dayOptions = days.map((day, index) => (
        <option className={"date-picker-option"} key={index} value={day}>
            {day + "일"}
        </option>
    ));
    return (
        <div className={"date-picker-wrapper"}>
            <select className={"date-picker"} name={"year"} onChange={onChange}>
                {yearOptions}
            </select>
            <select
                className={"date-picker"}
                name={"month"}
                onChange={onChange}
            >
                {monthOptions}
            </select>
            <select className={"date-picker"} name={"day"} onChange={onChange}>
                {dayOptions}
            </select>
        </div>
    );
};

export default DatePicker;
