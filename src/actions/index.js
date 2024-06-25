'use server'
import { delNote, addNote, updateNote } from '@lib/redis'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const saveSchema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100'),
})

const updateSchema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100'),
  noteId: z.string()
})


export async function saveNote(prevFormData, formData) {
  const title = formData.get('title')
  const content = formData.get('content')
  const noteId = formData.get('noteId')
  const dataParams = {
    title,
    content,
    noteId
  }
  if(noteId) {
    const validated = updateSchema.safeParse(dataParams)
    if(!validated.success) {
      return {
        errors: validated.error.issues?.[0]?.message || '表单校验失败',
      }
    }
    try {
      await updateNote(noteId, JSON.stringify({title, content}))
      return {
        message: 'update success.'
      }
    } catch(e) {
      return {
        message: 'save failed.'
      }
    }
  } else {
    let noteId = null
    const validated = saveSchema.safeParse(dataParams)
    if(!validated.success) {
      return {
        errors: validated.error.issues?.[0]?.message || '表单校验失败',
      }
    }
    try {
      noteId = await addNote(JSON.stringify({title, content}))
    } catch(e) {
      return {
        message: 'save failed.'
      }
    }
    redirect(`/note/${noteId}`)
  }
}

export async function layoutDeleteNote(noteId) {
  const res = await delNote(noteId)
  revalidatePath('/', 'layout')
  return {
    message: 'delete success.'
  }
}
export async function deleteNote(noteId) {
  const res = await delNote(noteId)
  redirect('/note')
  return res
}
