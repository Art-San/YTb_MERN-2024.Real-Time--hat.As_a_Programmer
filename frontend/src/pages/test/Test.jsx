import usePrice from '../../zustand/usePrice'

const Test = () => {
  const { price, setPrice } = usePrice()

  const handleIncrement = () => {
    setPrice(price + 1)
  }
  const handleRemove = () => {
    setPrice(0)
  }

  const handleDecrement = () => {
    setPrice(price - 1)
  }

  return (
    <>
      <div className=" flex flex-col w-[300px] ">
        <h1 className=" text-2xl bg-slate-100 opacity-80 text-slate-600">
          {price} RUB...
        </h1>
        <button className="btn btn-block btn-sm mt-2" onClick={handleIncrement}>
          Plus
        </button>
        <button
          className="btn btn-block btn-sm mt-2 bg-slate-500"
          onClick={handleRemove}
        >
          Zero
        </button>
        <button className="btn btn-block btn-sm mt-2" onClick={handleDecrement}>
          Minus
        </button>
      </div>
    </>
  )
}

export default Test
