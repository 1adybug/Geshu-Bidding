import Taro from "@tarojs/taro";
import { write as XLSXWrite, utils as XLSXUtils } from "xlsx";

export default async function exportToExcel(data) {
  // Convert data to worksheet
  const worksheet = XLSXUtils.json_to_sheet(data);

  // Create a workbook and add the worksheet
  const workbook = XLSXUtils.book_new();
  XLSXUtils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Convert the workbook to an ArrayBuffer
  const excelData = XLSXWrite(workbook, { type: 'array', bookType: 'xlsx' });
  const buffer = new Uint8Array(excelData);

  try {
    // Write the buffer to a file using Taro's file system APIs
    await Taro.getFileSystemManager().writeFile({
      filePath: `${Taro.env.USER_DATA_PATH}/data.xlsx`,
      data: buffer,
      encoding: 'binary'
    });

    // Show success message to the user
    Taro.showToast({
      title: `${Taro.env.USER_DATA_PATH}/data.xlsx`,
      icon: 'success',
      duration: 2000
    });

    // Open the saved file (only works on Android)
    Taro.getFileSystemManager().open({
      filePath: `${Taro.env.USER_DATA_PATH}/data.xlsx`,
      success: () => {
        console.log('File opened successfully');
      },
      fail: (err) => {
        console.error('Error opening file:', err);
      }
    });
  } catch (err) {
    console.error('Error writing Excel file:', err);
  }
}

