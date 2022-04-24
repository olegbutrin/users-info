export type TSortingType = "city" | "company";

export type TPreviewUser = number | null;

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  comment: string;
};

export type TRawData = Array<TUser>;

export type TApiCallback<T> = (result: T) => void;

export type TFetchUsers = (
  onSuccess: TApiCallback<TRawData>,
  onError: TApiCallback<string>
) => void;

export type TAppStore = {
  sort: TSortingType;
  preview: number | null;
  request: boolean;
  error: string;
  users: TRawData;
}
