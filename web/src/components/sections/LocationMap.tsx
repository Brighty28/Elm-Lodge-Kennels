const BBOX_DEGREES = 0.006;

export default function LocationMap({
  latitude,
  longitude,
  address,
}: {
  latitude?: number;
  longitude?: number;
  address?: string;
}) {
  if (latitude === undefined || longitude === undefined) return null;

  const bbox = [
    longitude - BBOX_DEGREES,
    latitude - BBOX_DEGREES,
    longitude + BBOX_DEGREES,
    latitude + BBOX_DEGREES,
  ].join(",");

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
  const largerMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
      <iframe
        title={address ? `Map showing our location: ${address}` : "Map showing our location"}
        src={embedUrl}
        loading="lazy"
        className="h-80 w-full"
      />
      <div className="bg-zinc-50 px-4 py-2 text-sm">
        <a href={largerMapUrl} className="text-elk-accent-deep hover:underline">
          View larger map
        </a>
      </div>
    </div>
  );
}
