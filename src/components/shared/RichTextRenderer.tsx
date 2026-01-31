import './rich-text.css';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div
      className={`rich-text-content prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
