import Dropzone from "react-dropzone";
import altogic from "@/libs/altogic";
import { Prediction } from "@/types";
import { cn } from "@/helpers";
import Loading from "@/components/Loading";
import { useStore } from "@/store";

export default function MyDropzone({ className }: { className?: string }) {
  const {
    uploading,
    setUploading,
    setProcessing,
    setOriginalImage,
    setProcessedImage,
  } = useStore();

  async function onDrop([acceptedFiles]: File[]) {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    const { id, input } = await upload(acceptedFiles);
    setOriginalImage(input.image);
    setUploading(false);

    setProcessing(true);
    const { outputImage } = await getGeneratedImage(id);
    setProcessedImage(outputImage);
    setProcessing(false);
  }

  async function getGeneratedImage(id: string) {
    const res = await fetch("/api/get-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return (await res.json()) as {
      outputImage: string | null;
      error: string | null;
    };
  }

  async function upload(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    let { data } = await altogic.endpoint.post("/prediction", formData);

    return data as Prediction;
  }

  const Status = () => {
    if (uploading) return <Loading />;
    return null;
  };

  return (
    <Dropzone
      accept={{ "image/jpeg": [], "image/png": [], "image/jpg": [] }}
      onDropAccepted={onDrop}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          className={cn(
            "group p-10 rounded-md border-2 border-dashed transition hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center",
            isDragActive ? "border-indigo-700" : "border-gray-300",
            className
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex justify-center items-center flex-col gap-4">
            {uploading ? (
              <Loading />
            ) : (
              <>
                <span className="text-lg bg-indigo-700 text-white px-6 py-3 rounded-full">
                  Upload an image
                </span>
                <p className="text-gray-500 group-hover:text-gray-700">
                  Or drag and drop an image
                </p>
                <p className="text-gray-500 text-xs">
                  Supported formats <strong>.jpg, .jpeg, .png</strong>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </Dropzone>
  );
}
