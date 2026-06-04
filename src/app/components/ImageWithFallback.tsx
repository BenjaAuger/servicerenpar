import { useEffect, useMemo, useState } from "react";
import { getImageCandidates } from "../utils/imageUrl";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ImageWithFallback({ src, alt, className, onError, ...props }: ImageWithFallbackProps) {
  const candidates = useMemo(() => getImageCandidates(src), [src]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setFailed(false);
  }, [src]);

  const currentSrc = candidates[candidateIndex] ?? "";

  if (failed || !currentSrc) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className ?? ""}`}>
        <span className="text-gray-400">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={props.loading ?? "lazy"}
      decoding={props.decoding ?? "async"}
      referrerPolicy={props.referrerPolicy ?? "no-referrer"}
      onError={(event) => {
        const hasNextCandidate = candidateIndex < candidates.length - 1;
        if (hasNextCandidate) {
          setCandidateIndex((prev) => prev + 1);
          return;
        }

        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
