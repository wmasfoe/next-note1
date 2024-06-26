import LayoutSlideBar from "@/components/Note/SlideBar/LayoutSlideBar"

export default function Layout({children, params}) {
  return <div className="flex h-screen w-full">
    <LayoutSlideBar params={params} />
    {/* content */}
    <div className="flex-1">
      {
        children
      }
    </div>
  </div>
}