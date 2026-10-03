export const coreCode = `import { createCalendar, createViewWeek }
  from '@schedule-x/calendar'

const calendar = createCalendar({
  views: [createViewWeek()],
  events,
})

calendar.render(element)`

export const premiumCode = `const calendar = createCalendar({
  views,
  events,
  plugins: [
    createDragToCreatePlugin(),
    createInteractiveEventModal(),
  ],
  callbacks: {
    onEventUpdate: saveToMyBackend,
  },
})`

export const cloudCode = `// Your backend
const session = await scheduleX.auth
  .createFrontendSession({
    externalUserId: user.id,
  })

// Your browser frontend
const calendar = createScheduleXCloudCalendar({
  getFrontendToken,
  initialProviderSync: true,
})`
