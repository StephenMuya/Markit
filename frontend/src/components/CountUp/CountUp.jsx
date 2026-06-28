import { useCountUp } from "./useCountUp";

export default function CountUp({ target, suffix = "", duration = 2000 }) {
  // Extract state and business logic into a custom hook
  const { count, ref } = useCountUp(target, duration);

  // Purely presentational formatting
  const formatted = count.toLocaleString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}
