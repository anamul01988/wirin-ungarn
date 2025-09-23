import React, { useEffect, useState } from "react";
import { GetShortPages } from "@/lib/getAllPages";
import { DefaultSpinner } from "@/components/_components/Spinners";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import CustomPost from "@/components/ui/CustomPost";
const ShortPage = () => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [customPosts, setCustomPosts] = useState({});
  const [error, setError] = useState(null);
  const [onlyHeadings, setOnlyHeadings] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await GetShortPages();
        // console.log("LiedTextePage data:", apiData.data.liedtexte);
        setCookieData(apiData);
        setCustomPosts(apiData.data.short);
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
  // if (!cookieData || !cookieData.data || !cookieData.data.page)
  //   return <div>Keine Cookie-Daten gefunden.</div>;
  console.log("LiedTextePage data: cookieData 2222:", customPosts);
  const { title, content } = cookieData.data.pages?.nodes[0] || {};

  return (
    <div className="mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      {/* Header */}
      <div className="bg-red-600 text-white py-3 px-4 mb-6">
        <Typography variant="h5" className="font-bold text-center">
          {title}
        </Typography>
      </div>

      {/* Checkbox */}
      <div className="flex items-center justify-end mb-4">
        <Checkbox
          color="red"
          checked={onlyHeadings}
          onChange={(e) => setOnlyHeadings(e.target.checked)}
          label="ausschließlich Überschriften anzeigen"
          crossOrigin={undefined} // needed for React strict mode
        />
      </div>

      {/* Description */}
      <Typography
        variant="paragraph"
        className="text-green-800 font-bold leading-relaxed mb-6"
      >
        Auf dieser Übersichtsseite findest du alle Artikel, die die
        verschiedenen Auswanderer-Themen im Detail behandeln. Du kannst gerne
        durch die Beiträge stöbern oder die Filterfunktion nutzen, um gezielt
        nach bestimmten Inhalten zu suchen.
      </Typography>

      {/* Search Box */}
      <div className="mb-6">
        <Typography variant="small" className="font-medium mb-2">
          Diese Seite durchsuchen
        </Typography>
        <div className="flex lg:flex-nowrap md:flex-wrap gap-5">
          <Input
            type="text"
            label="Suche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            crossOrigin={undefined}
          />
          {/* <Button color="red" onClick={() => alert(`Searching for: ${search}`)}>
            SUCHE
          </Button> */}
          <Button
            color="red"
            onClick={async () => {
              setFiltering(true);
              try {
                const apiData = await GetLiedTextePages(search);
                setCustomPosts(apiData.data.liedtexte);
              } catch (err) {
                setError("Fehler beim Suchen.");
              } finally {
                setFiltering(false);
              }
            }}
          >
            SUCHE
          </Button>
        </div>
      </div>

      {/* Footer info */}
      <Typography variant="small" color="gray" className="mt-4">
        Angezeigt werden 50 von 144 Beiträgen.
      </Typography>
      <div className="p-6 max-w-5xl mx-auto">
        {filtering === true ? (
          <div>
            <DefaultSpinner />
          </div>
        ) : (
          <>
            {" "}
            {customPosts?.nodes?.map((item, idx) => (
              <div key={item.id}>
                <CustomPost
                  title={item?.title}
                  description={item.postContentLyrik?.introText}
                  onlyHeadings={onlyHeadings}
                  slug={item.slug}
                />
                {/* Divider except last */}
                {!onlyHeadings && idx < customPosts?.nodes?.length - 1 && (
                  <hr className="my-6 border-gray-300" />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ShortPage;
