import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, DollarSign, Clock, TrendingUp, Upload, AlertTriangle, CheckCircle, Calendar } from "lucide-react"

const stats = [
  {
    title: "Documents Processed",
    value: "247",
    change: "+12%",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Legal Fees Saved",
    value: "$18,420",
    change: "+23%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Time Saved",
    value: "156 hrs",
    change: "+8%",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    title: "Risk Reduction",
    value: "94%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const recentActivity = [
  {
    id: 1,
    document: "Employment Contract - Tech Corp",
    action: "Simplified",
    time: "2 hours ago",
    status: "completed",
    riskLevel: "low",
  },
  {
    id: 2,
    document: "NDA - Marketing Agency",
    action: "Processing",
    time: "4 hours ago",
    status: "processing",
    riskLevel: "medium",
  },
  {
    id: 3,
    document: "Lease Agreement - Office Space",
    action: "Analyzed",
    time: "1 day ago",
    status: "completed",
    riskLevel: "high",
  },
  {
    id: 4,
    document: "Service Agreement - Consulting",
    action: "Simplified",
    time: "2 days ago",
    status: "completed",
    riskLevel: "low",
  },
]

const aiInsights = [
  {
    title: "Contract Renewal Alert",
    description: "Your office lease expires in 60 days. Consider reviewing terms.",
    priority: "high",
    icon: AlertTriangle,
  },
  {
    title: "Compliance Check",
    description: "All employment contracts are up to date with current regulations.",
    priority: "low",
    icon: CheckCircle,
  },
  {
    title: "Upcoming Deadline",
    description: "NDA review deadline is approaching in 5 days.",
    priority: "medium",
    icon: Calendar,
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your legal document overview.</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Document Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.document}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} • {activity.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        activity.riskLevel === "high"
                          ? "destructive"
                          : activity.riskLevel === "medium"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {activity.riskLevel} risk
                    </Badge>
                    <Badge variant={activity.status === "completed" ? "default" : "secondary"}>{activity.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg border border-border">
                  <insight.icon
                    className={cn(
                      "h-5 w-5 mt-0.5",
                      insight.priority === "high"
                        ? "text-red-500"
                        : insight.priority === "medium"
                          ? "text-yellow-500"
                          : "text-green-500",
                    )}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Upload Widget */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Drag and drop your legal documents</h3>
            <p className="text-muted-foreground mb-4">or click to browse files</p>
            <Button>Choose Files</Button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Processing: Contract_Analysis.pdf</span>
              <span className="text-sm text-muted-foreground">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
