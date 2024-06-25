import EditButton from "@/components/Note/EditButton"

export default function Layout({params, children}) {
  const noteId = params.id
  return <div className="px-8 py-6 bg-cyan-950 h-full flex">
    <div className="flex-1">
      {
        children
      }
    </div>
    <div className="flex-grow-0">
      <EditButton noteId={noteId}>edit</EditButton>
    </div>
  </div>
}