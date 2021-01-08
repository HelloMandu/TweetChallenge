import { useRef, useState, useEffect } from "react";
import cn from "classnames";

import { API_SERVER } from "../../path";
import "./LazeImage.scss";

interface LazyImageProps {
    className?: string;
    src: string;
    threshold?: number;
    alt?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
    className,
    src,
    threshold = 0.5,
    alt = "alt",
}) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isLoad, setIsLoad] = useState(false);
    const onIntersection = (entries: any, io: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                io.unobserve(entry.target);
                setIsLoad(true);
            }
        });
    };
    useEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(onIntersection, {
                threshold: threshold,
            });
        }
        imgRef.current && observerRef.current.observe(imgRef.current);
    }, [threshold]);
    return (
        <img
            className={cn("lazy-image", className, { isLoad })}
            src={
                isLoad ? src : `${API_SERVER}/images/placeholder.jpg`
            }
            ref={imgRef}
            alt={alt}
        />
    );
};

export default LazyImage;
