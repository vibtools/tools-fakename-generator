export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'QA Testing' | 'Security & Privacy' | 'Microjob Guide' | 'Engineering' | 'Privacy & Anonymity' | 'Creative & Writing' | 'Automation & APIs' | 'Tools & Comparison';
  author: {
    name: string;
    role: string;
    avatar: string;
    url: string;
  };
  publishedDate: string;
  modifiedDate: string;
  readTime: string;
  tags: string[];
  keywords: string[];
  emoji: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      subheading?: string;
      body: string[];
      table?: {
        headers: string[];
        rows: string[][];
      };
      codeSnippet?: {
        language: string;
        code: string;
      };
      keyTakeaways?: string[];
    }[];
    conclusion: string;
  };
}
