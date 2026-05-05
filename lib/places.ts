export interface PlaceDetails {
  name: string;
  address: string;
  phone: string | null;
  hours: string[] | null;
  rating: number | null;
  website: string | null;
  photos: string[];
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.warn('[Places] GOOGLE_PLACES_API_KEY not set — skipping Google Places lookup.');
    return null;
  }

  try {
    const fields = [
      'name',
      'formatted_address',
      'formatted_phone_number',
      'opening_hours',
      'rating',
      'website',
      'photos',
    ].join(',');

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== 'OK') return null;

    const r = data.result;
    const photos: string[] = (r.photos || []).slice(0, 3).map(
      (p: { photo_reference: string }) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${apiKey}`
    );

    return {
      name: r.name,
      address: r.formatted_address,
      phone: r.formatted_phone_number || null,
      hours: r.opening_hours?.weekday_text || null,
      rating: r.rating || null,
      website: r.website || null,
      photos,
    };
  } catch (err) {
    console.error('[Places] Error fetching place details:', err);
    return null;
  }
}
