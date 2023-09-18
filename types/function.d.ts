type CloudFunctionResultSuccess<T> = {
  success: true;
  result: {
    data: T[];
  };
};

type SeconTypeCloudFunctionResultSuccess<T> = {
  success: true;
  result: T[];
};
