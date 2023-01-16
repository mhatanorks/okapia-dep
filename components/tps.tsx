// ページトップに戻るボタン

import styles from "../styles/toppage.module.css";
import { useState, useEffect } from "react";

const PAGE_Y_OFFSET = 400;

export const ScrTop = () => {
  const [src200, setScr200] = useState(false);

  const changeShow = () => {
    if (window.pageYOffset > PAGE_Y_OFFSET) {
      setScr200(true);
    } else {
      setScr200(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", changeShow);
    return () => window.removeEventListener("scroll", changeShow);
  }, []);

  if (src200)
    return (
      <div className={styles.scr_top}>
        <button onClick={scrollTop} className={styles.scr_top_btn}>
          <div className={styles.scr_top_bt}>＞</div>
        </button>
      </div>
    );
  else return null;
};
