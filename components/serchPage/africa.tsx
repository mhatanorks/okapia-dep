import styles from "../../styles//scss/search-page.module.scss";
import { City, Country } from "../../types/types";

//海外→アフリカを選んだ場合
export const Africa = ({
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
            <option value="egy">エジプト</option>
          </select>
        </div>
        <div className={styles.serchdetail}></div>
      </div>
    </>
  );
};

//海外→北米→アメリカを選んだ場合
export const Egy = ({ city, setCity }: { city: City; setCity: Function }) => {
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
            <option value="kairo">カイロ</option>
          </select>
        </div>
      </div>
    </>
  );
};
