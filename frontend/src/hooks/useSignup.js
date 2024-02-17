import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender
    })
    if (!success) return

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender
        })
      })

      const data = await res.json()
      // console.log('useSignup data', data)
      if (data.error) {
        throw new Error(data.error) // catch  поймает эту ошибку и покажет тост
      }
      localStorage.setItem('chat-user', JSON.stringify(data)) // сохраняем usera localStorage, а потом с помощью context достаем
      setAuthUser(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, signup }
}
export default useSignup

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Пожалуйста, заполните все поля')
    return false
  }

  if (password !== confirmPassword) {
    toast.error('Пароли не совпадают')
    return false
  }

  if (password.length < 6) {
    toast.error('Пароль должен быть не менее 6 символов')
    return false
  }

  return true
}
