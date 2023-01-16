import styles from "../styles/tripdetail.module.css";

type Props = {
  tour: {
    times: number
  };
  setTourDate: Function;
  setStartTime: Function;
  dateError: boolean;
  setDateError: Function;
  timeError: boolean;
  setTimeError: Function;
};

export function TripdetailTimes({
  tour,
  setTourDate,
  setStartTime,
  dateError,
  setDateError,
  timeError,
  setTimeError,
}: Props) {
  function changeDate(e: { target: { value: string } }) {
    if(dateError === true && e.target.value === "") {
      setDateError(false);
    }else {
    setTourDate(e.target.value);
    setDateError(true);
  }
}

  function changeTime(e: { target: { value: string } }) {

    if(timeError === true && e.target.value === "0") {
      setTimeError(false);
    }else {
    setStartTime(Number(e.target.value));
    setTimeError(true);
    }

  }

  return (
    <div>
      <p>希望の日付を選択してください</p>
      <span
        className={styles.valid}
        style={{ display: dateError ? "none" : "block" }}
      >
        ※日付を入力してください
      </span>
      <br />
      <input type="date" className={styles.detail_form} onChange={changeDate} />

      <div>
        <p>希望の時間帯を選択してください</p>
        <span
          className={styles.valid}
          style={{ display: timeError ? "none" : "block" }}
        >
          ※時間を入力してください
        </span>

        <div>
          {tour.times >= 7 && (
            <select className={styles.detail_form} onChange={changeTime}>
              <option value="0">---</option>
              <option value="9">9:00</option>
              <option value="10">10:00</option>
            </select>
          )}

          {tour.times < 7 && tour.times >= 3 && (
            <select className={styles.detail_form} onChange={changeTime}>
              <option value="0">---</option>
              <option value="9">9:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
            </select>
          )}

          {tour.times < 3 && (
            <select className={styles.detail_form} onChange={changeTime}>
              <option value="0">---</option>
              <option value="9">9:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
