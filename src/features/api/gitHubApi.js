import axios from "axios";
import parseLink from "parse-link-header";

const isLastPage = (pageLinks) => {
  return (
    Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev
  );
};

const getPageCount = (pageLinks) => {
  if (!pageLinks) {
    return 0;
  }

  if (isLastPage(pageLinks)) {
    /* when page is last gitHubAPI returns only 2 links in pageLinks header like this
      {
        first: {...},
        prev: {...}
      }
      so we can parse the page number from previous link or just get it from out request 
    */
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  } else {
    return 0;
  }
};

export const getIssues = async (org, repo, page = 1) => {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;

  try {
    const response = await axios.get(url);

    const pageLinks = parseLink(response.headers.link);
    let pageCount = 0;

    if (pageLinks != null) {
      pageCount = getPageCount(pageLinks);
    }
    // console.log(`end === ${pageLinks}`);

    return {
      pageLinks,
      pageCount,
      issues: response.data,
    };
  } catch (err) {
    throw err;
  }
};

export const getRepoDetails = async (org, repo) => {
  const url = `https://api.github.com/repos/${org}/${repo}`;

  const { data } = await axios.get(url);
  return data;
};

export const getIssue = async (org, repo, number) => {
  const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`;

  const { data } = await axios.get(url);
  return data;
};

export const getComments = async (url) => {
  const { data } = await axios.get(url);
  return data;
};
