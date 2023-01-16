import Link from "next/link";
import Head from "next/head";
import Layout from "../layout";
import styles from "../../styles/cart.module.css";
import { Cartlist } from "../CartList/cartlist";
import Styles from "../../styles/cartlist.module.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Tour } from "../../types/types";
import { useState } from "react";
import Router from "next/router";

type Props = {
  tours: Array<Tour>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  deleteHandler: Function;
  loginId: string;
};
export function CartItems({
  tours,
  amount,
  setAmount,
  deleteHandler,
  loginId,
}: Props) {
  const [errorMessage, setErrorMessage] = useState("");

  const [tourNew, setTourNew] = useState<any>([]);

  useEffect(() => {
    judgeError();
  }, [tours]);

  const judgeError = async () => {
    if (typeof tours === "undefined") {
      return;
    }
    let newTour = new Map();
    tours.map((tour) => {
      const v = newTour.get(tour.tourDate);
      if (v === undefined) {
        newTour.set(tour.tourDate, [tour.tourName]);
      } else if (Array.isArray(v)) {
        newTour.set(tour.tourDate, [...v, tour.tourName]);
      }
    });

    setTourNew(newTour);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // 無効な入力値で送信されないために初めにキャンセルする
    e.preventDefault();

    if (tours.length === 0) {
      setErrorMessage("*カートに商品を追加してください。*");
    } else if (!loginId) {
      Router.push("/tour/login") as any;
    } else {
      Router.push("/tour/pay") as any;
    }
  };
  return (
    <>
      <Head>
        <title>買い物リスト</title>
      </Head>
      <Layout>
        <main>
          <div className={Styles.cart_width}>
            <h1>ツアーカート</h1>

            {tours.length ? (
              <>
                <div className={Styles.cartcontents}>
                  {tours.map((tour: { id: number }) => {
                    return (
                      <Cartlist
                        key={tour.id}
                        tour={tour}
                        setAmount={setAmount}
                        deleteHandler={deleteHandler}
                        tourNew={tourNew}
                      />
                    );
                  })}
                </div>
                <h2>合計：{Number(amount).toLocaleString()}円</h2>
                <p className={styles.error_message}>{errorMessage}</p>
                <div className={styles.buttonsubmit}>
                  <div>
                    <form onSubmit={handleSubmit}>
                      {!loginId ? (
                        <button className={styles.submit} type="submit">
                          お支払い情報の入力へ進む
                        </button>
                      ) : (
                        <button className={styles.submit} type="submit">
                          お支払い情報の入力へ進む
                        </button>
                      )}
                    </form>
                  </div>
                  <div>
                    <Link href="/">
                      <button className={styles.submit} type="submit">
                        他のツアーを追加する
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className={styles.bookingC_error}>
                  カートにツアーが追加されていません
                </p>

                <Link href="/">
                  <div className={styles.bookingC_btn}>
                    <button className={styles.bookingC_btn_search}>
                      ツアーを探す
                    </button>
                  </div>
                </Link>
              </>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
}
