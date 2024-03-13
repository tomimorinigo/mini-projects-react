/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { EVENTS } from '../utils/consts.js';

export function navigate(href){
    window.history.pushState({}, "", href);
    const navEvent = new Event(EVENTS.PUSHSTATE);
    window.dispatchEvent(navEvent);
  }
  
export function Link({ target, to, ...props}){

    const handleClick = (e) => {

      const isMainEvent = e.button === 0;
      const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
      const isManageableEvent = target === undefined || target === null || target === "_self";

      if(isMainEvent && isManageableEvent && !isModifiedEvent){
        e.preventDefault();
        navigate(to);
      }
    }

    return <a onClick={handleClick} href={to} target={target} {...props} />
}