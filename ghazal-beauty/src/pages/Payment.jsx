function Payment() {
  return (
    <div className="grid place-items-center">
      <img
        src="behPardakht.jpg"
        alt="mock payment page"
        className="w-full relative"
      />
      <div className="vertical-flex gap-1 w-[21rem] text-[#f0f0f0] font-bold absolute top-[71%] left-[49%]">
        <button className="rounded-full bg-gradient-to-r from-green-500 to-lime-400 py-4 w-3/4">
          پرداخت
        </button>
        <button className="rounded-full bg-amber-300 py-4 w-1/4">
          انصراف
        </button>
      </div>
    </div>
  );
}

export default Payment;
