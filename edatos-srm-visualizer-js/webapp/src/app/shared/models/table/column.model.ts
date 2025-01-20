export interface Column {
    name: string;
    value: string;
    enabled: boolean;
    sortable: boolean;
}

export function sortColumns(selectedFields: Column[], defaultFields: Column[]): Column[] {
    selectedFields.sort((a: any, b: any) => {
        const aValueIndex = defaultFields.findIndex(field => field.value === a.value);
        const bValueIndex = defaultFields.findIndex(field => field.value === b.value);

        return aValueIndex - bValueIndex;
    });

    return selectedFields;
}
