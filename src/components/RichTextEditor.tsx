import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Strike from '@tiptap/extension-strike';
import { Icon } from '@iconify/react';

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Strike,
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: 'Description...'
      }),
      CharacterCount.configure({
        limit: 300
      })
    ],
    content: '',
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg px-2 bg-white w-full">
        
        {editor.getHTML().trim() !== '' && (
        <h1 className="flex gap-x-1 items-center text-sm text-gray-400 relative top-6 left-2">
          <Icon icon="icon-park-outline:list" width="18" height="18" /> Description
        </h1>
      )}
            
      <EditorContent editor={editor} className="px-2 rounded min-h-[70px]" />

      <div className='flex justify-between'>
            
        <div className="flex gap-2 mb-2">
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 px-1 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
            >
            <b>B</b>
            </button>
            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-1 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
            >
            <i>I</i>
            </button>
            <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-1 pr-2 border-r-2 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}
            >
            <Icon icon="icon-park-outline:strikethrough" width="16" height="16" />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={` px-1 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
            >
            <Icon icon="ph:list-numbers" width="18" height="18" />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-1 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
            >
            <Icon icon="ph:list-bullets-bold" width="16" height="16" />
            </button>
        </div>
        <div className="text-right text-xs text-gray-500 mt-4">
            {editor.storage.characterCount.characters()}/300 Characters
        </div>
    
    </div>
    </div>
  );
}
