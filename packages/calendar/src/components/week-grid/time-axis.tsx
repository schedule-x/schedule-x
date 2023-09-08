import { useContext, useEffect, useState } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'

export default function TimeAxis() {
  const $app = useContext(AppContext)

  // const [hours, setHours] = useState<number[]>([])

  // useEffect(() => {}, [])

  return (
    <>
      <div className="sx__week-grid__time-axis">
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">0 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">1 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">2 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">3 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">4 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">5 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">6 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">7 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">8 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">9 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">10 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">11 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">12 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">13 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">14 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">15 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">16 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">17 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">18 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">19 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">20 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">21 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">22 Uhr</span>
        </div>
        <div className="sx__week-grid__hour">
          <span className="sx__week-grid__hour-text">23 Uhr</span>
        </div>
      </div>
    </>
  )
}
