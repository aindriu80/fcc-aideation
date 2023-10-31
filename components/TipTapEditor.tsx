'use client'
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from '@/src/components/ui/button'

type Props = {}

const TipTapEditor = (props: Props) => {
  const [editorState, setEditorState] = React.useState('')
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML())
    },
  })
  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button>Saved</Button>
      </div>
      :w
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default TipTapEditor
