import styles from "../../styles//scss/search-page.module.scss";
import { City, Country } from "../../types/types";

//海外→北米を選んだ場合
export const NorthameCountry = ({
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
            <option value="ame">アメリカ</option>
          </select>
        </div>
        <div className={styles.serchdetail}></div>
      </div>
    </>
  );
};

//海外→北米→アメリカを選んだ場合
export const Uni = ({ city, setCity }: { city: City; setCity: Function }) => {
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
            <option value="vegas">ラスベガス</option>
            <option value="los">ロサンゼルス</option>
          </select>
        </div>
      </div>
    </>
  );
};
