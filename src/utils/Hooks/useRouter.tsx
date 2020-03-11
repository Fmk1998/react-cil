import React, {useMemo} from "react";
import {useParams, useLocation, useHistory, useRouteMatch} from "react-router-dom";
import queryString from "query-string";

export function useRouter() {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    return useMemo(() => {
        return {
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,
            query: {
                ...queryString.parse(location.search),
                ...params
            },
            match,
            location,
            history
        };
    }, [params, match, location, history]);
}

// Usage
export function TestUseRouter() {
    const router: any = useRouter();

    console.log(router.query.postId);

    console.log(router.pathname);

    return (
        <div>
            <button onClick={(e) => router.push("/about")}>About</button>
        </div>
    );
}
