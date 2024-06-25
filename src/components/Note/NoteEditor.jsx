'use client'
import { useState, useRef, useEffect } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import SubmitButton from './SubmitButton'
import ActionButton from './ActionButton'
import { saveNote, deleteNote } from '@noteAction'
import useKeyboardSave from './useKeyboardSave'

export default function NoteEditor({
  note,
  initTitle,
  initBody,
}) {

  const [title, setTitle] = useState(initTitle)
  const [body, setBody] = useState(initBody)

  const isNew = note === null
  const btnText = isNew ? 'cancel' : 'delete'

  const formRef = useRef(null)
  useKeyboardSave(() => {
    formRef.current?.requestSubmit()
  })

  const handleClick = () => {
    if(isNew) {
      setTitle('')
      setBody('')
    } else {
      deleteNote(note)
    }
  }

  const [saveActionState, saveFormAction] = useFormState(saveNote, {
    message: null,
    errors: null,
  })

  useEffect(() => {
    if(saveActionState.errors) {
      console.error(saveActionState.errors)
    }
  }, [saveActionState])

  return <>
    <form className='flex flex-row h-full items-start gap-2' ref={formRef} action={saveFormAction}>
      <div className='flex flex-1 flex-col h-full'>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          name="title"
          className='focus:outline-dotted focus:outline-teal-900 px-3 py-2 focus:outline-2 outline-0 rounded-b-none rounded-md text-2xl font-bold w-full text-teal-400 bg-slate-800'
        ></input>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          name="content"
          className='focus:outline-dotted focus:outline-teal-900 px-3 py-2 focus:outline-2 outline-0 rounded-l-none rounded-md text-lg w-full flex-1 text-cyan-500 bg-slate-800 mt-0.5'
        ></textarea>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-row gap-1'>
          <SubmitBtn />
          <EditButton onClick={handleClick} text={btnText} />
        </div>
        {
          saveActionState.errors ? <div className="text-red-400">{saveActionState.errors}</div> : <></>
        }
        {
          saveActionState.message ? <div>{saveActionState.message}</div> : <></>
        }
      </div>
    </form>
  </>
}

function SubmitBtn() {
  const { pending } = useFormStatus()
  return <SubmitButton disable={pending}>{pending ? 'saving' : 'done'}</SubmitButton>
}
function EditButton({onClick, text}) {
  const { pending } = useFormStatus()
  const btnText = pending ? `${text} ing` : text
  return <ActionButton disable={pending} onClick={onClick}>{ btnText }</ActionButton>
}