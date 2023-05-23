import styles from "./LevelDisplay.module.css";

export type Level =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

const levelLabels = [
  "50",
  "100",
  "200",
  "300",
  "500",
  "1,000",
  "2,000",
  "4,000",
  "8,000",
  "16,000",
  "32,000",
  "64,000",
  "125,000",
  "500,000",
  "1,000,000",
];

export default function LevelDisplay({ level }: { level: Level }) {
  return (
    <aside>
      <h2>Level</h2>
      <ol className={styles.levels}>
        {levelLabels.map((label, index) => (
          <li key={index} className={index === level - 1 ? styles.active : ""}>
            {label}
          </li>
        ))}
      </ol>
    </aside>
  );
}
