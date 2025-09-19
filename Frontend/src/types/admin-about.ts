export type AboutHeroType = {
  image: string;
  title: string;
  subtitle?: string;
  overlay: boolean;
  file?: File;
  _preview?: string; 
};

export type AboutOverviewType = {
  postTitle: string;
  postHref: string;
  postImage: string;
  postExcerpt: string;
  ctaLabel: string;
  paragraphs: string;
};

export type ExhibitionItem = {
  year: number;
  description: string;
  href?: string;
};
