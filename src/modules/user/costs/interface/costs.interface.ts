export interface CreateCostReq {
    amount: number;
    desc: string;
    paymentType: number;
};

export interface CreateCostRes extends CreateCostReq {};