import styles from "./Loading.module.css";

type LoadingProps = {
  text?: string;
};

export default function Loading({ text }: LoadingProps) {
  const textToDisplay = text ?? "Loading";
  return (
    <div className="flex justify-center rounded-md text-xl text-white">
      {textToDisplay}
      <div className={styles.dots}>
        {[".", ".", "."].map((dot, i) => (
          <span key={i}>{dot}</span>
        ))}
      </div>
    </div>
  );
}
