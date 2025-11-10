import {
  GetWessenwertPages,
  GetShortPages,
  GetLiedTextePages,
  GetEinFachPages,
  GetAusflugszielePages,
  GetListingsVeranstaltungen,
  GetKreuzwortratsel,
  GetAllSprachkursPages,
  GetKulinarischeSeelePages,
  GetKategorienPages,
} from "@/lib/getAllPages";

const baseUrl = "https://wir-in-ungarn.hu";

/**
 * Sitemap generator for Next.js App Router
 * This function generates a sitemap with all pages and posts
 */
export default async function sitemap() {
  const routes = [];

  // Add static routes
  const staticRoutes = [
    "",
    "/wissenswert",
    "/shorts",
    "/liedtexte",
    "/einfach-lesen",
    "/ausflugsziele",
    "/veranstaltungen",
    "/kreuzwortraetsel",
    "/sprachkurs",
    "/kulinarische-seele",
    "/kategorien",
    "/impressum",
    "/cookie-richtlinie-eu",
    "/philosophie",
    "/karriere",
    "/profile",
    "/anki-karten",
    "/coin",
    "/zahlentrainer",
    "/kultour-ungarn",
    "/die-nutzung-des-oeffentlichen-verkehrs-in-ungarn",
  ];

  staticRoutes.forEach((route) => {
    routes.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    });
  });

  try {
    // Fetch wissenswert posts
    try {
      const wissenswertData = await GetWessenwertPages(1000);
      if (wissenswertData?.data?.posts?.edges) {
        wissenswertData.data.posts.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/wissenswert/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching wissenswert pages:", error);
    }

    // Fetch shorts posts
    try {
      const shortsData = await GetShortPages(1000);
      if (shortsData?.data?.posts?.edges) {
        shortsData.data.posts.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/shorts/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching shorts pages:", error);
    }

    // Fetch liedtexte posts
    try {
      const liedtexteData = await GetLiedTextePages(1000);
      if (liedtexteData?.data?.liedtexte?.edges) {
        liedtexteData.data.liedtexte.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/liedtexte/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching liedtexte pages:", error);
    }

    // Fetch einfach-lesen posts
    try {
      const einfachLesenData = await GetEinFachPages(1000);
      if (einfachLesenData?.data?.einfacheLesungen?.edges) {
        einfachLesenData.data.einfacheLesungen.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/einfach-lesen/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching einfach-lesen pages:", error);
    }

    // Fetch ausflugsziele posts
    try {
      const ausflugszieleData = await GetAusflugszielePages(1000);
      if (ausflugszieleData?.data?.listings?.edges) {
        ausflugszieleData.data.listings.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/ausflugsziele/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching ausflugsziele pages:", error);
    }

    // Fetch veranstaltungen posts
    try {
      const veranstaltungenData = await GetListingsVeranstaltungen(1000);
      if (veranstaltungenData?.data?.listings?.edges) {
        veranstaltungenData.data.listings.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/veranstaltungen/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching veranstaltungen pages:", error);
    }

    // Fetch kreuzwortraetsel posts
    try {
      const kreuzwortraetselData = await GetKreuzwortratsel(1000);
      if (kreuzwortraetselData?.data?.crosswords?.edges) {
        kreuzwortraetselData.data.crosswords.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/kreuzwortraetsel/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching kreuzwortraetsel pages:", error);
    }

    // Fetch sprachkurs posts
    try {
      const sprachkursData = await GetAllSprachkursPages(1000);
      if (sprachkursData?.data?.sprachkurs?.edges) {
        sprachkursData.data.sprachkurs.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/sprachkurs/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching sprachkurs pages:", error);
    }

    // Fetch kulinarische-seele posts
    try {
      const kulinarischeData = await GetKulinarischeSeelePages(1000);
      if (kulinarischeData?.data?.recipes?.edges) {
        kulinarischeData.data.recipes.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/kulinarische-seele/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching kulinarische-seele pages:", error);
    }

    // Fetch kategorien posts
    try {
      const kategorienData = await GetKategorienPages(1000);
      if (kategorienData?.data?.posts?.edges) {
        kategorienData.data.posts.edges.forEach((edge) => {
          if (edge.node.slug) {
            routes.push({
              url: `${baseUrl}/kategorien/${edge.node.slug}`,
              lastModified: new Date(edge.node.date),
              changeFrequency: "monthly",
              priority: 0.7,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error fetching kategorien pages:", error);
    }
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}
