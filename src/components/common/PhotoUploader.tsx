import React, { useRef, useState } from 'react';
import { Camera, Loader2, X } from 'lucide-react';
import type { UploadedPhoto } from '../../types';

interface PhotoUploaderProps {
      photos: UploadedPhoto[];
        onChange: (photos: UploadedPhoto[]) => void;
          maxPhotos?: number;
}

function compressImage(file: File): Promise<{ dataUrl: string; sizeKb: number }> {
      return new Promise((resolve, reject) => {
            const reader = new FileReader();
                reader.onerror = () => reject(new Error('Failed to read image.'));
                    reader.onload = () => {
                              const img = new Image();
                                    img.onerror = () => reject(new Error('Invalid image file.'));
                                          img.onload = () => {
                                                    const maxW = 700;
                                                            const scale = img.width > maxW ? maxW / img.width : 1;
                                                                    const canvas = document.createElement('canvas');
                                                                            canvas.width = Math.round(img.width * scale);
                                                                                    canvas.height = Math.round(img.height * scale);
                                                                                            const ctx = canvas.getContext('2d');
                                                                                                    if (!ctx) return reject(new Error('Canvas unavailable.'));
                                                                                                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                                                                                                                    const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
                                                                                                                            resolve({ dataUrl, sizeKb: Math.round((dataUrl.length * 3) / 4 / 1024) });
                                          };
                                                img.src = String(reader.result);
                    };
                        reader.readAsDataURL(file);
      });
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onChange, maxPhotos = 2 }) => {
      const inputRef = useRef<HTMLInputElement | null>(null);
        const [error, setError] = useState<string | null>(null);
          const [compressing, setCompressing] = useState(false);

            const handleFiles = async (files: FileList | null) => {
                    if (!files || files.length === 0) return;
                        setError(null);
                            const remaining = maxPhotos - photos.length;
                                if (remaining <= 0) {
                                          setError('Maximum ' + maxPhotos + ' photos allowed.');
                                                return;
                                }
                                    setCompressing(true);
                                        try {
                                                  const selected = Array.from(files).slice(0, remaining);
                                                        const nextPhotos: UploadedPhoto[] = [];
                                                              for (const file of selected) {
                                                                        if (!file.type.startsWith('image/')) {
                                                                                      setError('Only image files (JPG, PNG, WEBP) are supported.');
                                                                                                continue;
                                                                        }
                                                                                if (file.size > 10 * 1024 * 1024) {
                                                                                              setError('Each photo must be under 10 MB.');
                                                                                                        continue;
                                                                                }
                                                                                        const { dataUrl, sizeKb } = await compressImage(file);
                                                                                                nextPhotos.push({
                                                                                                              id: Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                                                                                                                        name: file.name,
                                                                                                                                  dataUrl,
                                                                                                                                            sizeKb,
                                                                                                });
                                                              }
                                                                    if (nextPhotos.length > 0) onChange([...photos, ...nextPhotos]);
                                        } catch {
                                                  setError('Could not process photo. Please try another image.');
                                        } finally {
                                                  setCompressing(false);
                                                        if (inputRef.current) inputRef.current.value = '';
                                        }
            };

              return (
                    <div className="space-y-2">
                          <div className="flex items-center justify-between">
                                  <label className="text-xs font-semibold text-navy-800">Add Issue Photos (Optional, up to {maxPhotos})</label>
                                          <span className="text-[11px] text-slate-500">{photos.length}/{maxPhotos}</span>
                                                </div>
                                                      <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => void handleFiles(e.target.files)} className="hidden" />
                                                            <div className="flex flex-wrap gap-2.5">
                                                                    {photos.map((photo) => (
                                                                                  <div key={photo.id} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                                                                              <img src={photo.dataUrl} alt={photo.name} className="w-full h-full object-cover" />
                                                                                                          <button type="button" onClick={() => onChange(photos.filter((p) => p.id !== photo.id))} aria-label="Remove photo" className="absolute top-1 right-1 w-5 h-5 rounded-full bg-navy-900/80 text-white flex items-center justify-center"><X className="w-3 h-3" /></button>
                                                                                                                    </div>
                                                                    ))}
                                                                            {photos.length < maxPhotos && (
                                                                                          <button type="button" disabled={compressing} onClick={() => inputRef.current?.click()} className="w-20 h-20 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/60 flex flex-col items-center justify-center text-teal-700 disabled:opacity-50">
                                                                                                      {compressing ? <Loader2 className="w-5 h-5 mb-1 animate-spin" /> : <Camera className="w-5 h-5 mb-1" />}
                                                                                                                  <span className="text-[10px] font-semibold">{compressing ? 'Saving...' : 'Add Photo'}</span>
                                                                                                                            </button>
                                                                            )}
                                                                                  </div>
                                                                                        {error && <p className="text-xs text-rose-600">{error}</p>}
                                                                                              <p className="text-[11px] text-slate-500">Photos are automatically compressed and shared with your assigned partner.</p>
                                                                                                  </div>
              );
};
