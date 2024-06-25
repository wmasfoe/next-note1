import LayoutSlideBar from "@/components/Note/SlideBar/LayoutSlideBar"

export default function Layout({children}) {
  return <div className="flex h-screen w-full">
    <LayoutSlideBar />
    {/* content */}
    <div className="flex-1">
      {
        children
      }
    </div>
  </div>
}