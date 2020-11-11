import { Element, insertMrml } from './service';

describe('insertMrml', () => {
  it('should insert the template in existing', () => {
    const existing = `<mjml>
  <mj-head>
    <mj-title>coucou</mj-title>
  </mj-head>
  <mj-body>
  </mj-body>
</mjml>`;
    const elements: Element[] = [
      {
        type: 'section',
        properties: { columns: 1 },
        children: [
          {
            type: 'text',
            properties: {},
            children: 'Hello World',
          },
        ],
      },
    ];
    const result = insertMrml(existing, elements);
    expect(result).toContain('<mj-head>');
    expect(result).toContain('<mj-section');
    expect(result).toContain('<mj-column');
  });

  it('should create a new template', () => {
    const existing = `<mjml></mjml>`;
    const elements: Element[] = [
      {
        type: 'section',
        properties: { columns: 1 },
        children: [
          {
            type: 'text',
            properties: {},
            children: 'Hello World',
          },
        ],
      },
    ];
    const result = insertMrml(existing, elements);
    expect(result).not.toContain('<mj-head>');
    expect(result).toContain('<mj-section');
    expect(result).toContain('<mj-column');
  });
});
