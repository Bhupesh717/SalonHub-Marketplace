// Convert JSON to CSV
export function jsonToCSV(json: any): string {
  if (typeof json !== 'object') {
    throw new Error('Input must be a JSON object or array');
  }

  // Handle array of objects
  if (Array.isArray(json)) {
    if (json.length === 0) return '';

    // Get all unique keys
    const keys = Array.from(new Set(json.flatMap((obj) => Object.keys(obj))));

    // Create header row
    const header = keys.join(',');

    // Create data rows
    const rows = json.map((obj) =>
      keys
        .map((key) => {
          const value = obj[key];
          // Handle nested objects/arrays
          if (typeof value === 'object' && value !== null) {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          // Handle strings with commas or quotes
          if (
            typeof value === 'string' &&
            (value.includes(',') || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? '';
        })
        .join(',')
    );

    return [header, ...rows].join('\n');
  }

  // Handle single object
  const keys = Object.keys(json);
  const values = keys.map((key) => {
    const value = json[key];
    if (typeof value === 'object' && value !== null) {
      return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
    }
    if (
      typeof value === 'string' &&
      (value.includes(',') || value.includes('"'))
    ) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value ?? '';
  });

  return keys.join(',') + '\n' + values.join(',');
}

// Convert JSON to XML
export function jsonToXML(json: any, rootName = 'root'): string {
  function convertValue(key: string, value: any, indent = ''): string {
    const nextIndent = indent + '  ';

    if (value === null) {
      return `${indent}<${key} />\n`;
    }

    if (Array.isArray(value)) {
      return value
        .map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return convertValue(key, item, indent);
          }
          return `${indent}<${key}>${escapeXML(item)}</${key}>\n`;
        })
        .join('');
    }

    if (typeof value === 'object') {
      const children = Object.entries(value)
        .map(([k, v]) => convertValue(k, v, nextIndent))
        .join('');
      return `${indent}<${key}>\n${children}${indent}</${key}>\n`;
    }

    return `${indent}<${key}>${escapeXML(value)}</${key}>\n`;
  }

  function escapeXML(str: any): string {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

  if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
    const content = Object.entries(json)
      .map(([key, value]) => convertValue(key, value, '  '))
      .join('');
    xml += `<${rootName}>\n${content}</${rootName}>`;
  } else {
    xml += convertValue(rootName, json, '');
  }

  return xml;
}
