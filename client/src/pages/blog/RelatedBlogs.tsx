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
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    try {
      if (loading) {
        agent.Blog.getRelatedBlogs(blogId).then((blogs) => {
          debugger;
          setRelatedBlogs(blogs);
          setLoading(false);
        });
      }
    } catch (error) {
      toast.error("Error when get related blogs");
      console.log("error when get related blogs", error);
    }
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <BlogRelatedCarousel relatedBlogs={relatedBlogs} />
    </>
  );
}
