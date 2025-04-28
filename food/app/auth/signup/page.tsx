"use client"

import { useState, useContext } from "react"
import { motion } from "framer-motion"
import { Step } from "./step"
import { Step1 } from "./step1"

export default function Home() {
  const [step, setStep] = useState<number>(0)
  type StepProps = {
    handlePrev: () => void
    handleNext: () => void
  }
  const handlePrev = async () => setStep((prev) => prev - 1)
  const handleNext = async () => setStep((prev) => prev + 1)

  const handleAnimation = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.5 },
  }

  return (
    <motion.div
      key={step}
      className="flex justify-center items-center h-screen w-screen bg-[#F4F4F4]"
      variants={handleAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {step === 0 && <Step handlePrev={handlePrev} handleNext={handleNext} />}
      {step === 1 && <Step1 handlePrev={handlePrev} handleNext={handleNext} />}
    </motion.div>
  )
}
