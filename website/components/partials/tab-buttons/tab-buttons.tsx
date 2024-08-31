import {CalendarDemo} from "../../pages/landing-page";
import { Radio, RadioGroup } from 'rsuite';

type props = {
  activeDemo: CalendarDemo
  setActiveDemo: (demo: CalendarDemo) => void
}

export default function TabButtons({ activeDemo, setActiveDemo }: props) {

  return (
    <>
      <div className="tabButtons">
        <RadioGroup
          value={activeDemo}
          onChange={setActiveDemo}
          appearance={'picker'}
          style={{ gap: '30px' }}
          name="radio-group-inline"
          inline
          defaultValue="A"
        >
          <Radio color={'orange'} value="sidebar+modal">Sidebar & modal</Radio>
          <Radio color={'orange'} value="resourceView">Resource view (beta)</Radio>
        </RadioGroup>
      </div>
    </>
  )
}
