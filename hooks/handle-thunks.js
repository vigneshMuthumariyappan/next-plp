'use client';

import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunks) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const fetchData = useCallback((item) => {
        setIsLoading(item??true);
        dispatch(thunks(item)).unwrap()
        .finally(() => setIsLoading(false))
        .catch(err => setError(err));
    }, [dispatch, thunks])

    return [fetchData, isLoading, error];
}