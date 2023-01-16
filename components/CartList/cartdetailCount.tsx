import Styles from "../../styles/cartlist.module.css";
type Props = {
  num: number;
  HandleNumChange: any;
};

export const CartdetailCount = ({ num, HandleNumChange }: Props) => {
  return (
    <>
      <div>
        <label htmlFor="">人数</label>
        <select
          className={Styles.cart_detail_count}
          value={num}
          onChange={HandleNumChange}
        >
          <option value=""></option>
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
        </select>
      </div>
    </>
  );
};
