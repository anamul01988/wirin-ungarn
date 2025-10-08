"use client";
import React, { useEffect, useState } from "react";
import {
  GetShortPages,
  GetWessenwertPages,
  SearchAllPosts,
} from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
import WissenwertPostGrid from "@/components/ui/WissenwertPost";

const WissenswertPage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [customPosts, setCustomPosts] = useState({});
  const [searchResults, setSearchResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    endCursor: null,
  });
  const [searchPageInfo, setSearchPageInfo] = useState({
    hasNextPage: false,
    endCursor: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [pageHistory, setPageHistory] = useState([]); // Store page history for navigation
  const [searchPageHistory, setSearchPageHistory] = useState([]); // Store search page history

  const loadPage = async (direction) => {
    if (loadingPage) return;

    setLoadingPage(true);
    try {
      let cursor = null;
      let newPage = isSearching ? searchCurrentPage : currentPage;
      let currentPageInfo = isSearching ? searchPageInfo : pageInfo;
      let currentHistory = isSearching ? searchPageHistory : pageHistory;

      if (direction === "next") {
        cursor = currentPageInfo.endCursor;
        newPage = (isSearching ? searchCurrentPage : currentPage) + 1;
        // Store current page in history
        if (isSearching) {
          setSearchPageHistory((prev) => [
            ...prev,
            { page: searchCurrentPage, cursor: searchPageInfo.endCursor },
          ]);
        } else {
          setPageHistory((prev) => [
            ...prev,
            { page: currentPage, cursor: pageInfo.endCursor },
          ]);
        }
      } else if (direction === "previous") {
        if (currentHistory.length > 0) {
          // Get the previous page from history
          const prevPage = currentHistory[currentHistory.length - 1];
          cursor = prevPage.cursor;
          newPage = prevPage.page;
          // Remove the last page from history
          if (isSearching) {
            setSearchPageHistory((prev) => prev.slice(0, -1));
          } else {
            setPageHistory((prev) => prev.slice(0, -1));
          }
        } else {
          setLoadingPage(false);
          return;
        }
      }

      let apiData;
      if (isSearching) {
        apiData = await SearchAllPosts(search, 10, cursor);
      } else {
        apiData = await GetShortPages(10, cursor);
      }
      const newPosts = apiData.data.posts;

      // Replace posts instead of appending
      if (isSearching) {
        setSearchResults(newPosts);
        setSearchPageInfo(newPosts.pageInfo);
        setSearchCurrentPage(newPage);
      } else {
        setCustomPosts(newPosts);
        setPageInfo(newPosts.pageInfo);
        setCurrentPage(newPage);
      }
    } catch (err) {
      setError("Fehler beim Laden der Seite.");
    } finally {
      setLoadingPage(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      // If search is empty, clear search and show original data
      clearSearch();
      return;
    }

    setFiltering(true);
    setIsSearching(true);
    try {
      const apiData = await SearchAllPosts(search);
      setSearchResults(apiData.data.posts);
      setSearchPageInfo(apiData.data.posts.pageInfo);
      setSearchCurrentPage(1);
      setSearchPageHistory([]);
    } catch (err) {
      setError("Fehler beim Suchen.");
    } finally {
      setFiltering(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setIsSearching(false);
    setSearchResults({});
    setSearchPageInfo({ hasNextPage: false, endCursor: null });
    setSearchCurrentPage(1);
    setSearchPageHistory([]);
  };

  // Helper function to transform posts data for the new component
  const transformPostsData = (posts) => {
    if (!posts?.edges) return [];

    return posts.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.postContent?.postContent?.[0]?.content || "",
      image: edge.node.featuredImage?.node?.sourceUrl || null,
      imageAlt: edge.node.featuredImage?.node?.altText || edge.node.title,
      slug: edge.node.slug,
      category: "all", // Default category, can be enhanced later
      badge: "ARTIKEL", // Default badge, can be enhanced later
    }));
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handle search from the new component
  const handleNewSearch = (searchTerm) => {
    setSearch(searchTerm);
    handleSearch();
  };

  // Handle page change from the new component
  const handleNewPageChange = (direction) => {
    loadPage(direction);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetWessenwertPages();
        console.log("shorts data:", apiData.data.posts);
        console.log("shorts data: alll 222222", apiData);
        setCookieData(apiData);
        setCustomPosts(apiData.data.posts);
        setPageInfo(apiData.data.posts.pageInfo);
        setCurrentPage(1);
        setPageHistory([]);
      } catch (err) {
        setError("Fehler beim Laden der Cookie-Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <DefaultSpinner />
      </div>
    );
  if (error) return <div>{error}</div>;

  const { title } = cookieData.data.pages?.nodes[0] || {};
  const currentPosts = isSearching ? searchResults : customPosts;
  const currentPageNum = isSearching ? searchCurrentPage : currentPage;
  const currentPageInfo = isSearching ? searchPageInfo : pageInfo;
  const totalPages = Math.ceil((currentPosts?.edges?.length || 0) / 10); // Assuming 10 posts per page

  return (
    <WissenwertPostGrid
      posts={transformPostsData(currentPosts)}
      title={title}
      onSearch={handleNewSearch}
      onFilter={handleFilterChange}
      onPageChange={handleNewPageChange}
      currentPage={currentPageNum}
      totalPages={totalPages}
      isLoading={filtering || loadingPage}
      searchValue={search}
      onSearchChange={setSearch}
      activeFilter={activeFilter}
      onlyHeadings={onlyHeadings}
    />
  );
};

export default WissenswertPage;
