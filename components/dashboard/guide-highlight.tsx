import { BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function GuideHighlight() {
  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-900/20 rounded-full">
            <BookOpen className="h-6 w-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">New to AI Resume Dashboard?</h3>
            <p className="text-gray-400 mb-4">
              Follow our step-by-step guide to make the most of all features and maximize your job search success.
            </p>
            <Button asChild>
              <Link href="/user-guide" className="flex items-center">
                View User Guide
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
