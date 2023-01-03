import { createStyles, Text } from '@mantine/core'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import { useEffect } from 'react'

const useStyles = createStyles((theme) => ({
  input: {
    '.ql-editor': {
      minHeight: 280,
    },
  },
  hasError: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.red,
  },
}))

interface Props {
  error: string | undefined
  content: string
  setContent: (value: string) => void
}

const MyRichText = ({ error, content, setContent }: Props) => {
  const { classes, cx } = useStyles()

  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Link,
      Underline,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
  })

  useEffect(() => {
    const value = editor?.getHTML()
    if (value !== undefined) setContent(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.getHTML()])

  return (
    <div>
      <RichTextEditor
        editor={editor as Editor}
        classNames={{
          root: cx(classes.input, {
            [classes.hasError]: !!error,
          }),
        }}
        styles={{
          root: { overflow: 'hidden', borderRadius: 7 },
          content: {
            '& > div': {
              minHeight: 200,
            },
          },
        }}
      >
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      {error && (
        <Text c='red' fz='sm' mt={3}>
          {error}
        </Text>
      )}
    </div>
  )
}
export default MyRichText
