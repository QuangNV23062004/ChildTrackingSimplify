import api from "@/api/api";

class BlogService {
  async getBlogs(page: number, size: number) {
    try {
      const url = `/Blog?Page=${page || 1}&Size=${size || 10}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getBlogById(id: string) {
    try {
      const url = `/Blog/${id}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createBlog(
    title: string,
    content: string,
    image: File,
    attachments: File[],
    status?: number
  ) {
    try {
      const url = "/Blog";
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Content", content);
      formData.append("ImageUrl", image);
      attachments.forEach((attachment) => {
        formData.append("Attachments", attachment);
      });
      formData.append("Status", status?.toString() || "0");
      const response = await api.post(url, formData);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateBlogStatus(id: string, status?: number) {
    try {
      const url = `/Blog/${id}`;
      const response = await api.patch(url, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new BlogService();
