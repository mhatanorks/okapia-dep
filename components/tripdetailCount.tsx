import { Dispatch, SetStateAction } from "react";
import styles from "../styles/tripdetail.module.css";

export function TripdetailCount({
  setNumberOfPeople,
}: {
  setNumberOfPeople: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div>
      <p>参加人数を選択してください</p>
      <div className={styles.count}>
        <form action="get">
          <select
            className={styles.detail_form}
            onChange={(e) => setNumberOfPeople(Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </form>
      </div>
    </div>
  );
}
