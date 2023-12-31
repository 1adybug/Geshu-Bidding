export default function extractListData(html) {
  var pattern = /<ul\b[^>]*>([\s\S]*?)<\/ul>/g;
  var match;
  var ul_contents:any = [];

  while ((match = pattern.exec(html)) !== null) {
    var ul_content = match[1];
    ul_contents.push(ul_content);
  }

  if (ul_contents.length > 0) {
    ul_contents.forEach(function (content) {
      console.log(secondaryHandle(content));
      // console.log("---"); // Print a separator line for different <ul> contents
    });
  } else {
    console.log("No content found within any <ul> tags.");
  }
}

function secondaryHandle(html) {
  const regex =
    /<span class="lb-time">(.*?)<\/span>\s*<a href="(.*?)" target="_blank" title="(.*?)">/g;
  const results:any = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const spanContent = match[1];
    const href = match[2];
    const title = match[3];

    const obj:any = {
      time: spanContent,
      href: href,
      title: title,
      is_deleted: false,
      is_completely_deleted: false,
      is_collected: false
    };

    results.push(obj);
  }

  return JSON.stringify(results);
}
