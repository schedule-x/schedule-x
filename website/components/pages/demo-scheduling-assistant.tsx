'use client'

import '@schedule-x/theme-default/dist/index.css'
import HeadingWithIcon from '../partials/heading-with-icon/heading-with-icon'
import styles from './demo.module.scss'
import { Modal, Button } from 'rsuite';

import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import {
  createHourlyView,
  createConfig,
  TimeUnits
} from "@sx-premium/resource-scheduler";
import { createSchedulingAssistant } from '@sx-premium/scheduling-assistant'
import { useState } from 'react'
import { effect } from '@preact/signals'
import 'temporal-polyfill/global'

export default function CalendarDemoPage() {
  const [rangeStart, setRangeStart] = useState(Temporal.ZonedDateTime.from('2025-03-07T10:00:00+00:00[America/New_York]'))
  const [rangeEnd, setRangeEnd] = useState(Temporal.ZonedDateTime.from('2025-03-07T12:00:00+00:00[America/New_York]'))
  const [open, setOpen] = useState(false);
  const [isSchedulingDisabled, setIsSchedulingDisabled] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const rConfig = useState(() => createConfig())[0];
  rConfig.initialHours.value = new TimeUnits().getDayHoursBetweenPlain(
    Temporal.PlainDateTime.from('2025-03-07T08:00:00'),
    Temporal.PlainDateTime.from('2025-03-07T19:00:00')
  )
  rConfig.infiniteScroll.value = false
  const hourlyView = useState(() => createHourlyView(rConfig))[0];

  rConfig.resources.value = [
    {
      id: 'janedoe',
      label: 'Jane Doe',
    },
    {
      id: 'johnsmith',
      label: 'John Smith',
    },
    {
      id: 'tedmosby',
      label: 'Ted Mosby',
    }
  ]

  const schedulingAssistant = useState(createSchedulingAssistant({
    initialStart: rangeStart,
    initialEnd: rangeEnd
  }))[0];

  effect(() => {
    const newStart = schedulingAssistant.currentStart.value
    if (newStart !== rangeStart) setRangeStart(newStart)

    const newEnd = schedulingAssistant.currentEnd.value
    if (newEnd !== rangeEnd) setRangeEnd(newEnd)
  })

  effect(() => {
    if (schedulingAssistant.hasCollision.value !== isSchedulingDisabled) {
      setIsSchedulingDisabled(schedulingAssistant.hasCollision.value)
    }
  })

  const calendar = useNextCalendarApp({
    selectedDate: Temporal.PlainDate.from('2025-03-07'),
    timezone: 'America/New_York',
    events: [
      {
        id: 'event1',
        resourceId: 'janedoe',
        start: Temporal.ZonedDateTime.from('2025-03-07T09:00:00+00:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2025-03-07T10:00:00+00:00[America/New_York]'),
        title: 'Event 1',
      },
      {
        id: 'event2',
        resourceId: 'johnsmith',
        start: Temporal.ZonedDateTime.from('2025-03-07T10:00:00+00:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2025-03-07T11:00:00+00:00[America/New_York]'),
        title: 'Event 2',
      },
      {
        id: 'event3',
        resourceId: 'tedmosby',
        start: Temporal.ZonedDateTime.from('2025-03-07T11:00:00+00:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2025-03-07T12:00:00+00:00[America/New_York]'),
        title: 'Event 3',
      },
      {
        id: 'event4',
        resourceId: 'janedoe',
        start: Temporal.ZonedDateTime.from('2025-03-07T17:00:00+00:00[America/New_York]'),
        end: Temporal.ZonedDateTime.from('2025-03-07T18:00:00+00:00[America/New_York]'),
        title: 'Event 4',
      }
    ],
    views: [hourlyView],
    plugins: [
      schedulingAssistant
    ],
  })

  const getTime = (start: Temporal.ZonedDateTime, end: Temporal.ZonedDateTime) => {
    const startTime = start.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const endTime = end.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return `${startTime} - ${endTime}`
  }


  return (
    <div className={['page-wrapper scheduling-assistant', styles.demoPageWrapper].join(' ')}>
      <HeadingWithIcon icon={'🗓️'} text={'Scheduling assistant'}/>

      <p style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>
        Drag and drop or resize the scheduling assistant markers, to get a visual representation of whether all
        people/resources are available. <i>The button and confirmation modal component are not part of the scheduling
        assistant plugin.</i>
      </p>

      <ScheduleXCalendar calendarApp={calendar}/>

      <button className="landingPageAction buttonPrimary" onClick={handleOpen} disabled={isSchedulingDisabled}>
        Schedule for {getTime(rangeStart, rangeEnd)}
      </button>

      <Modal open={open} onClose={handleClose} style={{ textAlign: 'center' }}>
        <Modal.Header>
          <Modal.Title style={{
            fontWeight: '600',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width={30} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fill="#2dbe2f"
                      d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path>
              </g>
            </svg>

            <h3 style={{ marginLeft: '10px' }}>
              Event was scheduled!
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto', width: 'fit-content' }}>
            <svg viewBox="0 0 24 24" width={20} fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V6Z"
                      fill="#000000"></path>
              </g>
            </svg>

            <span style={{ marginLeft: '10px' }}>{getTime(rangeStart, rangeEnd)}</span>
          </div>

          <br/>

          <strong>Participants:</strong>
          {rConfig.resources.value.map((resource) => (
            <div key={resource.id}>{resource.label}</div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
