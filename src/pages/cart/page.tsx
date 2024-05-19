import Button from "../../components/button";
import Store from "../../store";
import numbersOnly from "../../util/numbersOnly";

export default function CartPage() {
  const cart = Store.useSelector((state) => state.cart);
  const dispatch = Store.useDispatch();
  const cartItems = Object.entries(cart);
  const totalDays = cartItems.reduce((a, b) => a + b[1].days, 0);
  const total = (totalDays * 3.99).toFixed(2);

  function onBlur(days: number, id: number, title: string) {
    dispatch(Store.actions.cart.update({ id, title, days }));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = numbersOnly(e.currentTarget.value);
  }

  function confirmPurchase() {
    dispatch(Store.actions.rent.add(cart));
    dispatch(Store.actions.cart.clear());
  }

  return (
    <div className="mx-auto mt-16 flex w-11/12 flex-col gap-x-10 gap-y-4 text-slate-200 lg:flex-row">
      <ul className="flex flex-auto flex-col gap-2 overflow-scroll rounded-lg border border-slate-200 p-2">
        {cartItems.map(([key, value]) => (
          <li key={key} className="flex items-center justify-between gap-4 ">
            <span className="truncate">{value.title}</span>
            <div className="flex items-center gap-4">
              DAYS:
              <input
                onChange={onChange}
                onBlur={(e) =>
                  onBlur(
                    parseInt(e.currentTarget.value),
                    parseInt(key),
                    value.title,
                  )
                }
                className="w-12 appearance-none  border-b border-slate-200 bg-transparent p-1 text-center"
                defaultValue={value.days}
              />
              <Button
                className="material-symbols-outlined rounded-lg px-[8px]"
                color="red"
                onClick={() =>
                  dispatch(Store.actions.cart.remove(parseInt(key)))
                }
              >
                delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex h-56 w-full flex-col gap-2 rounded-lg border border-slate-200 p-2 lg:w-48">
        <div className="flex justify-between">
          <span>Movie x{totalDays}:</span>
          <span>U$ {total}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>U$ {total}</span>
        </div>
        <div className="flex justify-between">
          <span>Discounts:</span>
          <span>- U$ 0.00</span>
        </div>
        <div className="mb-2 mt-auto flex justify-between">
          <span>Total:</span>
          <span>U$ {total}</span>
        </div>
        <Button onClick={confirmPurchase} color="green" className="rounded-lg">
          Confirm purchase!
        </Button>
      </div>
    </div>
  );
}
