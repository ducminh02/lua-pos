"use client";

import { useCallback } from "react";

export const usePrint = () => {
  const printElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id ${elementId} not found`);
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    // Collect all styles
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join("");

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          ${styles}
          <style>
            @media print {
              body, html { 
                margin: 0; 
                padding: 0;
                background: white;
              }
              body * {
                visibility: visible !important;
              }
              #${elementId} {
                display: block !important;
                visibility: visible !important;
                position: static !important;
                width: 100% !important;
              }
              /* Override global print hiding if present */
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `);
    doc.close();

    // Wait for content (esp styles) to load
    iframe.onload = () => {
        setTimeout(() => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            // Cleanup after print dialog closes (approximate)
            // Note: There's no perfect way to know when print is done in all browsers
            // We'll leave it in DOM or remove it after a delay. 
            // Better to remove it to avoid memory leaks.
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        }, 500);
    };
    
    // In case onload doesn't fire (if writing directly)
    if (iframe.contentWindow?.document.readyState === 'complete') {
         setTimeout(() => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
             setTimeout(() => {
                // document.body.removeChild(iframe); 
                // Don't remove immediately just in case
             }, 1000);
        }, 500);
    }
  }, []);

  return { printElement };
};
