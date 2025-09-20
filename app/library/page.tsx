"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Grid,
  List,
  Download,
  Share,
  Trash2,
  Eye,
  FileText,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Tag,
} from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  category: string
  uploadDate: Date
  lastModified: Date
  size: number
  status: "original" | "simplified" | "processing"
  riskLevel: "low" | "medium" | "high"
  tags: string[]
  complexity: number
  shared: boolean
}

const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Employment Contract - Tech Corp",
    type: "PDF",
    category: "employment",
    uploadDate: new Date("2024-01-15"),
    lastModified: new Date("2024-01-16"),
    size: 2400000,
    status: "simplified",
    riskLevel: "low",
    tags: ["contract", "employment", "tech"],
    complexity: 3,
    shared: false,
  },
  {
    id: "2",
    name: "NDA - Marketing Agency",
    type: "PDF",
    category: "nda",
    uploadDate: new Date("2024-01-14"),
    lastModified: new Date("2024-01-14"),
    size: 1800000,
    status: "processing",
    riskLevel: "medium",
    tags: ["nda", "confidentiality"],
    complexity: 5,
    shared: true,
  },
  {
    id: "3",
    name: "Office Lease Agreement",
    type: "PDF",
    category: "lease",
    uploadDate: new Date("2024-01-10"),
    lastModified: new Date("2024-01-12"),
    size: 3200000,
    status: "simplified",
    riskLevel: "high",
    tags: ["lease", "real-estate", "commercial"],
    complexity: 8,
    shared: false,
  },
  {
    id: "4",
    name: "Service Agreement - Consulting",
    type: "PDF",
    category: "contract",
    uploadDate: new Date("2024-01-08"),
    lastModified: new Date("2024-01-09"),
    size: 1600000,
    status: "simplified",
    riskLevel: "low",
    tags: ["service", "consulting"],
    complexity: 4,
    shared: true,
  },
  {
    id: "5",
    name: "Privacy Policy - Website",
    type: "PDF",
    category: "privacy",
    uploadDate: new Date("2024-01-05"),
    lastModified: new Date("2024-01-05"),
    size: 800000,
    status: "original",
    riskLevel: "medium",
    tags: ["privacy", "policy", "website"],
    complexity: 6,
    shared: false,
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "employment", label: "Employment" },
  { value: "nda", label: "NDA" },
  { value: "lease", label: "Lease" },
  { value: "contract", label: "Contract" },
  { value: "privacy", label: "Privacy Policy" },
]

export default function LibraryPage() {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("lastModified")

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus
    const matchesRisk = selectedRisk === "all" || doc.riskLevel === selectedRisk

    return matchesSearch && matchesCategory && matchesStatus && matchesRisk
  })

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "uploadDate":
        return b.uploadDate.getTime() - a.uploadDate.getTime()
      case "lastModified":
        return b.lastModified.getTime() - a.lastModified.getTime()
      case "size":
        return b.size - a.size
      default:
        return 0
    }
  })

  const toggleDocSelection = (docId: string) => {
    setSelectedDocs((prev) => (prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]))
  }

  const selectAllDocs = () => {
    setSelectedDocs(sortedDocuments.map((doc) => doc.id))
  }

  const clearSelection = () => {
    setSelectedDocs([])
  }

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "original":
        return <FileText className="h-4 w-4 text-gray-500" />
      case "simplified":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getRiskColor = (risk: Document["riskLevel"]) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Library</h1>
          <p className="text-muted-foreground">Manage and search your legal documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="original">Original</SelectItem>
                  <SelectItem value="simplified">Simplified</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastModified">Last Modified</SelectItem>
                  <SelectItem value="uploadDate">Upload Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">File Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedDocs.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {selectedDocs.length} document{selectedDocs.length !== 1 ? "s" : ""} selected
                </span>
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear Selection
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {sortedDocuments.length} document{sortedDocuments.length !== 1 ? "s" : ""} found
          </p>
          {sortedDocuments.length > 0 && (
            <Button variant="outline" size="sm" onClick={selectAllDocs}>
              Select All
            </Button>
          )}
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedDocs.includes(doc.id)}
                        onCheckedChange={() => toggleDocSelection(doc.id)}
                      />
                      {getStatusIcon(doc.status)}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base line-clamp-2">{doc.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{formatFileSize(doc.size)}</span>
                    <Badge className={getRiskColor(doc.riskLevel)}>{doc.riskLevel} risk</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {doc.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Modified {doc.lastModified.toLocaleDateString()}</span>
                    {doc.shared && <span className="text-blue-600">Shared</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {sortedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-accent/50">
                    <Checkbox
                      checked={selectedDocs.includes(doc.id)}
                      onCheckedChange={() => toggleDocSelection(doc.id)}
                    />
                    {getStatusIcon(doc.status)}

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{doc.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>Modified {doc.lastModified.toLocaleDateString()}</span>
                        <div className="flex gap-1">
                          {doc.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {doc.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{doc.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Badge className={getRiskColor(doc.riskLevel)}>{doc.riskLevel}</Badge>

                    {doc.shared && (
                      <Badge variant="outline" className="text-blue-600">
                        Shared
                      </Badge>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
