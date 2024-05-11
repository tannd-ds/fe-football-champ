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

  const dataType = ref("Text");

  if (data.format === "csv") {
    const res = useFileSystemAccess({
      suggestedName: `${data.name}.csv`,
      dataType,
      types: [
        {
          description: "CSV",
          accept: {
            "text/csv": [".csv"],
          },
        },
      ],
      excludeAcceptAllOption: true,
    });
    
    res.data.value = convertToCSV(data.data);

    await res.saveAs();
    
    toasts.add({
      title: "Downloaded",
      description: `Đã tải xuống ${data.name}`,
      color: "green"
    });

    return 1;
  } else {

    const res = useFileSystemAccess({
      suggestedName: `${data.name}.json`,
      dataType,
      types: [
        {
          description: "JSON",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
      excludeAcceptAllOption: true,
    });
    res.data.value = JSON.stringify(data.data);

    // save the file and show the "downloaded file" toast

    await res.saveAs();

    toasts.add({
      title: "Thành công",
      description: `Đã tải xuống ${data.name}`,
      color: "green"
    });

    return 1;
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