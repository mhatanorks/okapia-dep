import Image from "next/image";
import Link from "next/link";
import { Tour } from "../../types/types";
import styles from "../../styles/search-page.module.css";
import Layout from "../../components/layout";
import Head from "next/head";
import { supabase } from "../../utils/supabaseClient";

export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("tours").select("*");
  if (!data) return;
  if (error) {
    console.log(error);
  }

  const tours = await data;
  const paths = tours.map((tour: { areaId: number }) => {
    return {
      params: {
        areaId: tour.areaId.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: {params: { areaId: number }}) => {
  if (!params) return;
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("areaId", params.areaId);
  if (!data) return;
  if (error) {
    console.log(error);
  }

  const tour = await data;

  return {
    props: { tour },
    revalidate: 10,
  };
};

export default function worldMapContent({ tour }: { tour: Array<Tour> }) {
  return (
    <>
      <Head>
        <title>検索結果</title>
      </Head>
      <Layout>
        {tour[0].abroad === "abroad" ? (
          <p className={styles.headlineArea}>{tour[0].country}</p>
        ) : (
          <p className={styles.headlineArea}>{tour[0].city}</p>
        )}
        <div className={styles.headline}>検索結果</div>

        {tour.map((to) => {
          return (
            <div key={to.id} id="content" className={styles.eachcontent}>
              <div className={styles.result__flex}>
                <div className={styles.result_image}>
                  <Image
                    src={to.img1}
                    layout="fill"
                    alt="画像"
                    className={styles.image}
                  />
                </div>
                <div>
                  <div className={styles.title}>
                    <span>{to.tourName}</span>
                  </div>

                  <div className={styles.tour_tags}>
                    <div
                      className={styles.tour_tag}
                      style={{ display: to.area === null ? "none" : "block" }}
                    >
                      {to.area}
                    </div>
                    <div className={styles.tour_tag}>{to.country}</div>
                    <div className={styles.tour_tag}>{to.city}</div>
                  </div>

                  <div className={styles.result__flex_items}>
                    <div className={styles.result__flex_item}>
                      <div id="info">
                        <ul className={styles.list}>
                          <span className={styles.span}>概要</span>
                          <li>価格: {to.price.toLocaleString()}円 ~</li>
                          <li>集合: {to.meetingPlace}</li>
                        </ul>
                      </div>

                      <div id="tourcontent">
                        <ul className={styles.list_includes}>
                          <span className={styles.span}>含まれるもの</span>
                          <li>{to.content1}</li>
                          <li>{to.content2}</li>
                          <li>{to.content3}</li>
                        </ul>
                      </div>
                    </div>

                    <div id="button" className={styles.button_around}>
                      <Link href={`/tour/${to.id}`}>
                        <button className={styles.button}>詳細はこちら </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Layout>
    </>
  );
}
