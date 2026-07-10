import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { MDXComponents } from "mdx/types";

const mdxComponents: MDXComponents = {
  table: (props) => (
    <div className="prose-table-wrap">
      <table {...props} />
    </div>
  ),
  blockquote: (props) => <blockquote className="prose-blockquote" {...props} />,
  a: (props) => <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" />,
};

export default function MdxBody({ content }: { content: string }) {
  return (
    <div className="prose-research">
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
