import { useFileSystemAccess } from '@vueuse/core'

export default async function (data) {
  /*
    Data should be in the format of:
    {
      "name": "season/team/soccer",
      "format": "json/csv" // Optional, default is json
      "data": [...] // The data to be processed
    }
  */
  const toasts = useToast();

  try {
    if (data.format === "csv") {

      const csvData = convertToCSV(data.data);

      const link = document.createElement('a');
      link.href = `data:text/csv,${encodeURIComponent(csvData)}`;
      link.download = `${data.name}.csv`;
      link.click();
      
      toasts.add({
        title: "Downloaded",
        description: `Đã tải xuống ${data.name}`,
        color: "green"
      });

      return 1;
    } else {
      const link = document.createElement('a');
      link.href = `data:application/json,${encodeURIComponent(JSON.stringify(data.data))}`;
      link.download = `${data.name}.json`;
      link.click();

      toasts.add({
        title: "Thành công",
        description: `Đã tải xuống ${data.name}`,
        color: "green"
      });

      return 1;
    }
  } catch (error) {
    toasts.add({
      title: "Lỗi",
      description: "Có lỗi xảy ra khi tải xuống dữ liệu",
      color: "red"
    });

    return 0;
  }
}

function convertToCSV(data) {
  // Assuming data is an array of objects with same keys
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Push headers to CSV
  csvRows.push(headers.join(','));

  // Push data rows to CSV
  data.forEach(row => {
    const values = headers.map(header => row[header]);
    csvRows.push(values.join(','));
  });

  // Join all rows with newline character
  return csvRows.join('\n');
}