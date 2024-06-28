'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { importNote } from '@/actions/importNote'

export default function SidebarImport() {
  const router = useRouter()
  const submitRef = useRef(null)
  const formRef = useRef(null)

  async function upload(formData) {

    if (!file) {
      console.warn("files list is empty");
      return;
    }

    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`)

    } catch (error) {
      console.error("something went wrong");
    }

    formRef.current?.reset()
  }

  function customSubmit() {
    submitRef.current?.click()
  }

  return (
    <form ref={formRef} action={upload}>
      <div style={{ textAlign: "center" }}>
        <label htmlFor="file" style={{ cursor: 'pointer' }}>Import .md File</label>
        <input type="file" id="file" name="file" style={{ position : "absolute", clip: "rect(0 0 0 0)" }} onChange={ customSubmit } accept=".md" />
      </div>
      <button type='submit' ref={submitRef} hidden></button>
    </form>
    
  )
}
