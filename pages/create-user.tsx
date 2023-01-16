import styles from "../styles/crete-user.module.css";
import Head from "next/head";
import { useState } from "react";
import Layout from "../components/layout";
import Router from "next/router";
import { supabase } from "../utils/supabaseClient";

const CreateUser = () => {
  const [lastName, setLastName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [tel, setTel] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [birthY, setBirthY] = useState("");
  const [birthM, setBirthM] = useState("");
  const [birthD, setBirthD] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  // チェクボックスクリックでboolean反転
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // 無効な入力値で送信されないために初めにキャンセルする
    e.preventDefault();
    //半角英数字のみ(空文字OK)

    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    if (!lastName) {
      setError(true);
      setErrorMessage("*姓を入力してください*");
    } else if (!firstName) {
      setError(true);
      setErrorMessage("名を入力してください");
    } else if (!lastNameKana) {
      setError(true);
      setErrorMessage("姓(ふりがな)を入力してください");
    } else if (!firstNameKana) {
      setError(true);
      setErrorMessage("名(ふりがな)を入力してください");
    } else if (!tel) {
      setError(true);
      setErrorMessage("*電話番号を入力してください*");
    } else if (!tel.match(/^0[-0-9]{9,12}$/)) {
      setError(true);
      setErrorMessage("*電話番号は９~12桁の半角数字を入力してください*");
    } else if (!mailAddress) {
      setError(true);
      setErrorMessage("*メールアドレスを入力してください*");
    } else if (!regex.test(mailAddress)) {
      setError(true);
      setErrorMessage("*メールアドレスを正しく入力してください*");
    } else if (!password) {
      setError(true);
      setErrorMessage("*パスワードを入力してください*");
    } else if (password.length < 4) {
      setError(true);
      setErrorMessage("*パスワードは4桁以上15桁以下入力してください*");
    } else if (password.length > 15) {
      setError(true);
      setErrorMessage("*パスワードは4桁以上15桁以下入力してください*");
    } else if (!passwordConfirm) {
      setError(true);
      setErrorMessage("*確認用パスワードを入力してください*");
    } else if (password !== passwordConfirm) {
      setError(true);
      setErrorMessage("*パスワードと確認用パスワードが一致しません*");
    } else if (isChecked === false) {
      setError(true);
      setErrorMessage("");
    } else {
      // supabaseに登録情報を送信
      await supabase.from("users").insert({
        lastName,
        lastNameKana,
        firstName,
        firstNameKana,
        mailAddress,
        tel,
        password,
        birthY,
        birthM,
        birthD,
      });

      // 送信したユーザーのIDを取得
      const { data, error }: {data: any, error: any} = await supabase
        .from("users")
        .select()
        .eq("mailAddress", `${mailAddress}`);
      const id = data[0];
      const userId = id.id;
      const tours = [] as [];
      // inCartsにユーザーのかごを作る
      await supabase.from("inCarts").insert({ userId, tours });
      (await Router.push("/tour/login")) as any; // .reloaded()リロード
    }
  };

  return (
    <>
      <Head>
        <title>新規会員登録ページ</title>
      </Head>
      <Layout>
        <section className={styles.register}>
          <h3 className={styles.title}>新規会員登録</h3>
          <div className={styles.container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form_name}>
                <div className={styles.form_name_side}>
                  <div className={styles.name_kanji}>
                    <label className={styles.form_label} htmlFor="">
                      姓
                    </label>
                    <div>
                      <input
                        className={styles.input_name}
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.name_kana}>
                    <label className={styles.form_label} htmlFor="">
                      名
                    </label>
                    <div>
                      <input
                        className={styles.input_name}
                        type="lastName"
                        name="lastName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* form_name_side */}

                <div className={styles.form_name_side}>
                  <div className={styles.name_kanji}>
                    <label className={styles.form_label} htmlFor="">
                      姓(ふりがな)
                    </label>
                    <div>
                      <input
                        className={styles.input_name}
                        type="text"
                        name="firstNameKana"
                        value={lastNameKana}
                        onChange={(e) => setLastNameKana(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.name_kana}>
                    <label className={styles.form_label} htmlFor="">
                      名(ふりがな)
                    </label>
                    <div>
                      <input
                        className={styles.input_name}
                        type="text"
                        name="lastNameKana"
                        value={firstNameKana}
                        onChange={(e) => setFirstNameKana(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* form_name_side */}
              </div>
              {/* form_name */}

              <div className={styles.form_birth}>
                <label className={styles.form_label} htmlFor="">
                  生年月日  
                </label>
                <div className={styles.form_birth_group}>
                  <div className={styles.form_birth_group_y}>
                    <label className={styles.form_label} htmlFor="">
                      年(西暦)
                    </label>
                    <select
                      className={styles.input_select}
                      name="birthY"
                      value={birthY}
                      onChange={(e) => setBirthY(e.target.value)}
                    >
                      <SelectYear />
                    </select>
                  </div>
                  <div className={styles.form_birth_group_m}>
                    <label className={styles.form_label} htmlFor="">
                      月
                    </label>
                    <select
                      className={styles.input_select}
                      name="birthM"
                      value={birthM}
                      onChange={(e) => setBirthM(e.target.value)}
                    >
                      <SelectMonth />
                    </select>
                  </div>
                  <div className={styles.form_birth_group_d}>
                    <label className={styles.form_label} htmlFor="">
                      日
                    </label>
                    <select
                      className={styles.input_select}
                      name="birthD"
                      value={birthD}
                      onChange={(e) => setBirthD(e.target.value)}
                    >
                      <SelectDays />
                    </select>
                  </div>
                </div>
              </div>
              {/* form_birth */}

              <div className={styles.form_address}></div>

              <div className={styles.form_tmp}>
                <label className={styles.form_label} htmlFor="">
                  電話番号
                </label>
                <div>
                  <input
                    className={styles.input}
                    type="tel"
                    name="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.form_tmp}>
                <label className={styles.form_label} htmlFor="">
                  メールアドレス
                </label>
                <div>
                  <input
                    className={styles.input}
                    type="email"
                    name="mailAddress"
                    value={mailAddress}
                    onChange={(e) => setMailAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.form_tmp}>
                <label className={styles.form_label} htmlFor="">
                  パスワード
                </label>
                <div>
                  <input
                    className={styles.input}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.form_tmp}>
                <label className={styles.form_label} htmlFor="">
                  パスワード確認
                </label>
                <div>
                  <input
                    className={styles.input}
                    type="password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.privacy}>
                <input type="checkbox" onChange={() => toggleCheckbox()} />
                <span>
                  <span className={styles.red}>
                    会員規約・プライバシーポリシー
                  </span>
                  に同意する
                </span>
              </div>

              <span
                className={styles.error_message}
                style={{ display: error ? "block" : "none" }}
              >
                {errorMessage}
              </span>
              <div className={styles.create_user_btn}>
                <button className={styles.btn} type="submit" value="追加">
                  登録
                </button>
              </div>
            </form>
          </div>
          {/* container */}
        </section>
      </Layout>
    </>
  );
};
export default CreateUser;

// プルダウンデータ
const SelectYear = () => {
  return (
    <>
      <option value="">-</option>
      <option value="1950">1950</option>
      <option value="1951">1951</option>
      <option value="1952">1952</option>
      <option value="1953">1953</option>
      <option value="1954">1954</option>
      <option value="1955">1955</option>
      <option value="1956">1956</option>
      <option value="1957">1957</option>
      <option value="1958">1958</option>
      <option value="1959">1959</option>
      <option value="1960">1960</option>
      <option value="1961">1961</option>
      <option value="1962">1962</option>
      <option value="1963">1963</option>
      <option value="1964">1964</option>
      <option value="1965">1965</option>
      <option value="1966">1966</option>
      <option value="1967">1967</option>
      <option value="1968">1968</option>
      <option value="1969">1969</option>
      <option value="1970">1970</option>
      <option value="1971">1971</option>
      <option value="1972">1972</option>
      <option value="1973">1973</option>
      <option value="1974">1974</option>
      <option value="1975">1975</option>
      <option value="1976">1976</option>
      <option value="1977">1977</option>
      <option value="1978">1978</option>
      <option value="1979">1979</option>
      <option value="1980">1980</option>
      <option value="1981">1981</option>
      <option value="1982">1982</option>
      <option value="1983">1983</option>
      <option value="1984">1984</option>
      <option value="1985">1985</option>
      <option value="1986">1986</option>
      <option value="1987">1987</option>
      <option value="1988">1988</option>
      <option value="1989">1989</option>
      <option value="1990">1990</option>
      <option value="1991">1991</option>
      <option value="1992">1992</option>
      <option value="1993">1993</option>
      <option value="1994">1994</option>
      <option value="1995">1995</option>
      <option value="1996">1996</option>
      <option value="1997">1997</option>
      <option value="1998">1998</option>
      <option value="1999">1999</option>
      <option value="2000">2000</option>
      <option value="2001">2001</option>
      <option value="2002">2002</option>
      <option value="2003">2003</option>
      <option value="2004">2004</option>
      <option value="2005">2005</option>
      <option value="2006">2006</option>
      <option value="2007">2007</option>
      <option value="2008">2008</option>
      <option value="2009">2009</option>
      <option value="2010">2010</option>
    </>
  );
};
const SelectMonth = () => {
  return (
    <>
      <option value="">-</option>
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
      <option value="11">11</option>
      <option value="12">12</option>
    </>
  );
};
const SelectDays = () => {
  return (
    <>
      <option value="">-</option>
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
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
    </>
  );
};

// const data = {
//   firstName,
//   firstNameKana,
//   lastName,
//   lastNameKana,
//   mailAddress,
//   tel,
//   password,
//   birthY,
//   birthM,
//   birthD,
// };
// const res = await fetch("/api/users", {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// });

// const resResult = await res.json();
// const inCartsData = {
//   userId: resResult.id,
//   tours: [],
// };

// const addInCarts = await fetch("/api/inCarts", {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(inCartsData),
// });
// console.log(await addInCarts.json());
// await Router.push("/tour/login") as any; // .reloaded()リロード
// }
