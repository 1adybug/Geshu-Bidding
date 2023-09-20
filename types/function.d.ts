type CloudFunctionResultSuccess<T> = {
  success: true;
  result: {
    data: T[];
  };
};

type CloudFunctionResultSuccessForGetData<T> = {
  success: true;
  result: T[];
};

type SeconTypeCloudFunctionResultSuccess<T> = {
  success: true;
  result: T[];
};

interface DeleteRespond {
  success: boolean;
}
