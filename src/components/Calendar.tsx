import React from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

class CalendarComponent extends React.Component {
    handleClickDayname = (ev: { date: any; }) => {
        // view : week, day
        console.group('onClickDayname');
        console.log(ev.date);
        console.groupEnd();
    };

    render() {
        return (
            <Calendar onClickDayname={this.handleClickDayname} height={"300"}/>
        );
    }
}

export default CalendarComponent;
