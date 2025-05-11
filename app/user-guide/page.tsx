import { UserGuide } from "@/components/user-guide/user-guide"
import { UserGuideHeader } from "@/components/user-guide/user-guide-header"

export default function UserGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserGuideHeader />
      <div className="flex-1 container py-6 md:py-10">
        <UserGuide />
      </div>
    </div>
  )
}
