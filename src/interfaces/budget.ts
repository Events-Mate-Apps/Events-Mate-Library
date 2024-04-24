import useTranslation from 'next-translate/useTranslation';

export enum PaymentType {
    Deposit = "deposit",
    Final = "final",
}

export enum PaymentStatus {
    Pending = "pending",
    Paid = "paid",
}

export interface PaymentTypeOption {
    label: string;
    type: PaymentType;
}

export interface PaymentStatusOption {
    label: string;
    status: PaymentStatus;
}

export const useTypeTitle = (type: PaymentType) => {
    const { t } = useTranslation('budget');
    switch (type) {
        case PaymentType.Deposit:
            return t("paymentType.deposit");
        case PaymentType.Final:
            return t("paymentType.finalPayment");
        default:
            return t("paymentType.deposit");
    }
};

export const useStatusTitle = (status: PaymentStatus) => {
    const { t } = useTranslation('budget');
    switch (status) {
        case PaymentStatus.Pending:
            return t("paymentStatus.pending");
        case PaymentStatus.Paid:
            return t("paymentStatus.paid");
        default:
            return t("paymentStatus.pending");
    }
};

export interface BudgetItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    category: string;
    amount: number;
    currency: string;
    dueDate: Date;
    paidAt?: Date;
    payer: string;
    notes: string;
    paymentType: PaymentType;
    paymentStatus: PaymentStatus;
    budgetId: string;
}

export interface Budget {
    id: string;
    createdAt: string;
    updatedAt: string;
    totalAmount: number;
    estimatedAmount: number;
    currency: string;
    weddingId: string;
    items: BudgetItem[];
}

export interface BudgetPut {
    totalAmount?: number;
    estimatedAmount?: number;
    currency?: string;
}

export interface BudgetItemPost {
    name: string;
    category: string;
    amount: number;
    currency: string;
    dueDate: Date;
    paidAt?: Date;
    payer: string;
    notes: string;
    paymentType: PaymentType;
    paymentStatus: PaymentStatus;
}

export interface BudgetItemPut {
    name?: string;
    category?: string;
    amount?: number;
    currency?: string;
    dueDate?: Date;
    paidAt?: Date;
    payer?: string;
    notes?: string;
    paymentType?: PaymentType;
    paymentStatus?: PaymentStatus;
}
