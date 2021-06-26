import React, { useEffect, useState } from "react";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Resize, DragAndDrop, Inject, ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";
import { callMsGraphCalendar, callMsGraphCreateEvent, callMsGraphDeleteEvent, callMsGraphUpdateEvent } from "../../api/graph";
import moment from 'moment';
import './Calendar.scss';
import { useLocation } from "react-router-dom";
import { Button } from '@material-ui/core';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { v1 as uuid } from "uuid";
import { createEvent } from "../../actions/events";
import LinkIcon from '@material-ui/icons/Link';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import { useDispatch, useSelector } from "react-redux";

function Calendar() {
    const [id, setId] = useState('');
    const [data, setData] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const users = useSelector((state) => state.users);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        create();
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    useEffect(() => {
        RequestCalendarData();
        // eslint-disable-next-line
    }, []);

    const create = () => {
        setId(uuid());
    }

    const RequestCalendarData = () => {
        callMsGraphCalendar(user.token).then(response => {
            response?.value?.forEach(event => {
                setData(prevData => [ ...prevData, {
                    Id: event.id,
                    Subject: event.subject,
                    IsAllDay: event.isAllDay,
                    StartTime: moment.utc(event.start.dateTime).toDate(),
                    EndTime: moment.utc(event.end.dateTime).toDate(),
                    RecurrenceRule: event.recurrence,
                    Description: event.body.content,
                    MeetingId: event.onlineMeeting ? event.onlineMeeting.joinUrl : "" ,
                } ]);
            });
            console.log(response);
        })
        setData([]);
    }

    const onActionBegin = (args) => {
        if (args.requestType === "eventCreate") {
            const event = {
                subject: args.data[0].Subject,
                body: {
                    contentType: 'text',
                    content: args.data[0].Description ? args.data[0].Description: ""
                },
                start: {
                    dateTime: new Date(args.data[0].StartTime).toISOString(),
                    timeZone: 'UTC'
                },
                end: {
                    dateTime: new Date(args.data[0].EndTime).toISOString(),
                    timeZone: 'UTC'
                },
                location: {
                    displayName: args.data[0].Location ? args.data[0].Location: ""
                },
            };
            const eventData = callMsGraphCreateEvent(user.token, event).then((t) => console.log(t));
            console.log(eventData);
            dispatch(createEvent({
                Subject: args.data[0].Subject,
                StartTime: args.data[0].StartTime.toISOString(),
                EndTime: args.data[0].EndTime.toISOString(),
                Attendees: args.data[0].Attendees,
                Description: args.data[0].Description,
                MeetingId: id,
                Creator: user.result.name,
            }))
        }
        if (args.requestType === "eventRemove") { 
            const eventData = callMsGraphDeleteEvent(user.token, args.data[0].Id).then((t) => console.log(t));
            console.log(eventData);
        }
        if (args.requestType === "eventChange") {
            console.log(args.data);
            const event = {
            subject: args.data.Subject,
                body: {
                    contentType: 'text',
                    content: args.data.Description ? args.data.Description: ""
                },
                start: {
                    dateTime: new Date(args.data.StartTime).toISOString(),
                    timeZone: 'UTC'
                },
                end: {
                    dateTime: new Date(args.data.EndTime).toISOString(),
                    timeZone: 'UTC'
                },
                location: {
                    displayName: args.data.Location ? args.data.Location: ""
                },
            };
            const eventData = callMsGraphUpdateEvent(user.token, event, args.data.Id).then((t) => console.log(t));
            console.log(eventData);
        }
    }

    const content = (props) => {
        return (
        <div>
            {props.elementType === "cell" ? (
            <div className="e-cell-content e-template">
                <form className="e-schedule-form">
                    <div>
                        <input className="subject e-field e-input" type="text" name="Subject" placeholder="Title"/>
                    </div>
                </form>
            </div>) : (
            <div>
                <div className="quickpopup__dateTime">
                    {props.StartTime.toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    })}
                    {" "}
                    {props.StartTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })}
                    {" - "}
                    {props.EndTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })}
                </div>
                {props.MeetingId !== "" && !isNullOrUndefined(props.MeetingId) ?
                <div>
                    <Button href={props.MeetingId} variant="contained" color="primary" className="quickpopup__join">Join</Button>
                    <div className="quickpopup__meetingId">
                        <LinkIcon />
                        <p><a href={props.MeetingId}>{props.MeetingId.slice(0, 40)}{"..."}</a></p>
                        <FileCopyOutlinedIcon />
                    </div>
                </div>: null}
                <div className="quickpopup__description">
                    {props.Description ? props.Description.includes('>') ? props.Description.substr(0, props.Description.indexOf('<https')) : props.Description: ""}
                </div>
            </div>
            )}
        </div>
        );
    }

    const itemTemplate = (data) => {
        return (
            <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}><span className='name'>{data.name}</span><span className ='email'>{data.email}</span></span>
        );
    }

    const editorTemplate = (props) => {
        const allUsers = [];
        for (var i = 0; i < users.length; i++) {
            allUsers.push({ name: users[i].name, email: users[i].email, identity: users[i].name + ',' + users[i]._id })
        }
        return (props !== undefined && Object.keys(props).length > 0 ? 
            <table className="custom-event-editor" style={{ width: '100%', padding: '5' }}>
                <tbody>
                    <tr>
                        <td className="e-textlabel">Title</td><td colSpan={4}>
                            <input id="Subject" className="e-field e-input" type="text" name="Subject" placeholder="Subject" style={{ width: '100%' }}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Attendees</td><td colSpan={4}>
                            <MultiSelectComponent
                                className="e-field"
                                placeholder='Add attendees'
                                data-name="Attendees"
                                itemTemplate={itemTemplate}
                                dataSource={allUsers.filter(singleuser => singleuser.identity.split(',')[1] !== user.result._id)}
                                fields={{ text: 'name', value: 'identity' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Start</td>
                        <td colSpan={4}>
                            <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field" />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">End</td>
                        <td colSpan={4}>
                            <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field" />
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Description</td><td colSpan={4}>
                            <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} />
                        </td>
                    </tr>
                </tbody>
            </table> 
        : <div></div>);
    }

    return (
        <ScheduleComponent
            width="100%"
            height="85.7vh"
            selectedDate={new Date()}
            enablePersistence={true}
            actionBegin={onActionBegin}
            eventSettings={{ dataSource: data }}
            quickInfoTemplates={{ content: content }}
            editorTemplate={editorTemplate}
        >
            <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
        </ScheduleComponent>
    );
}

export default Calendar;