import { motion, AnimatePresence } from "framer-motion";

const RollingNumber = ({ value, duration = 0.1, className }) => {
  const digits = value.toFixed(2).split("");

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {digits.map((digit, idx) => (
        <span
          key={idx}
          style={{
            display: "inline-block",
            position: "relative",
            width: "0.6em",
            height: "1.1em",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={digit} 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration, ease: "linear" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                display: "inline-block",
              }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
};

export default RollingNumber;
