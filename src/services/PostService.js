const samplePosts = [
  {
    id: 1,
    title: "Getting Started with JavaScript",
    author: { id: 1, name: "Santhamurthy" },
    date: "2026-08-02",
    content: "A beginner-friendly walkthrough of JS fundamentals, covering variables, functions, and how the language actually runs in the browser.",
    likeCount: 12,
    imageUrl: "https://via.placeholder.com/600x300"
  },
  {
    id: 2,
    title: "Why CSS Grid Changed Everything",
    author: { id: 1, name: "Santhamurthy" },
    date: "2026-08-01",
    content: "Grid layout makes complex, responsive designs simple. Here's why it replaced float-based layouts for good.",
    likeCount: 8,
    imageUrl: "https://via.placeholder.com/600x300"
  },
  {
    id: 3,
    title: "Understanding Async/Await",
    author: { id: 1, name: "Santhamurthy" },
    date: "2026-08-01",
    content: "Promises made simple with async/await syntax. A practical guide to writing cleaner asynchronous JavaScript.",
    likeCount: 20,
    imageUrl: "https://via.placeholder.com/600x300"
  }
];

export default class PostService {

  getall() {
    return Promise.resolve({ data: samplePosts });
  }

  getSortedDate(pageNo = 1) {
    return Promise.resolve({ data: samplePosts });
  }

  getMostLiked(pageNo = 1) {
    const sorted = [...samplePosts].sort((a, b) => b.likeCount - a.likeCount);
    return Promise.resolve({ data: sorted });
  }

  getByAuthorId(authorId, pageNo = 1) {
    return Promise.resolve({ data: samplePosts.filter(p => p.author.id === authorId) });
  }

  getByPostId(postId) {
    return Promise.resolve({ data: samplePosts.find(p => p.id === Number(postId)) });
  }

  filterByTitle(title) {
    return Promise.resolve({
      data: samplePosts.filter(p => p.title.toLowerCase().includes(title.toLowerCase()))
    });
  }

  delete(postId, token) {
    return Promise.resolve({ data: "deleted" });
  }

  edit(postId, userId, editedPost, token) {
    return Promise.resolve({ data: editedPost });
  }

  getNumberOfPosts() {
    return Promise.resolve({ data: samplePosts.length });
  }

  getAuthorPostCount(authorId) {
    return Promise.resolve({ data: samplePosts.filter(p => p.author.id === authorId).length });
  }
}
