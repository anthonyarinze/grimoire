import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function PDFViewer({ url }: { url: string }) {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div className="w-full h-screen">
        <Viewer fileUrl={url} />
      </div>
    </Worker>
  );
}
