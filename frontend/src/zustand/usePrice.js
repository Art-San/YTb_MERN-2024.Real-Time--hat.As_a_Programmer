import { create } from 'zustand'

const usePrice = create((set) => ({
  price: 0,
  setPrice: (price) => set({ price })

  //   increasePopulation: () => set((state) => ({ price: state.price + 1 })),
  //   decreasePopulation: () => set((state) => ({ price: state.price - 1 })),
  //   removeAllBears: () => set({ price: 0 })
}))

export default usePrice
