import styles from "../../styles//scss/search-page.module.scss";
import { City, Country } from "../../types/types";

//海外→南米を選んだ場合
export const SouthameCountry = ({
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
            <option value="bra">ブラジル</option>
          </select>
        </div>
        <div className={styles.serchdetail}></div>
      </div>
    </>
  );
};

//海外→南米→ブラジルを選んだ場合
export const Bra = ({ city, setCity }: { city: City; setCity: Function }) => {
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
            <option value="rio">リオデジャネイロ</option>
            <option value="braziria">ブラジリア</option>
          </select>
        </div>
      </div>
    </>
  );
};
