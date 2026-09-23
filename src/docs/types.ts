export interface DocSection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    id: string;
    title: string;
    content: string[];
    codeSnippet?: {
      language: string;
      code: string;
      filename?: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  codeSnippet?: {
    language: string;
    code: string;
    filename?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: 'tip' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
  };
}

export interface DocPage {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: 'Overview' | 'API & Integration' | 'Algorithms & Standards' | 'Comparisons & Alternatives' | 'Guides & Workflows';
  lastUpdated: string;
  readTime: string;
  keywords: string[];
  sections: DocSection[];
}

export interface DocCategory {
  name: string;
  description: string;
  pages: {
    slug: string;
    title: string;
    badge?: string;
  }[];
}
