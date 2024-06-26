
export default async function Upload() {

  return <>
    <form method="post" enctype="multipart/form-data">
      <div>
        <label for="file">Import .md File</label>
        <input type="file" id="file" name="file" multiple style={{ position : "absolute", clip: "rect(0 0 0 0)" }} />
      </div>
      <div>
        <button>submit</button>
      </div>
    </form>
  </>
}