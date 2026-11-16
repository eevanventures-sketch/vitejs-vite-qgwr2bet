import React, { useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { UploadedPhoto } from '../../types';

interface PhotoUploaderProps {
    photos: UploadedPhoto[];
      onChange: (photos: UploadedPhoto[]) => void;
        maxPhotos?: number;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onChange, maxPhotos = 3 }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
      const [error, setError] = useState<string | null>(null);

        const handleFiles = (files: FileList | null) => {
              if (!files || files.length === 0) return;
                  setError(null);
                      const remaining = maxPhotos - photos.length;
                          if (remaining <= 0) {
                                  setError('Maximum ' + maxPhotos + ' photos allowed.');
                                        return;
                          }
                              const selected = Array.from(files).slice(0, remaining);
                                  const nextPhotos: UploadedPhoto[] = [];
                                      for (const file of selected) {
                                              if (!file.type.startsWith('image/')) {
                                                        setError('Only image files (JPG, PNG, WEBP) are supported.');
                                                                continue;
                                              }
                                                    if (file.size > 5 * 1024 * 1024) {
                                                              setError('Each photo must be under 5 MB.');
                                                                      continue;
                                                    }
                                                          nextPhotos.push({
                                                                    id: Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                                                                            name: file.name,
                                                                                    previewUrl: URL.createObjectURL(file),
                                                                                            sizeKb: Math.round(file.size / 1024),
                                                          });
                                      }
                                          if (nextPhotos.length > 0) onChange([...photos, ...nextPhotos]);
                                              if (inputRef.current) inputRef.current.value = '';
        };

          return (
                <div className="space-y-2">
                      <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-navy-800">Add Issue Photos (Optional, up to {maxPhotos})</label>
                                      <span className="text-[11px] text-slate-500">{photos.length}/{maxPhotos}</span>
                                            </div>
                                                  <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
                                                        <div className="flex flex-wrap gap-2.5">
                                                                {photos.map((photo) => (
                                                                            <div key={photo.id} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                                                                        <img src={photo.previewUrl} alt={photo.name} className="w-full h-full object-cover" />
                                                                                                    <button type="button" onClick={() => onChange(photos.filter((p) => p.id !== photo.id))} aria-label="Remove photo" className="absolute top-1 right-1 w-5 h-5 rounded-full bg-navy-900/80 text-white flex items-center justify-center"><X className="w-3 h-3" /></button>
                                                                                                              </div>
                                                                ))}
                                                                        {photos.length < maxPhotos && (
                                                                                    <button type="button" onClick={() => inputRef.current?.click()} className="w-20 h-20 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/60 flex flex-col items-center justify-center text-teal-700">
                                                                                                <Camera className="w-5 h-5 mb-1" /><span className="text-[10px] font-semibold">Add Photo</span>
                                                                                                          </button>
                                                                        )}
                                                                              </div>
                                                                                    {error && <p className="text-xs text-rose-600">{error}</p>}
                                                                                          <p className="text-[11px] text-slate-500">Local preview only in demo mode (cloud upload activates with Firebase Storage).</p>
                                                                                              </div>
          );
};
