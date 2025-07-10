"use client";
import React, { useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { v4 as uuidv4 } from "uuid";
import blogService from "@/services/blogService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateBlogForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null); // Thumbnail
  const [attachments, setAttachments] = useState<{ id: string; file: File }[]>(
    []
  ); // Inline images/files
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  // Tiptap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      // Get all image nodes and their alt attributes (which are your IDs)
      const json = editor.getJSON();
      const imageIds: string[] = [];

      function findImages(node: any) {
        if (node.type === "image" && node.attrs?.alt) {
          imageIds.push(node.attrs.alt);
        }
        if (node.content) {
          node.content.forEach(findImages);
        }
      }
      findImages(json);

      // Remove attachments whose IDs are no longer present in the editor
      setAttachments((prev) => prev.filter((att) => imageIds.includes(att.id)));
    },
  });

  // Handle thumbnail upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle inline image upload in editor
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const id = uuidv4();
      setAttachments((prev) => [...prev, { id, file }]);
      const reader = new FileReader();
      reader.onload = () => {
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result as string, alt: id })
          .run();
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input for inline image
  const addImageToEditor = () => {
    fileInputRef.current?.click();
  };

  // Example submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!editor?.getHTML()) {
      toast.error("Please enter some content");
      return;
    }

    await blogService.createBlog(
      title,
      editor?.getHTML() as string,
      image as File,
      attachments.map((att) => att.file)
    );

    setTimeout(() => {
      toast.success("Blog created successfully");
      router.push("/admin/blogs");
    }, 500);
  };

  // Toolbar button helper
  const Button = ({ onClick, active, children, title }: any) => (
    <button
      type="button"
      className={`px-2 py-1 rounded mx-1 ${
        active ? "bg-blue-500 text-black" : "bg-gray-100 text-black"
      } hover:bg-blue-100`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8 space-y-8 overflow-y-scroll h-[90vh] text-black"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Create Blog</h1>

      <div>
        <label className="block font-semibold mb-2">Blog Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {image && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(image)}
              alt="Thumbnail preview"
              className="h-24 rounded shadow"
            />
            <div className="text-xs mt-1 text-black">{image.name} selected</div>
          </div>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-2">Content</label>
        <div className="border rounded-lg bg-gray-50 p-2">
          {/* Toolbar */}
          <div className="mb-2 flex flex-wrap items-center bg-white border border-gray-200 rounded-t-lg px-2 py-1">
            <Button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              active={editor?.isActive("bold")}
              title="Bold"
            >
              <b>B</b>
            </Button>
            <Button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              active={editor?.isActive("italic")}
              title="Italic"
            >
              <i>I</i>
            </Button>
            <Button
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              active={editor?.isActive("underline")}
              title="Underline"
            >
              <u>U</u>
            </Button>
            <Button
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              active={editor?.isActive("strike")}
              title="Strike"
            >
              S
            </Button>
            <Button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor?.isActive("heading", { level: 1 })}
              title="H1"
            >
              H1
            </Button>
            <Button
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor?.isActive("heading", { level: 2 })}
              title="H2"
            >
              H2
            </Button>
            <Button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              active={editor?.isActive("bulletList")}
              title="Bullet List"
            >
              • List
            </Button>
            <Button
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              active={editor?.isActive("orderedList")}
              title="Numbered List"
            >
              1. List
            </Button>
            <Button
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
              active={editor?.isActive({ textAlign: "left" })}
              title="Align Left"
            >
              ⯇
            </Button>
            <Button
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
              active={editor?.isActive({ textAlign: "center" })}
              title="Align Center"
            >
              ≡
            </Button>
            <Button
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
              active={editor?.isActive({ textAlign: "right" })}
              title="Align Right"
            >
              ⯈
            </Button>
            <Button onClick={addImageToEditor} title="Add Image">
              🖼️
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
          <EditorContent
            editor={editor}
            className="min-h-[200px] bg-white rounded-b-lg px-2 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold py-3 rounded-lg shadow transition"
      >
        Save
      </button>
    </form>
  );
}
