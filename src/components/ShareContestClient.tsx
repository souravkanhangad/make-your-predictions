"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Link as LinkIcon, MessageCircle, Share2, Download } from "lucide-react";
import Link from "next/link";

export default function ShareContestClient({ contestId, contestTitle }: { contestId: string, contestTitle: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Generate full URL
    setUrl(`${window.location.origin}/contest/${contestId}`);
  }, [contestId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: contestTitle,
          text: 'Make your prediction for this contest!',
          url: url,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      copyToClipboard();
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById("qrcode");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `contest-${contestId}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
      
      {/* Left side - QR Code */}
      <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 flex-1">
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <QRCodeSVG 
            id="qrcode"
            value={url || `https://makeyourprediction.com/contest/${contestId}`} 
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#0f172a"}
            level={"Q"}
            includeMargin={false}
          />
        </div>
        <button 
          onClick={downloadQR}
          className="flex items-center text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" /> Download QR Code
        </button>
      </div>

      {/* Right side - Links & Buttons */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Share via Link</h3>
        
        <div className="flex mb-8">
          <input 
            type="text" 
            readOnly 
            value={url}
            className="flex-1 px-4 py-3 rounded-l-xl border border-slate-200 bg-slate-50 text-slate-600 outline-none text-sm"
          />
          <button 
            onClick={copyToClipboard}
            className="px-6 py-3 bg-slate-900 text-white rounded-r-xl hover:bg-slate-800 transition-colors flex items-center justify-center min-w-[100px]"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">Share on Socials</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <a 
            href={`https://wa.me/?text=Make%20your%20prediction%20for%20${encodeURIComponent(contestTitle)}!%20${encodeURIComponent(url)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium text-sm"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?text=Make%20your%20prediction%20for%20${encodeURIComponent(contestTitle)}!&url=${encodeURIComponent(url)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-medium text-sm"
          >
            <LinkIcon className="w-4 h-4" /> X (Twitter)
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
             Facebook
          </a>
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors font-medium text-sm"
          >
            <Share2 className="w-4 h-4" /> More Options
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 text-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center">
            Return to Dashboard <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

    </div>
  );
}

// Temporary component mock since ArrowRight wasn't imported
function ArrowRight(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}
