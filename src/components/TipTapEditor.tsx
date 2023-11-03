'use client'
import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from '@/src/components/ui/button'
import { useDebounce } from '@/src/lib/useDebounce'
import { useMutation } from '@tanstack/react-query'
import Text from '@tiptap/extension-text'
import axios from 'axios'
import { NoteType } from '@/src/lib/db/schema'

type Props = { note: NoteType }

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}>/h1>}`
  )
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/saveNote', {
        noteId: note.id,
        editorState,
      })
      return response.data
    },
  })
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        'Shift-a': () => {
          console.log('activate AI')
          return true
        },
      }
    },
  })
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML())
    },
  })
  const debouncedEditorState = useDebounce(editorState, 500)
  React.useEffect(() => {
    // save to db
    if (debouncedEditorState === '') return
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log('success, updated!', data)
      },
      onError: (err) => {
        console.error(err)
      },
    })
  }, [debouncedEditorState])
  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={'outline'}>
          {saveNote.isPending ? 'Saving...' : 'Saved'}
        </Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default TipTapEditor
