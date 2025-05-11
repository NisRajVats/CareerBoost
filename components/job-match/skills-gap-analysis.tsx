import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function SkillsGapAnalysis({
  analysis = { topMissingSkills: [], skillsDistribution: { present: [], missing: [] }, recommendations: [] },
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Gap Analysis</CardTitle>
        <CardDescription>Identify skills to improve your job match rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Top Missing Skills</h3>
            <div className="space-y-3">
              {analysis.topMissingSkills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{skill.skill}</span>
                      <Badge
                        variant="outline"
                        className={
                          skill.importance === "high"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : skill.importance === "medium"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {skill.importance}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.frequency} jobs</span>
                  </div>
                  <Progress value={(skill.frequency / 50) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Learning Resources</h3>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-md p-3">
                  <h4 className="font-medium text-sm">{rec.skill}</h4>
                  <ul className="mt-2 space-y-1">
                    {rec.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a
                          href={resource.url}
                          className="text-sm text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
