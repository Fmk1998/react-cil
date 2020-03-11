import React, {useState, useEffect, useCallback} from "react";

// Hook
export const useAsync = (asyncFunction: Function, immediate = true) => {
    const [pending, setPending] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(() => {
        setPending(true);
        setValue(null);
        setError(null);
        return asyncFunction()
            .then((response: any) => setValue(response))
            .catch((error: React.SetStateAction<null>) => setError(error))
            .finally(() => setPending(false));
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return {execute, pending, value, error};
};

const myFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rnd = Math.random() * 10;
            rnd <= 5
                ? resolve("Submitted successfully 🙌")
                : reject("Oh no there was an error 😞");
        }, 2000);
    });
};

// Usage
export function TestUseAsync() {
    const {execute, pending, value, error} = useAsync(myFunction, false);

    return (
        <div>
            {value && <div>{value}</div>}
            {error && <div>{error}</div>}
            <button onClick={execute} disabled={pending}>
                {!pending ? "Click me" : "Loading..."}
            </button>
        </div>
    );
}

