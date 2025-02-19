export const fetchServices = async (_filters?: {
  category?: string;
  pincode?: string;
  search?: string;
}) => {
  // API fetching logic (use _filters if needed)
};

export const bookService = async (
  _serviceId: string, 
  _dateTime: Date, 
  _remarks?: string
) => {
  // Booking logic (use parameters if needed)
};

export const createBlog = async (title: string, content: string, imageUrl: string) => {
  try {
    const response = await fetch('/api/admin/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, content, imageUrl }),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (error) {
    console.error('Error creating blog:', error);
    throw new Error('Failed to create blog');
  }
};

export const fetchPaginatedBlogs = async (page = 1) => {
  try {
    const response = await fetch(`/api/blogs?page=${page}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
};
