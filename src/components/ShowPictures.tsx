import { useStore } from "@/store";
import Loading from "@/components/Loading";

export default function ShowPictures() {
  const { originalImage, processedImage, processing, reset } = useStore();
  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Original Image
          </h2>
          <img
            className="rounded-2xl"
            src={originalImage!}
            alt="Original Image"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Processed Image
          </h2>
          {processing ? (
            <div className="flex justify-center items-center h-full w-full">
              <Loading />
            </div>
          ) : (
            <img
              className="rounded-2xl"
              src={processedImage!}
              alt="Processed Image"
            />
          )}
        </div>
      </div>
      <button
        disabled={processing}
        className="border px-4 py-2 shadow rounded-lg bg-indigo-600 disabled:opacity-70 active:hover:bg-indigo-700 text-white"
        onClick={reset}
      >
        Reset and try again
      </button>
    </div>
  );
}
