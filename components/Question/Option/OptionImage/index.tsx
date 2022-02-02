import Image from "next/image";
import React, { HTMLProps, useEffect, useRef, useState } from "react";
import { IOption } from "../../../../models/poll";
import { getStorageUrl } from "../../../../services/storage";

interface IOptionImageProps {
  alt: string;
  option?: IOption | null;
}

export default function OptionImage({ alt, option }: IOptionImageProps) {
  const mounted = useRef<boolean>(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    if (option?.image) {
      getStorageUrl(option.image)
        .then((url) => {
          if (mounted.current) {
            setSrc(url);
          }
        })
        .catch(console.error);
    }
  }, [option?.image]);

  if (!option?.image || !src) return null;
  return (
    <div className="imgContainer">
      <style jsx>{`
        .imgContainer {
          position: relative;
          width: 100%;
          // Aspect-ratio trick: https://css-tricks.com/aspect-ratio-boxes/
          padding-top: 50%;
        }
      `}</style>
      <Image alt={alt} src={src} layout="fill" objectFit="contain" />
    </div>
  );
}
