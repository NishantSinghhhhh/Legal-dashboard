"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Play, Book, MessageCircle, Mail, Phone, ExternalLink, ChevronRight } from "lucide-react"

const tutorials = [
  {
    id: "1",
    title: "Getting Started with LegalSimplify",
    description: "Learn the basics of uploading and processing your first legal document",
    duration: "5 min",
    thumbnail: "/tutorial-video-thumbnail.png",
    category: "Basics",
  },
  {
    id: "2",
    title: "Understanding Risk Assessment",
    description: "How our AI analyzes and scores the risk levels in your contracts",
    duration: "8 min",
    thumbnail: "/risk-assessment-tutorial.jpg",
    category: "AI Features",
  },
  {
    id: "3",
    title: "Document Library Management",
    description: "Organize, search, and manage your legal document collection",
    duration: "6 min",
    thumbnail: "/document-management-tutorial.jpg",
    category: "Organization",
  },
  {
    id: "4",
    title: "Collaboration Features",
    description: "Share documents and collaborate with your team members",
    duration: "7 min",
    thumbnail: "/collaboration-tutorial.png",
    category: "Teamwork",
  },
]

const faqs = [
  {
    question: "How accurate is the AI simplification?",
    answer:
      "Our AI has been trained on millions of legal documents and maintains 95%+ accuracy in simplification while preserving all critical legal meaning. Every simplified document is reviewed by our legal experts.",
  },
  {
    question: "Is my data secure and confidential?",
    answer:
      "Yes, absolutely. All documents are encrypted in transit and at rest using AES-256 encryption. We are SOC 2 Type II certified and comply with GDPR, CCPA, and other privacy regulations. Your data is never shared with third parties.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support PDF, DOC, DOCX, RTF, and TXT files. Each file can be up to 50MB in size. For larger files or other formats, please contact our support team.",
  },
  {
    question: "How long does document processing take?",
    answer:
      "Most documents are processed within 2-5 minutes depending on length and complexity. You'll receive real-time updates on processing status and be notified when complete.",
  },
  {
    question: "Can I customize the simplification level?",
    answer:
      "Yes! You can adjust the simplification level from 1 (minimal changes) to 10 (maximum simplification) in your settings. You can also set different levels for different document types.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "If you approach your monthly document limit, we'll notify you in advance. You can upgrade your plan anytime or purchase additional document credits as needed.",
  },
  {
    question: "Do you offer API access?",
    answer:
      "Yes, we provide REST API access for Enterprise customers. This allows you to integrate LegalSimplify directly into your existing workflows and systems.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your billing settings. You'll continue to have access until the end of your current billing period.",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tutorial.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to your questions, learn how to use LegalSimplify effectively, and get the support you need.
        </p>

        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="tutorials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials">
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>
              <Button
                variant={selectedCategory === "Basics" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Basics")}
              >
                Basics
              </Button>
              <Button
                variant={selectedCategory === "AI Features" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("AI Features")}
              >
                AI Features
              </Button>
              <Button
                variant={selectedCategory === "Organization" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Organization")}
              >
                Organization
              </Button>
              <Button
                variant={selectedCategory === "Teamwork" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Teamwork")}
              >
                Teamwork
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={tutorial.thumbnail || "/placeholder.svg"}
                      alt={tutorial.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="h-5 w-5 text-gray-800 ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">{tutorial.duration}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {tutorial.category}
                      </Badge>
                      <h3 className="font-medium text-foreground">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Book className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">User Manual</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive guide covering all features and functionality
                    </p>
                    <Button variant="outline" size="sm">
                      Download PDF
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <ChevronRight className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">Quick Start Guide</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get up and running with LegalSimplify in under 10 minutes
                    </p>
                    <Button variant="outline" size="sm">
                      View Guide
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">API Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Technical documentation for developers and integrations
                    </p>
                    <Button variant="outline" size="sm">
                      View Docs
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Book className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">Best Practices</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tips and strategies for getting the most out of the platform
                    </p>
                    <Button variant="outline" size="sm">
                      Read More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@legalsimplify.com</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                    <Button size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit a Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>Account Help</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full p-2 border border-border rounded-md h-24 resize-none"
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>
                <Button className="w-full">Submit Ticket</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
