declare type FormUrlQueryParams = {
    searchParams: string;
    key: string;
    value: string | number | null;
};

declare type RemoveUrlQueryParams = {
    searchParams: string;
    keysToRemove: string[];
};