import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  decreasePopulation: () => set((state) => ({ bears: state.bears - 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

const Test = () => {
  const bears = useStore((state) => state.bears)
  const increasePopulation = useStore((state) => state.increasePopulation)
  const decreasePopulation = useStore((state) => state.decreasePopulation)
  const removeAllBears = useStore((state) => state.removeAllBears)
  return (
    <>
      <div className=" flex flex-col w-[300px]">
        <h1 className=" text-2xl text-white">{bears} around here...</h1>
        <button
          className="btn btn-block btn-sm mt-2"
          onClick={increasePopulation}
        >
          one up
        </button>
        <button
          className="btn btn-block btn-sm mt-2 bg-slate-500"
          onClick={removeAllBears}
        >
          one up
        </button>
        <button
          className="btn btn-block btn-sm mt-2"
          onClick={decreasePopulation}
        >
          one up
        </button>
      </div>
    </>
  )
}

export default Test

// function BearCounter() {
//     const bears = useStore((state) => state.bears)
//     return <h1>{bears} around here...</h1>
//   }

//   function Controls() {
//     const increasePopulation = useStore((state) => state.increasePopulation)
//     return <button onClick={increasePopulation}>one up</button>
//   }
