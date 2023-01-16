import styles from "../../styles/search-page.module.css";
import {
  Abroad,
  Prefecture,
  Area,
  Country,
  City,
  Tour,
} from "../../types/types";
import { EuropeCountry, France, Italy, Spain } from "./serchEurope";
import { AsiaCountry, Korea, Philippines, Taiwan } from "./serchAsia";
import { NorthameCountry, Uni } from "./sertchNorthAmerica";
import { Australia, OceCountry } from "./oceania";
import { Bra, SouthameCountry } from "./southame";
import { Africa, Egy } from "./africa";
import Link from "next/link";
import { useState } from "react";

type Props = {
  setUrl: Function;
  setSubtitle:Function
};

export function SearchBox({ setUrl,setSubtitle }: Props) {
  const [abroad, setAbroad] = useState<Abroad>("abroad");
  const [prefecture, setPrefecture] = useState<Prefecture>("");
  const [areaCode, setArea] = useState<Area>("");
  const [country, setCountry] = useState<Country>("");
  const [city, setCity] = useState<City>("");
  const onAbroadChange = (val: Abroad) => {
    setAbroad(val);
    setArea("");
    setCountry("");
    setPrefecture("");
  };

  const onAreaChange = (val: Area) => {
    setArea(val);
    setCountry("");
  };

  const onCountryChange = (val: Country) => {
    setCountry(val);
    setCity("");
  };

  const Abroad = ({
    abroad,
    onAbroadChange,
  }: {
    abroad: Abroad;
    onAbroadChange: Function;
  }) => {
    const changeHandler = (e: { target: { value: any } }) => {
      onAbroadChange(e.target.value);
    };

    return (
      <div className={styles.search__flex}>
        <div>
          <div>
            <label htmlFor="">国内 or 海外</label>
          </div>
          <select
            className={styles.search_input}
            value={abroad}
            name=""
            id=""
            onChange={changeHandler}
          >
            <option value="">-</option>
            <option value="abroad">海外</option>
            <option value="domestic">国内</option>
          </select>
        </div>
      </div>
    );
  };

  const RouteAbroad = ({
    area,
    onAreaChange,
  }: {
    area: Area;
    onAreaChange: Function;
  }) => {

    const changeHandler = (e: { target: { value: any } }) => {
      onAreaChange(e.target.value);
    };

    return (
      <div className={styles.flex}>
        <div>
          <div>
            <label htmlFor="">エリア</label>
          </div>
          <select
            className={styles.search_input}
            value={area}
            name=""
            id=""
            onChange={changeHandler}
          >
            <option value="">-</option>
            <option value="eu">ヨーロッパ</option>
            <option value="asi">アジア</option>
            <option value="northame">北米</option>
            <option value="southame">南米</option>
            <option value="oce">オセアニア</option>
            <option value="af">アフリカ</option>
          </select>
        </div>
        <div className={styles.serchdetail}></div>
      </div>
    );
  };


  // 国内を選んだ場合
  const RouteJapan = ({
    setPrefecture,
    prefecture,
  }: {
    setPrefecture: Function;
    prefecture: Prefecture;
  }) => {
    const changeHandler = (e: { target: { value: any } }) => {
      setPrefecture(e.target.value);
    };
    return (
      <div>
        <div>
          <div>
            <label htmlFor="">都道府県</label>
          </div>
          <select
            className={styles.search_input}
            value={prefecture}
            name=""
            id=""
            onChange={changeHandler}
          >
            <option value="-">-</option>
            <option value="hoka">北海道</option>
            <option value="miya"> 宮城</option>
            <option value="osk">大阪</option>
            <option value="kyo">京都</option>
            <option value="naga">長崎</option>
            <option value="fuku">福岡</option>
            <option value="oki"> 沖縄</option>
          </select>
        </div>
      </div>
    );
  };
  const onsubmitHandler = (e: { preventDefault: () => void }) => {
    setSubtitle(true);
    e.preventDefault();
    let query = "?";

    if (abroad.length > 0) {
      if (areaCode.length > 0) {
        if (country.length > 0) {
          if (city.length > 0) {
            query =
              query +
              `abroad=${abroad}&areaCode=${areaCode}&countryCode=${country}&cityCode=${city}`;
          } else {
            query =
              query +
              `abroad=${abroad}&areaCode=${areaCode}&countryCode=${country}`;
          }
        } else {
          query = query + `abroad=${abroad}&areaCode=${areaCode}`;
        }
      } else if (prefecture) {
        query = query + `abroad=${abroad}&prefecture=${prefecture}`;
      } else {
        query = (query + `abroad=${abroad}`);
      }
    }
   
    setUrl(`/api/supabaseTours${query}`);
  };
  return (
    <>
      <div className={styles.howtosearch}>
        <div className={styles.searchareaname}>地名から探す</div>
        <Link href="/map/search-map">
          <div className={styles.searchmap}>地図から探す</div>
        </Link>
      </div>
      <div className={styles.search_box_container}>
        <h3 className={styles.search_title}>Search tour</h3>
        <div className={styles.search_items}>
          <form action="">
            <div className={styles.flex}>
              <Abroad abroad={abroad} onAbroadChange={onAbroadChange} />
              {"abroad" === abroad && (
                <RouteAbroad area={areaCode} onAreaChange={onAreaChange} />
              )}
              {"domestic" === abroad && (
                <RouteJapan
                  prefecture={prefecture}
                  setPrefecture={setPrefecture}
                />
              )}
              {"eu" === areaCode && (
                <EuropeCountry
                  country={country}
                  onCountryChanege={onCountryChange}
                />
              )}
              {"asi" === areaCode && (
                <AsiaCountry
                  country={country}
                  onCountryChanege={onCountryChange}
                />
              )}
              {"northame" === areaCode && (
                <NorthameCountry
                  country={country}
                  onCountryChanege={onCountryChange}
                />
              )}
              {"oce" === areaCode && (
                <OceCountry
                  country={country}
                  onCountryChanege={onCountryChange}
                />
              )}
              {"southame" === areaCode && (
                <SouthameCountry
                  country={country}
                  onCountryChanege={onCountryChange}
                />
              )}
              {"af" === areaCode && (
                <Africa country={country} onCountryChanege={onCountryChange} />
              )}
              {"fr" === country && <France city={city} setCity={setCity} />}
              {"ita" === country && <Italy city={city} setCity={setCity} />}
              {"ko" === country && <Korea city={city} setCity={setCity} />}
              {"ame" === country && <Uni city={city} setCity={setCity} />}
              {"sp" === country && <Spain city={city} setCity={setCity} />}
              {"phi" === country && (
                <Philippines city={city} setCity={setCity} />
              )}
              {"taiwa" === country && <Taiwan city={city} setCity={setCity} />}
              {"aus" === country && <Australia city={city} setCity={setCity} />}
              {"bra" === country && <Bra city={city} setCity={setCity} />}
              {"egy" === country && <Egy city={city} setCity={setCity} />}
            </div>
            <button className={styles.search_submit} onClick={onsubmitHandler}>
              検索
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
