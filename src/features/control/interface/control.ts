export interface IEditItemControl {
    contentItem: {
        commune?: {
            value: string,
            isDisabled: boolean
        },
        numberOfPreSelected?: {
            value: string,
            isDisabled: boolean
        },
        quotas?: {
            value: string,
            isDisabled: boolean
        },
        availableResource?: {
            value: string,
            isDisabled: boolean
        },
        awarde?: {
            value: string,
            isDisabled: boolean
        },
        available?: {
            value: string,
            isDisabled: boolean
        },
        participation?: {
            value: string,
            isDisabled: boolean
        },
        noLegalized?: {
            value: string,
            isDisabled: boolean
        },
        financialIncome?: {
            value: string,
            isDisabled: boolean
        },
        programFund?: {
            value: string,
            isDisabled: boolean
        },
    },
    typeReportControl: string,
}

export interface IEditItem{
    programFund?: string,
    commune?: string,
    numberOfPreSelected?: string,
    quotas?: string,
    availableResource?: string,
    available?: string,
    awarde?: string,
    participation?: string,
    noLegalized?: string,
    financialIncome?: string,
}