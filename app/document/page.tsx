"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Download, Share, Bookmark, MessageSquare, Calendar, FileText, Lightbulb } from "lucide-react"

interface GlossaryTerm {
  term: string
  definition: string
  context: string
}

interface Annotation {
  id: string
  text: string
  position: number
  note: string
  author: string
  timestamp: Date
}

interface ActionItem {
  id: string
  title: string
  description: string
  deadline: Date
  priority: "high" | "medium" | "low"
  completed: boolean
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Force Majeure",
    definition: "Unforeseeable circumstances that prevent a party from fulfilling a contract",
    context: "Acts of God, natural disasters, war, or other extraordinary events",
  },
  {
    term: "Indemnification",
    definition: "Protection against legal liability for damages or losses",
    context: "One party agrees to compensate the other for certain damages",
  },
  {
    term: "Liquidated Damages",
    definition: "Pre-agreed amount of compensation for breach of contract",
    context: "Specified monetary penalty for contract violations",
  },
]

const actionItems: ActionItem[] = [
  {
    id: "1",
    title: "Review Insurance Requirements",
    description: "Verify that current insurance coverage meets the minimum requirements specified in Section 8.2",
    deadline: new Date("2024-02-15"),
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Submit Compliance Certificate",
    description: "Provide annual compliance certification as required by Section 12.1",
    deadline: new Date("2024-03-01"),
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Schedule Performance Review",
    description: "Quarterly performance review meeting with stakeholders",
    deadline: new Date("2024-02-28"),
    priority: "low",
    completed: true,
  },
]

const sampleOriginalText = `
EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on January 15, 2024, between Tech Corp, a Delaware corporation ("Company"), and John Doe ("Employee").

1. EMPLOYMENT TERMS
The Company hereby employs the Employee, and the Employee accepts employment with the Company, subject to the terms and conditions set forth herein. The Employee's employment shall commence on February 1, 2024.

2. POSITION AND DUTIES
The Employee shall serve as Senior Software Engineer and shall perform such duties as are customarily associated with such position, including but not limited to software development, code review, and technical documentation. The Employee shall report to the Chief Technology Officer.

3. COMPENSATION
The Company shall pay the Employee an annual base salary of One Hundred Twenty Thousand Dollars ($120,000), payable in accordance with the Company's standard payroll practices. The Employee shall be eligible for performance-based bonuses at the discretion of the Company.

4. CONFIDENTIALITY
The Employee acknowledges that during the course of employment, the Employee may have access to confidential and proprietary information of the Company. The Employee agrees to maintain the confidentiality of such information and not to disclose it to any third party without prior written consent of the Company.

5. TERMINATION
This Agreement may be terminated by either party with thirty (30) days written notice. Upon termination, the Employee shall return all Company property and confidential information.
`

const sampleSimplifiedText = `
EMPLOYMENT AGREEMENT - SIMPLIFIED VERSION

This is a job contract between Tech Corp (the company) and John Doe (the employee), starting January 15, 2024.

1. JOB DETAILS
• You're hired as a Senior Software Engineer starting February 1, 2024
• You'll write code, review other people's code, and create technical documents
• You'll report to the Chief Technology Officer

2. PAY AND BENEFITS
• Base salary: $120,000 per year
• Paid according to company's regular schedule
• You may get performance bonuses (company decides)

3. KEEPING SECRETS
• You'll see confidential company information
• You must keep this information secret
• Don't share it with anyone outside the company without written permission

4. ENDING THE JOB
• Either you or the company can end this job with 30 days notice
• When you leave, return all company property and confidential information

KEY RISKS TO WATCH:
🔴 HIGH RISK: No specific severance pay mentioned
🟡 MEDIUM RISK: Bonus eligibility is at company's discretion
🟢 LOW RISK: Standard 30-day notice period
`

export default function DocumentViewerPage() {
  const [activeView, setActiveView] = useState<"original" | "simplified" | "comparison">("comparison")
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [newAnnotation, setNewAnnotation] = useState("")
  const [bookmarked, setBookmarked] = useState(false)

  const addAnnotation = () => {
    if (newAnnotation.trim()) {
      const annotation: Annotation = {
        id: Date.now().toString(),
        text: "Selected text",
        position: Math.random(),
        note: newAnnotation,
        author: "John Doe",
        timestamp: new Date(),
      }
      setAnnotations([...annotations, annotation])
      setNewAnnotation("")
    }
  }

  const getPriorityColor = (priority: ActionItem["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Employment Contract - Tech Corp</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>PDF • 2.4 MB</span>
                <span>Last modified: Jan 16, 2024</span>
                <Badge className="bg-red-100 text-red-800">High Risk</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={bookmarked ? "default" : "outline"} size="sm" onClick={() => setBookmarked(!bookmarked)}>
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* View Toggle */}
          <div className="border-b border-border p-4">
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
              <TabsList>
                <TabsTrigger value="original">Original</TabsTrigger>
                <TabsTrigger value="simplified">Simplified</TabsTrigger>
                <TabsTrigger value="comparison">Side by Side</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-hidden">
            {activeView === "comparison" ? (
              <div className="h-full flex">
                <div className="flex-1 border-r border-border">
                  <div className="p-4 border-b border-border bg-muted/30">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Original Document
                    </h3>
                  </div>
                  <ScrollArea className="h-full p-6">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{sampleOriginalText}</pre>
                    </div>
                  </ScrollArea>
                </div>

                <div className="flex-1">
                  <div className="p-4 border-b border-border bg-green-50">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      AI Simplified Version
                    </h3>
                  </div>
                  <ScrollArea className="h-full p-6">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {sampleSimplifiedText}
                      </pre>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-full p-6">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {activeView === "original" ? sampleOriginalText : sampleSimplifiedText}
                  </pre>
                </div>
              </ScrollArea>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border flex flex-col">
          <Tabs defaultValue="glossary" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-4">
              <TabsTrigger value="glossary">Glossary</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="glossary" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <div className="space-y-4">
                  {glossaryTerms.map((term, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-foreground mb-2">{term.term}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{term.definition}</p>
                        <p className="text-xs text-muted-foreground italic">{term.context}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="actions" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <div className="space-y-4">
                  {actionItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                          <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {item.deadline.toLocaleDateString()}
                          </div>
                          {item.completed ? (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="notes" className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border">
                <Textarea
                  placeholder="Add your annotation..."
                  value={newAnnotation}
                  onChange={(e) => setNewAnnotation(e.target.value)}
                  className="mb-2"
                />
                <Button size="sm" onClick={addAnnotation} disabled={!newAnnotation.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>

              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 py-4">
                  {annotations.map((annotation) => (
                    <Card key={annotation.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs text-muted-foreground">{annotation.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {annotation.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground font-medium mb-1">"{annotation.text}"</p>
                        <p className="text-sm text-muted-foreground">{annotation.note}</p>
                      </CardContent>
                    </Card>
                  ))}

                  {annotations.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No annotations yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
