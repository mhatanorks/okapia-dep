import styles from "../styles/tripdetail.module.css";
import { Tour } from "../types/types";

type Props = {
  tour: Tour;
};
export function TripdetailActivity({ tour }: Props) {
  return (
    <div className={styles.tour_detail_info_item}>
      <h2>アクティビティ概要</h2>
      <ul className={styles.detail_list}>
        <li>無料キャンセル(ご出発日三日目まで)</li>
        <li>今すぐ予約＆後で支払う</li>
        <li>所要時間：{tour.times}時間</li>
        {/* <li>最小催行人数：{tour.minPeople}人</li> */}
        <li>集合場所：{tour.meetingPlace}</li>
        <li>金額：1名様&nbsp;{tour.price}円</li>
      </ul>
    </div>
  );
}
