export interface FAQItem {
  id: number;
  question: string;
  answer: string | string[];
}

export interface FAQItemProps extends FAQItem {
  isOpen: boolean;
  onToggle: (id: number) => void;
}
