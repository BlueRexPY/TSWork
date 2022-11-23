import { GetGoogle } from "../../../api/services/google";
import { GetReddit } from "../../../api/services/reddit";
import { GetTwitter } from "../../../api/services/twitter";
import { GetYoutube } from "../../../api/services/youtube";
import { GetNews } from "../../../api/services/news";
import {
  CATEGORY,
  GEO,
  GEO_TWiTTER,
  CATEGORY_NEWS,
} from "../../../utils/consts";
import { GetRss } from "../../../api/services/rss";

export const DeleteReq = (requests, data) => {
  return requests.filter(
    (e) =>
      !(
        e.data.toLowerCase() === data.title.toLowerCase() &&
        e.type === data.type &&
        e.geo === data.geo
      )
  );
};

export const getCountry = (code) => {
  return GEO.filter((e) => e.code === code)[0].name;
};

export const getCountryTwitter = (code) => {
  return GEO_TWiTTER.filter((e) => e.code === code)[0].name;
};

export const getCategoryNews = (code) => {
  return CATEGORY_NEWS.filter((e) => e.code === code)[0].name;
};

export const getCategory = (code) => {
  return CATEGORY.filter((e) => e.code === code)[0].name;
};

export const fetchData = async (request) => {
  let res;
  switch (request.type) {
  case "reddit":
    res = await GetReddit(request.data);
    return {
      type: request.type,
      title: request.data,
      data: res.data.data.children,
      geo: "all",
    };
  case "google":
    res = await GetGoogle(request.geo, request.data);
    return {
      type: request.type,
      title: request.data,
      geo: request.geo,
      data: res.data.storySummaries.trendingStories,
    };
  case "twitter":
    res = await GetTwitter(request.geo);
    return {
      type: request.type,
      title: request.data,
      geo: request.geo,
      data: res.data[0].trends,
    };
  case "youtube":
    res = await GetYoutube(request.geo);
    return {
      type: request.type,
      title: request.data,
      geo: request.geo,
      data: res.data.items,
    };
  case "news":
    res = await GetNews(request.geo, request.data);
    return {
      type: request.type,
      title: request.data,
      geo: request.geo,
      data: res.data.articles,
    };
  case "rss":
    res = await GetRss(request.data);
    return {
      type: request.type,
      title: request.data,
      geo: request.geo,
      data: res.data,
    };
  }
};


export const isUniqueRequest = (requests, request) => {
  const {
    reqType,
    requestText,
    category,
    geo,
    geoTwitter,
    geoYoutube,
    geoNews,
    categoryNews,
    rssUrl,
    rssName,
  } = request;

  const getData = (reqType) => {
    switch (reqType) {
    case "reddit":
      return requestText.value.toLowerCase();
    case "google":
      return category;
    case "twitter":
      return geoTwitter;
    case "youtube":
      return geoYoutube;
    case "news":
      return categoryNews;
    case "rss":
      return rssUrl.value;
    }
  };

  const getGeo = (reqType) => {
    switch (reqType) {
    case "reddit":
      return "all";
    case "google":
      return geo;
    case "twitter":
      return geoTwitter;
    case "youtube":
      return geoYoutube;
    case "news":
      return geoNews;
    case "rss":
      return rssName.value;
    }
  };
  return !(
    requests.filter(
      (i) =>
        JSON.stringify(Object.entries(i).sort()) ==
        JSON.stringify(
          Object.entries({
            type: reqType,
            data: getData(reqType),
            geo: getGeo(reqType),
          }).sort()
        )
    ).length > 0
  );
};

export const filterPostsData = async (requests, postsData) => {
  return postsData.filter(
    (e) =>
      requests.filter(
        (i) =>
          JSON.stringify(Object.entries(i).sort()) ==
          JSON.stringify(
            Object.entries({ type: e.type, data: e.title, geo: e.geo }).sort()
          )
      ).length > 0
  );
};
