import { useCallback, useEffect } from "react";

export const useScrollEnd = (callback: () => void, dom: any) => {
    const handleScroll = useCallback(() => {
        const endPoint = dom
            ? Math.abs(dom.clientHeight + dom.scrollTop - dom.scrollHeight) < 5
            : Math.abs(
                  window.innerHeight +
                      document.documentElement.scrollTop -
                      document.documentElement.scrollHeight
              ) < 5;
        if (endPoint) {
            callback();
        }
    }, [callback, dom]);
    useEffect(() => {
        if (dom) {
            dom.addEventListener("scroll", handleScroll);
            return () => dom.removeEventListener("scroll", handleScroll);
        } else {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll, dom]);
};

export const useScrollTop = () => useEffect(() => window.scrollTo(0, 0), []);
