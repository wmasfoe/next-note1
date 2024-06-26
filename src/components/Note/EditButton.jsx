'use client'
import { useRouter } from 'next/navigation'
import ActionButton from './ActionButton'
export default function EditButton({noteId, children, className}) {
  const router = useRouter()

  const handleClick = () => {
    let path = '/note/edit'
    if(noteId) {
      path += `/${noteId}`
    }
    router.push(path)
    return false
  }
  
  return <ActionButton
    className={className}
    onClick={handleClick}
  >
    { children }
  </ActionButton>
}