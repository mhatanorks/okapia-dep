import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Tour } from "../../types/types";
import { supabase } from "../../utils/supabaseClient";

// データ取得
// ページ読み込み時にsupabaseのデータ取得
export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("tours").select("*"); // テーブル名 "tours" のデータを取得
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
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

export const getStaticProps = async ({ params }: { params: any }) => {
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("id", params.id); // テーブル名 "tours.id" のデータを取得
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const tour = await data;
  return {
    props: { tour },
    revalidate: 10,
  };
};

export default function Comment({ tour }: { tour: Array<Tour> }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [tourid, setTourid] = useState(0);
  const [thanksmessage, setThanksmessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTourid(tour[0].id);
  }, [tour]);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newdate = new Date();
    let year = newdate.getFullYear();
    let month = newdate.getMonth() + 1;
    let aday = newdate.getDate();

    let date = `${year}-${month}-${aday}`;

    if (!text) {
    } else {
      await supabase.from("comment").insert({ tourid, name, text, date });
      setThanksmessage((prev) => !prev);
      setTimeout(() => {
        router.push("/tour");
      }, 2000);
    }
  };

  //リセット
  const clickHandler = () => {
    setText("");
    setName("");
  };

  const changetextHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  const changenameHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Layout>
        <title>オカピツアーコメント記入</title>
        <h2>口コミ</h2>
        <form onSubmit={submitHandler}>
          <h2>ツアーの感想ご記入をお願いいたします。</h2>
          <p>参加ツアー：{tour[0].tourName}</p>
          <br />
          <label htmlFor="">
            ニックネーム
            <br />
            <input type="text" value={name} onChange={changenameHandler} />
          </label>
          <br />
          <label htmlFor="">
            コメント
            <br />
            <textarea
              cols={50}
              rows={10}
              value={text}
              onChange={changetextHandler}
            ></textarea>
          </label>
          <br />
          <button type="submit">送信</button>
          <button onClick={clickHandler}>リセット</button>
          {thanksmessage ? (
            <div>
              <p>口コミありがとうございました。</p>
              <p>3秒後にトップ画面へ遷移します。</p>
            </div>
          ) : (
            ""
          )}
        </form>
      </Layout>
    </div>
  );
}
