export interface DealType {
  id: string;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
  title: string;
  description: string;
  isPermanent: boolean;
  startsAt: string;
  endsAt: string;
  image: DealImage;
}

export interface DealImage {
  id: string;
  src: string;
  hash: string;
  dealId: string;
  alt: string;
}