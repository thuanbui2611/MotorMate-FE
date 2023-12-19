import { useEffect, useState } from "react";
import BlogRelatedCarousel from "../../app/components/BlogRelatedCarousel";
import { Blog } from "../../app/models/Blog";
import agent from "../../app/api/agent";
import Loading from "../../app/components/Loading";
import { toast } from "react-toastify";

interface Props {
  blogId: string;
}
export default function RelatedBlogs({ blogId }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    try {
      if (loading || !blogId) return;
      setLoading(true);
      agent.Blog.getRelatedBlogs(blogId).then((blogs) => {
        setRelatedBlogs(blogs);
        setLoading(false);
      });
    } catch (error) {
      toast.error("Error when get related blogs");
      console.log("error when get related blogs", error);
    }
  }, [blogId]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <BlogRelatedCarousel relatedBlogs={relatedBlogs} />
    </>
  );
}
