import {
    getHourOptions,
    getMinuteOptions,
} from "../../lib/calculateDate";

import "./TimePicker.scss";

interface TimePickerProps {
    time: {
        hour: number;
        minute: number;
    };
    onChange: () => void;
}

const TimePicker = ({ time, onChange }: TimePickerProps) => {

    const hours: string[] = getHourOptions();
    const minutes: string[] = getMinuteOptions();

    const hourOptions = hours.map((hour, index) => (
        <option key={index} value={hour}>
            {hour + "시"}
        </option>
    ));
    const minuteOptions = minutes.map((minute, index) => (
        <option key={index} value={minute}>
            {minute + "분"}
        </option>
    ));
    return (
        <div className={"time-picker-wrapper"}>
            <select className={"time-picker"} name={"hour"} onChange={onChange}>
                {hourOptions}
            </select>
            <select className={"time-picker"} name={"minute"} onChange={onChange}>
                {minuteOptions}
            </select>
        </div>
    );
};

export default TimePicker;