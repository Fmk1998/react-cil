import React from 'react'import {withRouter} from "react-router";import {connect} from "react-redux";import FullCalendar from '@fullcalendar/react'import dayGridPlugin from '@fullcalendar/daygrid'import timeGridPlugin from '@fullcalendar/timegrid'import '@fullcalendar/core/main.css'import '@fullcalendar/daygrid/main.css'import '@fullcalendar/timegrid/main.css'interface Props {    todoEvent: []}interface State {}let todoEvent = [    {        id: '11111',        title: 'hx1',        start: '2020-01-02 15:37:18',        end: '2020-01-03 18:37:18'    },    {        id: '2222222',        title: 'hx2',        start: '2020-01-05 15:37:18',        end: '2020-01-10 16:37:18'    },    {        id: '333333',        title: 'hx3',        start: '2020-01-15 15:37:18',        end: '2020-01-20 19:37:18'    }]class Calendar extends React.Component<Props, State>{    constructor(props: Props) {        super(props)        this.state = {            oldYM: null// 上次的年月        }        // this.myRef = React.createRef();    }    componentDidMount(): void {    }    eventClick= (eventInfo: any) => {        console.log(eventInfo)    }    render() {        const todoEvent:any = this.props.todoEvent        let todoArr:any = [];        todoEvent.list.forEach((item:any)=>{            todoArr.push({                id: item.id,                title: item.name,                start: new Date(item.startTime),                end: new Date(item.endTime)            });        })        return(            <FullCalendar                // ref={this.myRef}                height={500}                defaultView='dayGridMonth'                plugins={[dayGridPlugin, timeGridPlugin]}                header={{                    left: 'prev, next, today',                    center: 'title',                    right: 'dayGridMonth, timeGridWeek, timeGridDay'                }}                locale='zh-cn'                buttonText={{                    today: '今天',                    month: '月',                    week: '周',                    day: '天'                }}                allDayText='全天'                firstDay={1} // 周一至周六为1～6，周日为0                slotLabelFormat={{                    hour: '2-digit',                    minute: '2-digit',                    meridiem: false, // 子午线                    hour12: false                }}                eventSources={[todoArr]}                displayEventEnd // 显示结束时间                eventTimeFormat={{                    hour: '2-digit',                    minute: '2-digit',                    meridiem: false,                    hour12: false                }}                eventClick={this.eventClick}            />        )    }}const mapStateToProps = (state: any) => {    return {        todoEvent: state.category    }}export default withRouter(connect(mapStateToProps)(Calendar));