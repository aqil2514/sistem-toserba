export type HtmlDocumentOptions = {
  title?: string;
  head?: string;
  body: string;

  tailwind?: boolean;
};

export function buildHtmlDocument(options: HtmlDocumentOptions): string {
  const { title = 'Document', head = '', body, tailwind = false } = options;

  const tailwindCdn = tailwind
    ? `
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    `
    : '';

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>

    <style>
  @media print {
    .page-break {
      page-break-before: always;
      break-before: page;
    }

    table {
      page-break-inside: auto;
    }

    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    thead {
      display: table-header-group;
    }

    tfoot {
      display: table-footer-group;
    }
  }
</style>

    ${tailwindCdn}
    ${head}
  </head>
  <body>
    ${body}
  </body>
</html>
`.trim();
}
