/* eslint-disable @next/next/no-img-element */
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
    <>
      <style jsx>{`
        img {
          max-width: 100%;
        }
      `}</style>
      <img alt={alt} src={src}></img>
    </>
  );
}
