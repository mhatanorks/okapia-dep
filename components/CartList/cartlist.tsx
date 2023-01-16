import Image from "next/legacy/image";
import { CartdetailCount } from "./cartdetailCount";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import useCookie from "../../hooks/useCookie";
import Styles from "../../styles/cartlist.module.css";

type Props = {
  tour:any;
  setAmount: Dispatch<SetStateAction<number>>;
  deleteHandler: Function;
  tourNew:any;
};

export const Cartlist = ({ tour, setAmount, deleteHandler,tourNew}: Props) => {
  const cookie = useCookie();
  const loginId = cookie.loginId;
  const [num, setNum] = useState(tour.numberOfPeople);
  const router = useRouter();

  const HandleNumChange = (e: { target: { value: any } }) => {
    const newNum = e.target.value;
    setNum(newNum);
    setAmount((prev: number) => prev - tour.price * num + tour.price * newNum);
  };

  const deletesumHandler=(val:number)=>{
    deleteHandler(val);
    setAmount((prev:number)=>prev-tour.price*num);
  }

  return (
    <>
      <div className={Styles.each_tour} >
        <p className={Styles.duplicate}>
          {Array.isArray(tourNew.get(tour.tourDate))&&
          tourNew.get(tour.tourDate).length>1&&
          "※"+(tourNew.get(tour.tourDate)).filter(function(value : any){
            return value !=tour.tourName
          })+"と日程が重複しています。"}
        </p>
        <h3 className={Styles.padding}>{tour.tourName}</h3>
        <div className={Styles.flex}>
          <Image src={tour.img1} width={180} height={130} alt="ツアー画像" />
          <div className={Styles.tourinfo}>
            <ul className={Styles.list}>
              <li>日程：{tour.tourDate}</li>
              <li>開始時間：{tour.startTime}時</li>
              <li>概要：{tour.description}</li>
              <li>価格：{Number(tour.price).toLocaleString()}円</li>
            </ul>
          </div>
          <div className={Styles.delete_count_total}>
            <button
              className={Styles.delete_button}
              type="submit"
              onClick={(e) => deletesumHandler(tour.id)}
            >
              削除
            </button>
            <div className={Styles.cartlist_items}>
              <CartdetailCount num={num} HandleNumChange={HandleNumChange} />
              <div className={Styles.total_value}>
                小計：{Number(tour.price * num).toLocaleString()}円
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
