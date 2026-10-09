"use client";

/** No hosted PDF yet, so "Download the PDF" opens the print dialog (Save as PDF) with a print stylesheet. */
export default function PrintButton() {
  return (
    <button type="button" className="btn btn-signal" onClick={() => window.print()}>
      Download the PDF
    </button>
  );
}
