import styles from "../../styles/scss/search-page.module.scss";
import { City, Country } from "../../types/types";

//海外→アジアを選んだ場合
export const AsiaCountry = ({
  onCountryChanege,
  country,
}: {
  onCountryChanege: Function;
  country: Country;
}) => {
  const changeHandler = (e: { target: { value: any } }) => {
    onCountryChanege(e.target.value);
  };
  return (
    <>
      <div className={styles.flex}>
        <div>
          <div>
            <label htmlFor="">国</label>
          </div>
          <select
            className={styles.search_input}
            value={country}
            name=""
            id=""
            onChange={changeHandler}
          >
            <option value="">-</option>
            <option value="ko">韓国</option>
            <option value="taiwa">台湾</option>
            <option value="phi">フィリピン</option>
          </select>
        </div>
        <div className={styles.serchdetail}></div>
      </div>
    </>
  );
};

//海外→アジア→韓国を選んだ場合
export const Korea = ({ city, setCity }: { city: City; setCity: Function }) => {
  const changeHandler = (e: { target: { value: any } }) => {
    setCity(e.target.value);
  };
  return (
    <>
      <div className={styles.flex}>
        <div>
          <div>
            <label htmlFor="">都市</label>
          </div>
          <select
            className={styles.search_input}
            value={city}
            name=""
            id=""
            onChange={changeHandler}
          >
            <option value="seoul">ソウル</option>
          </select>
        </div>
      </div>
    </>
  );
};

//海外→アジア→台湾を選んだ場合
export const Taiwan = ({
  setCity,
  city,
}: {
  city: City;
  setCity: Function;
}) => {
  const changeHandler = (e: { target: { value: any } }) => {
    setCity(e.target.value);
  };
  return (
    <>
      <div className={styles.flex}>
        <div>
          <div>
            <label htmlFor="">都市</label>
          </div>
          <select
            className={styles.search_input}
            value={city}
            name=""
            id=""
            onChange={changeHandler}
          >
            <option value="">-</option>
            <option value="taipei">台北</option>
            <option value="taichu">台中</option>
            <option value="tainan">台南</option>
          </select>
        </div>
      </div>
    </>
  );
};

//海外→アジア→台湾を選んだ場合
export const Philippines = ({
  setCity,
  city,
}: {
  city: City;
  setCity: Function;
}) => {
  const changeHandler = (e: { target: { value: any } }) => {
    setCity(e.target.value);
  };
  return (
    <>
      <div className={styles.flex}>
        <div>
          <div>
            <label htmlFor="">都市</label>
          </div>
          <select
            className={styles.search_input}
            value={city}
            name=""
            id=""
            onChange={changeHandler}
          >
            <option value="">-</option>
            <option value="mani">マニラ</option>
            <option value="sebu">セブ</option>
          </select>
        </div>
      </div>
    </>
  );
};
