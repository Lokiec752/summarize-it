import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className="flex justify-center rounded-md text-white text-xl">
      Loading
      <div className={styles.dots}>
        {[".", ".", "."].map((dot, i) => (
          <span key={i}>{dot}</span>
        ))}
      </div>
    </div>
  );
}
