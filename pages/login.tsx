import styles from "../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { supabase } from "../utils/supabaseClient";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const data = {
    mailAddress: mailAddress,
    password: password,
  };

  //ログイン処理（CookieにsignedIn=trueとする）
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        console.log(response);
        response.json();
        if (response.status !== 200) {
          console.log("失敗");
          setError(true);
        } else if (response.status === 200) {
          const localTourJSON = localStorage.getItem("tours");
          if (localTourJSON === null) {
            router.push("/");
            console.log("トップページに遷移");
          } else {
            router.push("/pay");
            console.log("payに遷移");
          }

          //ここからログインしたidにローカルデータを紐付けるコードを記載
          const { data, error }: {data: any, error: any} = await supabase
            .from("users")
            .select("*")
            .eq("mailAddress", mailAddress)
            .eq("password", password);

          // await fetch(
          //   `/api/users?mailAddress=${mailAddress}&password=${password}`
          // )
          //   .then((response) => response.json())
          //   .then(async (dat) => {

          const user = data[0];
          // console.log(user);
          const id = user.id;
          // console.log(id);
          const localtours = JSON.parse(
            localStorage.getItem("tours") ?? '{"tours:[]}'
          );

          if (localtours.tours.length === 0) {
            return;
          } else {
            //バックデータのカートの中身を取得
            const { data }: {data: any} = await supabase
              .from("inCarts")
              .select("*")
              .eq("userId", id);
            console.log("datam", data);
            const cart = data[0];
            //supabaseにローカルのデータを保存。元々supabaseにあったものはそのまま。
            await supabase
              .from("inCarts")
              .update({ tours: [...cart.tours, ...localtours.tours] })
              .eq("userId", id);
          }
          localStorage.clear();
          // await fetch(`/api/inCarts?userId=${id}`)
          //   .then((response) => response.json())
          //   .then((data) => {
          //     const cart = data[0];
          //     //ローカルをバックカートに追加、元々のバックのツアーは残したまま
          //       // fetch(`/api/inCarts/${id}`, {
          //       //   method: "PATCH",
          //       //   headers: {
          //       //     "Content-Type": "application/json",
          //       //   },
          //       //   body: JSON.stringify({ tours: [...cart.tours, ...localtours.tours] }),
          //       // })
          //     ;
          //   });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
        <Head>
        <title>ログインページ</title>
      </Head>
      <Layout>
        <div className={styles.container}>
          <h3 className={styles.title}>下記からログインしてください。</h3>
          <div className={styles.inner_border}>
            <form onSubmit={handleSubmit} className={styles.input_form}>
              <div>
                <span
                  className={styles.error_message}
                  style={{ display: error ? "block" : "none" }}
                >
                  *入力に誤りがあります。*
                </span>
                <div>
                  <label htmlFor="mailAddress">メールアドレス</label>
                  <div>
                    <input
                      className={styles.input_name}
                      id="mailAddress"
                      type="email"
                      name="mailAddress"
                      onChange={(e) => setMailAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password">パスワード</label>
                  <div>
                    <input
                      className={styles.input_name}
                      id="password"
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.login_button}>
                  <button className={styles.button}>ログイン</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* container */}
        <Link href="/create-user">
          <button type="button" className={styles.reg_button}>
            新規登録はこちら
          </button>
        </Link>
      </Layout>
    </>
  );
}
