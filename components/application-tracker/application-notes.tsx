"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StickyNote, Plus, Edit, Trash2, Save } from "lucide-react"
import { format } from "date-fns"
import { addApplicationNote, updateApplicationNote, deleteApplicationNote } from "@/actions/application-actions"

export function ApplicationNotes({ notes, applicationId }) {
  const [newNote, setNewNote] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editedContent, setEditedContent] = useState("")

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsAdding(true)

    try {
      await addApplicationNote(applicationId, newNote)
      setNewNote("")
      // In a real app, we would update the notes list here
    } catch (error) {
      console.error("Error adding note:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleEditNote = (note) => {
    setEditingNoteId(note.id)
    setEditedContent(note.content)
  }

  const handleSaveEdit = async (noteId) => {
    if (!editedContent.trim()) return

    try {
      await updateApplicationNote(applicationId, noteId, editedContent)
      setEditingNoteId(null)
      // In a real app, we would update the note in the list here
    } catch (error) {
      console.error("Error updating note:", error)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteApplicationNote(applicationId, noteId)
        // In a real app, we would remove the note from the list here
      } catch (error) {
        console.error("Error deleting note:", error)
      }
    }
  }

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-blue-500" />
          Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Add a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="bg-[#0a0e17] border-gray-700 min-h-[100px]"
            />
            <Button
              onClick={handleAddNote}
              disabled={isAdding || !newNote.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isAdding ? "Adding..." : "Add Note"}
            </Button>
          </div>

          {notes.length === 0 ? (
            <p className="text-gray-400 text-sm">No notes yet. Add your first note above.</p>
          ) : (
            <div className="space-y-4 mt-6">
              {notes.map((note) => (
                <div key={note.id} className="bg-[#0a0e17] p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-gray-400">
                      {format(new Date(note.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEditNote(note)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {editingNoteId === note.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="bg-[#111827] border-gray-700 min-h-[100px]"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => handleSaveEdit(note.id)} disabled={!editedContent.trim()} size="sm">
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingNoteId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm whitespace-pre-wrap">{note.content}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
