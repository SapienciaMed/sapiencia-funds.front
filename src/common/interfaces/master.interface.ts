
export interface IMaster {
    id?:          number;
    codtlmo:     number;
    name:        string;
    description: string;
}


export interface ITypeMasterList {
    data:      Datum[];
    operation: Operation;
}

export interface Datum {
    id:   number;
    name: string;
}

export interface Operation {
    code: string;
}

