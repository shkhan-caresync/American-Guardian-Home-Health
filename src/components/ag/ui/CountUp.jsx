import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionFlag } from "../../../lib/motion";

/**
 * Scroll-triggered animated counter component
 * Animates from 0 to target value when element enters viewport
 */
function CountUp({ value, suffix = "", duration = 1.5, className = "" }) {
  const reducedMotion = useReducedMotionFlag();
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || reducedMotion) {
      if (reducedMotion) {
        setCount(value);
      }
      return;
    }

    hasAnimated.current = true;
    let startTime = null;
    let animationFrame = null;

    const animate = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(eased * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value); // Ensure final value is exact
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">{count}</span>
      {suffix}
    </span>
  );
}

export default CountUp;
