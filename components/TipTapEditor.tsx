'use client'
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from '@/src/components/ui/button'
import { useDebounce } from '@/src/lib/useDebounce'

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
  const debouncedEditorState = useDebounce(editorState, 500)
  React.useEffect(() => {
    console.log(debouncedEditorState)
  }, [editorState])
  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button>Saved</Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}

export default TipTapEditor
