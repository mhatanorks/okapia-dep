import Link from "next/link";
import styles from "../styles/tripdetail.module.css";
import { Comment, Tour } from "../types/types";

export function ReviewComment({
  comment,
  tour,
}: {
  comment: Comment[];
  tour: Tour;
}) {
  return (
    <>
      {comment.length > 0 ? (
        <section className={styles.user__comment}>
          <div className={styles.user__comment_contents}>
            {comment.map((com) => {
              return (
                <div key={com.id} className={styles.user__comment_items}>
                  <div className={styles.user__comment_item}>
                    <div className={styles.user__comment_left}>
                      ニックネーム:
                    </div>
                    <div className={styles.user__comment_right}>{com.name}</div>
                  </div>
                  <div className={styles.user__comment_item}>
                    <div className={styles.user__comment_left}>投稿日:</div>
                    <div className={styles.user__comment_right}>{com.date}</div>
                  </div>
                  <div className={styles.user__comment_item}>
                    <div className={styles.user__comment_left}>口コミ:</div>
                    <div className={styles.user__comment_right}>{com.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href={`/comment/${tour.id}`}>
            <button className={styles.user__comment_btn}>口コミをかく</button>
          </Link>
        </section>
      ) : (
        <>
          <p className={styles.user__comment_none}>口コミはまだありません</p>
          <Link href={`/comment/${tour.id}`}>
            <button className={styles.user__comment_btn}>口コミをかく</button>
          </Link>
        </>
      )}
    </>
  );
}
