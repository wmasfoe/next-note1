export default function SubmitButton({className, children, loading,}) {

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
  `} disabled={loading} type='submit'>
    { children }
  </button>
}