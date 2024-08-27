import { motion, useInView, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

type props = {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
}

export const AppReveal = ({ children, width = 'fit-content' }: props) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView])

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 35 },
          visible: { opacity: 1, y: 0 }
        }}
        initial={'hidden'}
        animate={mainControls}
        transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
      >{children}</motion.div>
    </div>
  )
}
