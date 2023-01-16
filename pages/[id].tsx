import Head from "next/head";
import styles from "../styles/tripdetail.module.css";
import { TripdetailContent } from "../components/tripdetailContent";
import { TripdetailCount } from "../components/tripdetailCount";
import { TripdetailAttention } from "../components/tripdetailAttention";
import { TripdetailActivity } from "../components/tripdetailActivity";
import { TripdetailImage } from "../components/tripdetailImage";
import Layout from "../components/layout";
import { TripdetailTimes } from "../components/tripdetailTimes";
import { useState } from "react";
import { useRouter } from "next/router";
import useCookie from "../hooks/useCookie";
import { Tour, Comment } from "../types/types";
import { supabase } from "../utils/supabaseClient";
import { ReviewComment } from "../components/reviewComment";

export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("tours").select("*");
  if (!data) return;
  if (error) {
    console.log(error);
  }

  const tours = await data;
  const paths = tours.map((tour: { id: number }) => {
    return {
      params: {
        id: tour.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }:{params: any}) => {
  if (!params) return;
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("id", params.id);
  if (!data) return;
  if (error) {
    console.log(error);
  }
  const tour = await data[0];

  const comRes = await supabase
    .from("comment")
    .select("*")
    .eq("tourid", params.id);
  const comment = await comRes.data;
  console.log(comment);
  return {
    props: { tour, comment },
    revalidate: 10,
  };
};

export default function Tripdetail({
  tour,
  comment,
}: {
  tour: Tour;
  comment: Comment[];
}) {
  const [tourDate, setTourDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const router = useRouter();
  const cookie = useCookie();
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [error_message, setErrorMessage] = useState(false);

  async function PostData(e: { preventDefault: () => void }) {
    if (dateError === false || timeError === false) {
      setErrorMessage(true);
      return e.preventDefault();
    }
    const loginId = cookie.loginId;
    if (!loginId) {
      const toursJSON = localStorage.getItem("tours");
      const setNewData = {
        tours: [
          {
            id: tour.id,
            tourDate: tourDate, //新規データ
            startTime: startTime, //新規データ
            img1: tour.img1,
            tourName: tour.tourName,
            description: tour.description,
            numberOfPeople: numberOfPeople, //新規データ
            price: Number(tour.price),
            total: Number(tour.price * numberOfPeople),
          },
        ],
      };
      if (toursJSON === null) {
        localStorage.setItem("tours", JSON.stringify(setNewData));
      } else {
        const tours = JSON.parse(toursJSON);
        const addTourData = {
          tours: [
            ...tours.tours,
            {
              id: tour.id,
              tourDate: tourDate, //新規データ
              startTime: startTime, //新規データ
              img1: tour.img1,
              tourName: tour.tourName,
              description: tour.description,
              numberOfPeople: numberOfPeople, //新規データ
              price: Number(tour.price),
              total: Number(tour.price * numberOfPeople),
            },
          ],
        };
        localStorage.setItem("tours", JSON.stringify(addTourData));
      }
      router.push("/tour/cart");
    } else {
      const { data, error } = await supabase
        .from("inCarts")
        .select("*")
        .eq("userId", loginId);
      if (!data) return;
      if (error) {
        console.log(error);
      }

      const inCarts = await data;
      console.log(inCarts);
      {
        inCarts.map(
          async (cart: {
            id: number;
            tours: {
              id: number;
              tourDate: string; //新規データ
              startTime: string; //新規データ
              img1: string;
              tourName: string;
              description: string;
              numberOfPeople: number; //新規データ
              price: number;
              total: number;
            }[];
          }) => {
            await supabase
              .from("inCarts")
              .upsert({
                tours: [
                  ...cart.tours,
                  {
                    id: tour.id,
                    tourDate: tourDate, //新規データ
                    startTime: startTime, //新規データ
                    img1: tour.img1,
                    tourName: tour.tourName,
                    description: tour.description,
                    numberOfPeople: numberOfPeople, //新規データ
                    price: Number(tour.price),
                    total: Number(tour.price * numberOfPeople),
                  },
                ],
                userId: loginId,
                id: cart.id,
              })
              .eq("userId", loginId);
            router.push("/tour/cart");
          }
        );
      }
    }
  }
  const [tab, setTab] = useState(true);
  const ChangeTrue = () => {
    setTab(true);
  };
  const ChangeFalse = () => {
    setTab(false);
  };

  return (
    <>
      <Head>
        <title>{tour.tourName}</title>
      </Head>
      <Layout>
        <main className={styles.main}>
          <div className={styles.tour_tags}>
            <div
              className={styles.tour_tag}
              style={{ display: tour.area === null ? "none" : "block" }}
            >
              {tour.area}
            </div>
            <div className={styles.tour_tag}>{tour.country}</div>
          </div>
          <h1 className={styles.tour_title}>
            <span>{tour.tourName}</span>
          </h1>
          <TripdetailImage tour={tour} />
          <p className={styles.tour_description}>{tour.description}</p>

          {/* タブ切り替え */}
          <section className={styles.detail__tab}>
            <div className={styles.detail__tab_items}>
              <button className={styles.detail__tab_btn} onClick={ChangeTrue}>
                ツアー詳細
              </button>
              <button className={styles.detail__tab_btn} onClick={ChangeFalse}>
                口コミを見る
              </button>
            </div>
          </section>

          {tab ? (
            <section className={styles.tour_detail_info}>
              <div className={styles.tour_detail_info_items}>
                <TripdetailActivity tour={tour} /> {/* // アクティビティ概要 */}
                <TripdetailContent tour={tour} /> {/* // 含まれるもの */}
              </div>

              <div className={styles.tour_detail_info_items}>
                {/* // 人数 時間 時間 */}
                <div className={styles.tour_detail_info_item}>
                  <TripdetailCount setNumberOfPeople={setNumberOfPeople} />
                  <TripdetailTimes
                    tour={tour}
                    setTourDate={setTourDate}
                    setStartTime={setStartTime}
                    dateError={dateError}
                    setDateError={setDateError}
                    timeError={timeError}
                    setTimeError={setTimeError}
                  />
                </div>
                <TripdetailAttention /> {/* // 注意事項 */}
              </div>

              <span style={{ display: error_message ? "block" : "none" }}>
                {/* <div className={styles.error_message}> */}
                <p className={styles.error_message}>
                  *日付もしくは時間が指定されていません。*
                </p>
                {/* </div> */}
              </span>
              <div className={styles.button_position}>
                <button className={styles.button} onClick={PostData}>
                  カートに入れる
                </button>
              </div>
            </section>
          ) : (
            <ReviewComment comment={comment} tour={tour} />
          )}
        </main>
      </Layout>
    </>
  );
}
