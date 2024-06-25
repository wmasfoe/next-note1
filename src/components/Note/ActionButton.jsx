'use client'
import { useRouter } from 'next/navigation'

export default function EditButton({onClick, className, children, loading}) {
  const router = useRouter()
  
  const onClickProxy = async () => {
    try {
      if(!onClick) {
        return
      }
      const isJump = await onClick()
      if(isJump) {
        const path = '/note'
        router.push(path)
      }
    } catch(e) {
      alert(e?.message || 'unknown error')
    }
  }

  return <button className={`
    bg-gray-500
    w-32
    h-10
    leading-10
    rounded-3xl
    text-center
    cursor-pointer
    uppercase
    hover:bg-gray-600
    hover:outline-dashed
    hover:outline-1
    hover:outline-slate-400
    active:bg-slate-700
    active:outline-dotted
    ${className}
  `} disable={loading} onClick={onClickProxy}>
    { children }
  </button>
}