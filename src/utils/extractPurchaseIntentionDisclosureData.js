export function extractTableData(html) {
  const regex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  const matches = regex.exec(html);

  if (matches && matches.length > 1) {
    const tableContent = matches[1];
    const tbodyRegex = /<tbody[^>]*>([\s\S]*?)<\/tbody>/gi;
    const tbodyMatch = tbodyRegex.exec(tableContent);

    if (tbodyMatch && tbodyMatch.length > 1) {
      const tbodyContent = tbodyMatch[1];
      const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      const trMatches = tbodyContent.match(trRegex);

      if (trMatches && trMatches.length > 0) {
        const tableData = [];

        for (let i = 0; i < trMatches.length; i++) {
          const trContent = trMatches[i];
          const tdMatches = trContent.match(tdRegex);

          if (tdMatches && tdMatches.length > 0) {
            const row = [];

            for (let j = 0; j < tdMatches.length; j++) {
              const tdContent = tdMatches[j].replace(/<[^>]+>/g, ""); // 移除html标签
              row.push(tdContent.trim());
            }

            tableData.push(row);
          }
        }

        return {
          no: tableData[0][0],
          projectName: tableData[0][1],
          purchaseRequirementsSummary: tableData[0][2],
          purchaseBudget: tableData[0][3],
          expectedPurchaseMonth: tableData[0][4],
          whetherForSmallAndMediumEnterprise: tableData[0][5],
          whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts:
            tableData[0][6],
          remark: tableData[0][7],
        };
      }
    }
  }

  return null; // 没有匹配到<table>标签或<tbody>标签
}
