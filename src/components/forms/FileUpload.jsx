import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, File, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * File Upload Component
 * 
 * Beautiful file upload with drag & drop, progress, and preview
 */
export default function FileUpload({
  label,
  name,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  required = false,
  value = null,
  onChange,
  error,
  className,
  ...props
}) {
  const [file, setFile] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > maxSize) {
      alert(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
      return;
    }

    setFile(selectedFile);
    if (onChange) {
      onChange(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onChange) {
      onChange(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-base font-medium text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* File Input */}
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleChange}
        className="hidden"
        required={required}
        {...props}
      />

      {/* Upload Area */}
      {!file ? (
        <motion.div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
            dragActive
              ? "border-cyan-500 bg-cyan-50/50"
              : "border-slate-300 bg-white/40 hover:border-cyan-400 hover:bg-cyan-50/30",
            error && "border-red-300 bg-red-50/30"
          )}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-500">
            {accept ? `Accepted: ${accept}` : "Any file type"} • Max {formatFileSize(maxSize)}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200 bg-white/80 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
              <File className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2 text-sm text-red-600"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
}

