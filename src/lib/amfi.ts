export async function fetchAMFIData() {
  const response = await fetch("https://www.amfiindia.com/spages/NAVAll.txt");
  const text = await response.text();
  return parseAMFIText(text);
}

export function parseAMFIText(text: string) {
  const lines = text.split("\n");
  const funds = [];
  let currentAmc = "";
  let currentCategory = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith("Scheme Code")) continue;

    if (line.startsWith("Open Ended Schemes") || line.startsWith("Close Ended Schemes") || line.startsWith("Interval Schemes")) {
      currentCategory = line;
      continue;
    }

    if (!line.includes(";") && !line.includes("-")) {
      if (line.endsWith("Mutual Fund")) {
        currentAmc = line;
      }
      continue;
    }

    const parts = line.split(";");
    if (parts.length >= 6) {
      const schemeCode = parts[0];
      const schemeName = parts[3];
      const nav = parseFloat(parts[4]);
      const date = parts[5];

      if (schemeCode && schemeName && !isNaN(nav)) {
        funds.push({
          schemeCode,
          schemeName,
          amcName: currentAmc,
          category: currentCategory,
          nav: nav,
          date: date,
        });
      }
    }
  }

  return funds;
}
