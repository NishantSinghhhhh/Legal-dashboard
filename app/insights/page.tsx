"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  TrendingUp,
  Calendar,
  Clock,
  FileText,
  Shield,
  DollarSign,
  Users,
  Brain,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const riskDistribution = [
  { name: "Low Risk", value: 45, color: "#10b981" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 20, color: "#ef4444" },
]

const riskTrends = [
  { month: "Jan", low: 40, medium: 35, high: 25 },
  { month: "Feb", low: 42, medium: 33, high: 25 },
  { month: "Mar", low: 45, medium: 32, high: 23 },
  { month: "Apr", low: 43, medium: 35, high: 22 },
  { month: "May", low: 45, medium: 35, high: 20 },
  { month: "Jun", low: 45, medium: 35, high: 20 },
]

const complianceData = [
  { category: "Employment Law", score: 95, trend: "up" },
  { category: "Contract Terms", score: 88, trend: "up" },
  { category: "Data Privacy", score: 92, trend: "stable" },
  { category: "Intellectual Property", score: 85, trend: "down" },
  { category: "Financial Regulations", score: 90, trend: "up" },
]

const obligations = [
  {
    id: "1",
    title: "Insurance Coverage Verification",
    description: "Maintain minimum $2M liability insurance as per Section 8.2",
    document: "Office Lease Agreement",
    deadline: new Date("2024-02-15"),
    status: "pending",
    priority: "high",
    responsible: "Legal Team",
  },
  {
    id: "2",
    title: "Annual Compliance Report",
    description: "Submit yearly compliance certification to regulatory body",
    document: "Service Agreement",
    deadline: new Date("2024-03-01"),
    status: "in-progress",
    priority: "medium",
    responsible: "Compliance Officer",
  },
  {
    id: "3",
    title: "Data Retention Policy Update",
    description: "Review and update data retention policies per GDPR requirements",
    document: "Privacy Policy",
    deadline: new Date("2024-02-28"),
    status: "completed",
    priority: "high",
    responsible: "Data Protection Officer",
  },
  {
    id: "4",
    title: "Contract Renewal Notice",
    description: "Provide 90-day notice for contract renewal or termination",
    document: "Vendor Agreement",
    deadline: new Date("2024-04-15"),
    status: "pending",
    priority: "low",
    responsible: "Procurement Team",
  },
]

const warningAlerts = [
  {
    id: "1",
    type: "deadline",
    severity: "high",
    title: "Contract Expiration Warning",
    description: "Office lease expires in 45 days. Renewal negotiations should begin immediately.",
    document: "Office Lease Agreement",
    daysUntil: 45,
    action: "Schedule renewal meeting",
  },
  {
    id: "2",
    type: "compliance",
    severity: "medium",
    title: "Compliance Gap Detected",
    description: "Employment contracts missing updated equal opportunity clauses.",
    document: "Employment Contracts",
    affected: 12,
    action: "Update contract templates",
  },
  {
    id: "3",
    type: "risk",
    severity: "high",
    title: "High Risk Clause Identified",
    description: "Unlimited liability clause detected in vendor agreement.",
    document: "Vendor Service Agreement",
    riskScore: 8.5,
    action: "Negotiate liability cap",
  },
]

const clauseBreakdown = [
  { category: "Payment Terms", count: 15, avgRisk: 3.2, issues: 2 },
  { category: "Termination", count: 12, avgRisk: 6.8, issues: 5 },
  { category: "Liability", count: 8, avgRisk: 7.5, issues: 3 },
  { category: "Confidentiality", count: 18, avgRisk: 4.1, issues: 1 },
  { category: "Intellectual Property", count: 6, avgRisk: 5.9, issues: 2 },
  { category: "Force Majeure", count: 10, avgRisk: 2.8, issues: 0 },
]

export default function InsightsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedDocument, setSelectedDocument] = useState("all")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Insights & Analysis</h1>
          <p className="text-muted-foreground">Comprehensive risk assessment and legal intelligence</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Warning Alerts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            Critical Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {warningAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-red-200">
                <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{alert.title}</h4>
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity} priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{alert.document}</span>
                    <Button size="sm" variant="outline">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Assessment */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Risk Assessment Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="distribution">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              <TabsContent value="distribution" className="mt-6">
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {riskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trends" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={riskTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="low" stackId="1" stroke="#10b981" fill="#10b981" />
                    <Area type="monotone" dataKey="medium" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="high" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="compliance" className="mt-6">
                <div className="space-y-4">
                  {complianceData.map((item) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.score}%</span>
                            <TrendingUp
                              className={`h-4 w-4 ${
                                item.trend === "up"
                                  ? "text-green-500"
                                  : item.trend === "down"
                                    ? "text-red-500"
                                    : "text-gray-500"
                              }`}
                            />
                          </div>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Total Documents</span>
                </div>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                </div>
                <span className="font-semibold">4.2/10</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">Potential Savings</span>
                </div>
                <span className="font-semibold">$24,500</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-muted-foreground">Active Obligations</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">Contract Standardization</p>
                  <p className="text-xs text-blue-600 mt-1">Standardize payment terms across 8 contracts</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">Risk Mitigation</p>
                  <p className="text-xs text-yellow-600 mt-1">Add liability caps to 3 high-risk agreements</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800">Compliance Update</p>
                  <p className="text-xs text-green-600 mt-1">Update privacy clauses for GDPR compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Obligations and Rights */}
      <Card>
        <CardHeader>
          <CardTitle>Obligations & Rights Extraction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {obligations.map((obligation) => (
              <div key={obligation.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                {getStatusIcon(obligation.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{obligation.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          obligation.priority === "high"
                            ? "destructive"
                            : obligation.priority === "medium"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {obligation.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{obligation.responsible}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{obligation.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{obligation.document}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {obligation.deadline.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clause Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Clause Analysis Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clauseBreakdown.map((clause) => (
              <div
                key={clause.category}
                className="flex items-center justify-between p-4 rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{clause.category}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{clause.count} clauses</span>
                      <span>Avg Risk: {clause.avgRisk}/10</span>
                      {clause.issues > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {clause.issues} issues
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={clause.avgRisk * 10} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
