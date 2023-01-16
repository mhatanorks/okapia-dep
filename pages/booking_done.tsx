import Head from "next/head";
import styles from "../styles/booking_done.module.css";
import Link from "next/link";
import useCookie from "../hooks/useCookie";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Order } from "../types/types";


export default function BookingDone() {
  const cookie = useCookie();
  const loginId = cookie.loginId;
  const [numData, setNumData] = useState<Order>();
  //  if (!numData) return;
   

  useEffect(() => {
    getOrders();
  }, [loginId]);
  const [data, setData] = useState<Order[]>([]);
  const getOrders = async () => {
    let { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("userId", loginId);
    if (!data) return <div>loading...</div>;
    setData(data);
    console.log("data", data)

    const cartItem = data[data.length - 1];
    setNumData(cartItem);
    console.log("numData", numData);
  };

  console.log("numData", numData);

  

  return (
    <>
      <Head>
        <title>予約完了フォーム</title>
      </Head>
      <Layout>
        <main>
          <div className={styles.booking_title}>
            <h2>予約が完了しました</h2>
          </div>
          <p className={styles.booking_thanks}>
            お申し込みいただき、ありがとうございます！
          </p>

          <div className={styles.booking_number}>
            <p>ご予約を承りました。</p>
            <p>ご予約番号</p>
              { numData? 
                   <p className={styles.booking_RsNumber}>{numData.rsNumber}</p>
                :""}
            <p className={styles.booking_message}>
              お問合せに必要な番号です。大切に保管してください。
            </p>
          </div>

          <p className={styles.booking_message}>
            ご予約確認ページよりお申し込み内容お申し込み内容をご確認いただけます。
          </p>

          <div className={styles.booking_button}>
            <Link href="/booking_confirmation">
              <button className={styles.booking_btn} type="submit">
                予約確認へ
              </button>
            </Link>
          </div>

          <div className={styles.booking_note}>
            <p>
              銀行支払い/コンビニ支払いの方は、メールの『お支払い方法はこちら』をご確認ください。
            </p>
          </div>
        </main>
      </Layout>
    </>
  );
}
