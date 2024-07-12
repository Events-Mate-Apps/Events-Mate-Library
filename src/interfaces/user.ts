export interface UserData {
  username: string;
  id: string;
  email: string;
  createdAt: string;
  type: 'NORMAL' | 'ADMIN';
  appleUserIdentifier?: string;
  firstName?: string
  lastName?: string
}
export interface UserSettingsInterface {
  language: string;
  currency: string;
  allowMarketingEmails: boolean;
  allowSystemEmails: boolean;
  preferredLanguageISO: string
  preferredCurrencyISO: string
}