import { useEffect } from "react";

type UseClickOutsideProps = {
  cb: VoidFunction;
  ref: React.RefObject<any>;
};

export const useClickOutside = ({ref, cb}: UseClickOutsideProps) => {  
  useEffect(() => {    
    const handleClickOutside = (event: MouseEvent) => {
      if(ref.current && !ref.current.contains(event.target)){
        cb();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, cb]);
};