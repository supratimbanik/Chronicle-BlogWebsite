import express, { text } from "express";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { join, resolve } from "path";
import { readFile } from "node:fs/promises";

const app = express();
const port = 3000;
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const blogWebsiteFolder = resolve(__dirname, "..");
let cont = [];
let obj = [];

const filePaths = [
  join(blogWebsiteFolder, "dist/TextFile/Blog1.txt"),
  join(blogWebsiteFolder, "dist/TextFile/Blog2.txt"),
  join(blogWebsiteFolder, "dist/TextFile/Blog3.txt"),
  join(blogWebsiteFolder, "dist/TextFile/Blog4.txt"),
  join(blogWebsiteFolder, "dist/TextFile/Blog5.txt"),
];

// Use Promise.all to read all files concurrently
Promise.all(filePaths.map((filePath) => readFile(filePath, "utf8")))
  .then((dataArray) => {
    // dataArray contains the data read from each file in the same order as filePaths
    cont = dataArray;
    for (let i = 0; i < cont.length; i++) {
      cont[i] = cont[i]
        .split("\n")
        .map((line) => `<p font-family="'Roboto', sans-serif">${line}</p><br>`)
        .join("\n");
    }
    // Initialize the server
    initializeServer();
  })
  .catch((err) => {
    console.error("Error reading files:", err);
  });

function initializeServer() {
  let blog1 = {
    title: "The Future of Technology: What Awaits Us in 2024 and Beyond",
    author: "Supratim Banik",
    date: "10-02-2024",
    text: cont[0],
    url: `<a class="blog-link" id="0" href="/blogpost1">`,
    blogImg: `<img src="img/1.jpg" alt="article" />`,
  };
  let blog2 = {
    title:
      "The Rise of Sustainable Fashion: A Closer Look at Eco-Friendly Trends",
    author: "Supratim Banik",
    date: "26-01-2024",
    text: cont[1],
    url: `<a class="blog-link" id="0" href="/blogpost2">`,
    blogImg: `<img src="img/2.jpg" alt="article" />`,
  };
  let blog3 = {
    title:
      "The Power of Mindfulness: A Guide to Cultivating a Calm and Focused Mind",
    author: "Supratim Banik",
    date: "13-01-2024",
    text: cont[2],
    url: `<a class="blog-link" id="0" href="/blogpost3">`,
    blogImg: `<img src="img/3.jpg" alt="article" />`,
  };
  let blog4 = {
    title:
      "Exploring the Wonders of Space Tourism: The Future of Interstellar Adventures",
    author: "Supratim Banik",
    date: "27-12-2023",
    text: cont[3],
    url: `<a class="blog-link" id="0" href="/blogpost4">`,
    blogImg: `<img src="img/4.jpg" alt="article" />`,
  };
  let blog5 = {
    title:
      "Unveiling the Mysteries of Ancient Civilizations: Archaeological Marvels Around the Globe",
    author: "Supratim Banik",
    date: "11-12-2024",
    text: cont[4],
    url: `<a class="blog-link" id="0" href="/blogpost5">`,
    blogImg: `<img src="img/5.jpg" alt="article" />`,
  };
  obj = [blog1, blog2, blog3, blog4, blog5];

  app.use(express.static(join(blogWebsiteFolder, "dist")));

  app.set("views", join(blogWebsiteFolder, "views"));
  app.get("/", (req, res) => {
    res.sendFile(join(blogWebsiteFolder, "dist/index.html"));
  });

  app.get("/blogpost1", (req, res) => {
    res.render("blogpost.ejs", {
      title: obj[0].title,
      author: obj[0].author,
      date: obj[0].date,
      blogImg: obj[0].blogImg,
      content: obj[0].text,
      url1: `<a href="/blogpost2" />`,
      link1: obj[1].title,
      author1: obj[1].author,
      date1: obj[1].date,
      urlImg1: obj[1].blogImg,
      url2: `<a href="/blogpost3" />`,
      link2: obj[2].title,
      author2: obj[2].author,
      date2: obj[2].date,
      urlImg2: obj[2].blogImg,
      url3: `<a href="/blogpost4" />`,
      link3: obj[3].title,
      author3: obj[3].author,
      date3: obj[3].date,
      urlImg3: obj[3].blogImg,
    });
  });

  app.get("/blogpost2", (req, res) => {
    res.render("blogpost.ejs", {
      title: obj[1].title,
      author: obj[1].author,
      date: obj[1].date,
      blogImg: obj[1].blogImg,
      content: obj[1].text,
      url1: `<a href="/blogpost1" />`,
      link1: obj[0].title,
      author1: obj[0].author,
      date1: obj[0].date,
      urlImg1: obj[0].blogImg,
      url2: `<a href="/blogpost3" />`,
      link2: obj[2].title,
      author2: obj[2].author,
      date2: obj[2].date,
      urlImg2: obj[2].blogImg,
      url3: `<a href="/blogpost4" />`,
      link3: obj[3].title,
      author3: obj[3].author,
      date3: obj[3].date,
      urlImg3: obj[3].blogImg,
    });
  });

  app.get("/blogpost3", (req, res) => {
    res.render("blogpost.ejs", {
      title: obj[2].title,
      author: obj[2].author,
      date: obj[2].date,
      blogImg: obj[2].blogImg,
      content: obj[2].text,
      url1: `<a href="/blogpost2" />`,
      link1: obj[1].title,
      author1: obj[1].author,
      date1: obj[1].date,
      urlImg1: obj[1].blogImg,
      url2: `<a href="/blogpost5" />`,
      link2: obj[4].title,
      author2: obj[4].author,
      date2: obj[4].date,
      urlImg2: obj[4].blogImg,
      url3: `<a href="/blogpost4" />`,
      link3: obj[3].title,
      author3: obj[3].author,
      date3: obj[3].date,
      urlImg3: obj[3].blogImg,
    });
  });

  app.get("/blogpost4", (req, res) => {
    res.render("blogpost.ejs", {
      title: obj[3].title,
      author: obj[3].author,
      date: obj[3].date,
      blogImg: obj[3].blogImg,
      content: obj[3].text,
      url1: `<a href="/blogpost2" />`,
      link1: obj[1].title,
      author1: obj[1].author,
      date1: obj[1].date,
      urlImg1: obj[1].blogImg,
      url2: `<a href="/blogpost3" />`,
      link2: obj[2].title,
      author2: obj[2].author,
      date2: obj[2].date,
      urlImg2: obj[2].blogImg,
      url3: `<a href="/blogpost1" />`,
      link3: obj[0].title,
      author3: obj[0].author,
      date3: obj[0].date,
      urlImg3: obj[0].blogImg,
    });
  });

  app.get("/blogpost5", (req, res) => {
    res.render("blogpost.ejs", {
      title: obj[4].title,
      author: obj[4].author,
      date: obj[4].date,
      blogImg: obj[4].blogImg,
      content: obj[4].text,
      url1: `<a href="/blogpost2" />`,
      link1: obj[1].title,
      author1: obj[1].author,
      date1: obj[1].date,
      urlImg1: obj[1].blogImg,
      url2: `<a href="/blogpost3" />`,
      link2: obj[2].title,
      author2: obj[2].author,
      date2: obj[2].date,
      urlImg2: obj[2].blogImg,
      url3: `<a href="/blogpost4" />`,
      link3: obj[3].title,
      author3: obj[3].author,
      date3: obj[3].date,
      urlImg3: obj[3].blogImg,
    });
  });

  app.get("/search", (req, res) => {
    let searchTerm = req.query.searchQuery;
    let searchResult = [];
    let flag = 0;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
        searchResult.push(obj[i]);
        flag = flag + 1;
      }
    }
    if (flag == 0) {
      searchResult = [
        {
          blogImg: `<!---->`,
          url: `<!---->`,
          title: "No article found!",
          author: "",
          date: "",
        },
      ];
    }

    res.render("search.ejs", { searchResult: searchResult });
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
