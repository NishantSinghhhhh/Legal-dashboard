"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, CheckCircle, AlertCircle, Clock, Cloud, Folder, HardDrive } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  category: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  uploadedAt: Date
}

const documentCategories = [
  { value: "contract", label: "Contract" },
  { value: "nda", label: "Non-Disclosure Agreement" },
  { value: "lease", label: "Lease Agreement" },
  { value: "employment", label: "Employment Document" },
  { value: "terms", label: "Terms of Service" },
  { value: "privacy", label: "Privacy Policy" },
  { value: "other", label: "Other Legal Document" },
]

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "Employment_Contract_TechCorp.pdf",
      size: 2400000,
      type: "application/pdf",
      category: "employment",
      status: "completed",
      progress: 100,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      name: "NDA_Marketing_Agency.pdf",
      size: 1800000,
      type: "application/pdf",
      category: "nda",
      status: "processing",
      progress: 68,
      uploadedAt: new Date(Date.now() - 1800000),
    },
  ])
  const [dragActive, setDragActive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file, index) => ({
      id: Date.now().toString() + index,
      name: file.name,
      size: file.size,
      type: file.type,
      category: selectedCategory || "other",
      status: "uploading",
      progress: 0,
      uploadedAt: new Date(),
    }))

    setFiles((prev:any) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev:any) =>
        prev.map((file:any) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 15, 100)
            const newStatus = newProgress === 100 ? "processing" : "uploading"

            if (newProgress === 100) {
              setTimeout(() => {
                setFiles((prev:any) => prev.map((f:any) => (f.id === fileId ? { ...f, status: "completed" } : f)))
              }, 2000)
            }

            return { ...file, progress: newProgress, status: newStatus }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 8000)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev:any) => prev.filter((file:any) => file.id !== fileId))
  }

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "processing":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
        return "bg-blue-500"
      case "processing":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Document Upload</h1>
        <p className="text-muted-foreground">Upload and process your legal documents with AI-powered simplification.</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Category Selection */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-foreground">Document Category:</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Drag and Drop Area */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                dragActive ? "border-primary bg-primary/5" : "border-border",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Drag and drop your legal documents here</h3>
              <p className="text-muted-foreground mb-4">Supports PDF, DOC, DOCX files up to 10MB each</p>
              <Button onClick={() => document.getElementById("file-input")?.click()}>Choose Files</Button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
            </div>

            {/* Cloud Storage Integration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Cloud className="h-4 w-4" />
                Google Drive
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Folder className="h-4 w-4" />
                Dropbox
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <HardDrive className="h-4 w-4" />
                OneDrive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file:any) => (
                <div key={file.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <FileText className="h-8 w-8 text-muted-foreground" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      {getStatusIcon(file.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <Badge variant="secondary">
                        {documentCategories.find((cat) => cat.value === file.category)?.label}
                      </Badge>
                      <span className="capitalize">{file.status}</span>
                    </div>

                    {file.status !== "completed" && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">
                            {file.status === "uploading" ? "Uploading..." : "Processing..."}
                          </span>
                          <span className="text-xs text-muted-foreground">{Math.round(file.progress)}%</span>
                        </div>
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
