interface InputObject {
    [key: string]: string | number | boolean | null | undefined;
}

export default function filterNonEmptyValues(obj: InputObject): InputObject {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) =>
            value !== null && value !== undefined && value !== ""
        )
    );
}