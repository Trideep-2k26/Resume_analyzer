import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, CheckCircle } from 'lucide-react';
import { Resume } from '../types';

interface FileUploadProps {
  onFilesUploaded: (resumes: Resume[]) => void;
  existingResumes: Resume[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesUploaded, existingResumes }) => {
  const [uploadedFiles, setUploadedFiles] = useState<Resume[]>(existingResumes);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    const newResumes: Resume[] = [];
    
    for (const file of acceptedFiles) {
      const text = await file.text();
      const resume: Resume = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        content: text,
        uploadDate: new Date(),
        size: file.size,
        type: file.type
      };
      newResumes.push(resume);
    }
    
    const updatedResumes = [...uploadedFiles, ...newResumes];
    setUploadedFiles(updatedResumes);
    onFilesUploaded(updatedResumes);
    setIsUploading(false);
  }, [uploadedFiles, onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const removeFile = (id: string) => {
    const updatedResumes = uploadedFiles.filter(resume => resume.id !== id);
    setUploadedFiles(updatedResumes);
    onFilesUploaded(updatedResumes);
  };

  return (
    <div className="space-y-6">
      <motion.div
        {...getRootProps()}
        className={`relative p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-cyan-400 bg-cyan-400/10 scale-105'
            : 'border-gray-600 hover:border-cyan-500 hover:bg-cyan-500/5'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{ 
              rotate: isDragActive ? 360 : 0,
              scale: isDragActive ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Upload className="w-12 h-12 text-cyan-400" />
          </motion.div>
          
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">
              {isDragActive ? '🚀 DROP THE RESUMES!' : '📁 Upload Resumes'}
            </p>
            <p className="text-gray-400">
              Drag & drop resumes or click to browse
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>

        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center"
          >
            <div className="text-white font-semibold">
              🔄 Processing files...
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Uploaded Resumes ({uploadedFiles.length})
            </h3>
            
            <div className="grid gap-3">
              {uploadedFiles.map((resume) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium text-white">{resume.fileName}</p>
                      <p className="text-sm text-gray-400">
                        {Math.round(resume.size / 1024)} KB • {new Date(resume.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => removeFile(resume.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};