import useCookie from "../hooks/useCookie";
import { BackCart } from "../components/cartData/BackCart";
import { LocalCart } from "../components/cartData/LocalCart";
import { useState } from "react";

export default function Cart() {
  const cookie = useCookie();
  const loginId = cookie.loginId;

  const [amount, setAmount] = useState(0);

  return (
    <div>
      {loginId ? (
        <BackCart loginId={loginId} amount={amount} setAmount={setAmount} />
      ) : (
        <LocalCart amount={amount} setAmount={setAmount} loginId={loginId} />
      )}
    </div>
  );
}
