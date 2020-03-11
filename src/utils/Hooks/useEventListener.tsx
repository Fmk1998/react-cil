import React, {useState, useRef, useEffect, useCallback} from "react";

// Hook
export function useEventListener(eventName: string, handler: (({clientX, clientY}: any) => void) | undefined, element = window) {
    const savedHandler: any = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            const eventListener = (event: any) => savedHandler.current(event);

            element.addEventListener(eventName, eventListener);

            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element]
    );
}

// Usage
export function TestUseEventListerner() {
    const [coords, setCoords] = useState({x: 0, y: 0});

    const handler = useCallback(
        ({clientX, clientY}) => {
            setCoords({x: clientX, y: clientY});
        },
        [setCoords]
    );

    useEventListener("mousemove", handler);

    return (
        <h1>
            The mouse position is ({coords.x}, {coords.y})
        </h1>
    );
}
