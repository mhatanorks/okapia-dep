import styles from "../styles/footer.module.css";
import { ScrTop } from "./tps";

export function Footer() {
  return (
    <>
    <div className={styles.footer}>
      <p className={styles.copy}>&copy; Okapia Tour</p>
    </div>
    <ScrTop/>
    </>
  );
}
