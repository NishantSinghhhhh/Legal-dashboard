"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Share, Users, MessageSquare, Clock, Eye, Edit, UserPlus, Settings } from "lucide-react"

const sharedDocuments = [
  {
    id: "1",
    name: "Employment Contract - Tech Corp",
    sharedWith: ["Sarah Johnson", "Mike Chen"],
    lastActivity: new Date(Date.now() - 3600000),
    permissions: "edit",
    comments: 3,
    status: "active",
  },
  {
    id: "2",
    name: "NDA - Marketing Agency",
    sharedWith: ["Legal Team"],
    lastActivity: new Date(Date.now() - 7200000),
    permissions: "view",
    comments: 1,
    status: "active",
  },
]

const teamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@techcorp.com",
    role: "Legal Counsel",
    status: "active",
    lastSeen: new Date(Date.now() - 1800000),
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@techcorp.com",
    role: "Contract Manager",
    status: "active",
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    name: "Legal Team",
    email: "legal@techcorp.com",
    role: "Team",
    status: "active",
    lastSeen: new Date(Date.now() - 900000),
  },
]

export default function CollaboratePage() {
  const [selectedDocument, setSelectedDocument] = useState("")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Collaboration</h1>
          <p className="text-muted-foreground">Share documents and work together with your team</p>
        </div>
        <Button>
          <Share className="h-4 w-4 mr-2" />
          Share Document
        </Button>
      </div>

      <Tabs defaultValue="shared" className="space-y-6">
        <TabsList>
          <TabsTrigger value="shared">Shared Documents</TabsTrigger>
          <TabsTrigger value="team">Team Workspace</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="shared">
          <div className="space-y-4">
            {sharedDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{doc.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Shared with {doc.sharedWith.join(", ")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {doc.lastActivity.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {doc.comments} comments
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.permissions === "edit" ? "default" : "secondary"}>
                        {doc.permissions === "edit" ? (
                          <Edit className="h-3 w-3 mr-1" />
                        ) : (
                          <Eye className="h-3 w-3 mr-1" />
                        )}
                        {doc.permissions}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Team Members
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last seen {member.lastSeen.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Sarah Johnson</span> commented on
                        <span className="font-medium"> Employment Contract</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Mike Chen</span> shared
                        <span className="font-medium"> NDA - Marketing Agency</span>
                      </p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Permission Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Document</label>
                  <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract1">Employment Contract - Tech Corp</SelectItem>
                      <SelectItem value="nda1">NDA - Marketing Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Current Permissions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Sarah Johnson</span>
                      </div>
                      <Select defaultValue="edit">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View</SelectItem>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Mike Chen</span>
                      </div>
                      <Select defaultValue="view">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View</SelectItem>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Add New User</h4>
                  <div className="flex gap-2">
                    <Input placeholder="Enter email address" />
                    <Select defaultValue="view">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Add</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
