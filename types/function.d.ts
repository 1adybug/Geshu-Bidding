type CloudFunctionResultSuccess<T> = {
  success: true;
  result: {
    data: T[];
  };
};
