'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function Upload() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  async function handleInputChange(e) {
    const fileInput = e.target

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }

      const data = await response.json();
      startTransition(() => router.push(`/note/${data.uid}`));
      // 刷新客户端缓存
      startTransition(() => router.refresh());

    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  }

  return <>
    <div>
      <label for="file">Import .md File</label>
      <input type="file" id="file" name="file" multiple hidden onChange={handleInputChange} />
    </div>
  </>
}