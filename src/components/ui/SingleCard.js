"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react";

const Singlecard = () => {
  const articles = [
    {
      id: 1,
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Volanbusz_bus.jpg",
      title: "Die Nutzung öffentlicher Verkehrsmittel",
      description:
        "Der öffentliche Nahverkehr in Ungarn bietet eine umfassende und effiziente Infrastruktur, die es Reisenden ermöglicht im gesamten Land problemlos zu navigieren. Das ungarische Verkehrssystem wird von mehreren zentralen Akteuren gesteuert...",
    },
    {
      id: 2,
      image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Hungary_Castle.jpg",
      title: "Historische Sehenswürdigkeiten in Ungarn",
      description:
        "Ungarn verfügt über zahlreiche historische Sehenswürdigkeiten wie Burgen, Schlösser und alte Stadtviertel. Diese Orte bieten einen einzigartigen Einblick in die Kultur und Geschichte des Landes...",
    },
    {
      id: 3,
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Hungarian_Food.jpg",
      title: "Kulinarische Spezialitäten",
      description:
        "Die ungarische Küche ist bekannt für ihre reichhaltigen und würzigen Speisen. Klassiker wie Gulasch, Lángos und Paprikagerichte gehören zu den beliebtesten Spezialitäten des Landes...",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(({ id, image, title, description }) => (
        <Card key={id} className="shadow-lg">
          <div className="w-full h-48">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover rounded-t-lg"
            />
          </div>
          <CardBody>
            <Typography variant="h6" color="blue-gray" className="mb-2 font-semibold">
              {title}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="text-sm leading-relaxed text-justify"
            >
              {description}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Singlecard;