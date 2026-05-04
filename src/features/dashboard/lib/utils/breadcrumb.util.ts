// Format segment to title case
export const formatLabel = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Get path segments
export const getPathSegments = (pathname: string) =>
  pathname.split("/").filter(Boolean);

// Find diploma id from path segments
export const findDiplomaId = (segments: string[]) => {
  const index = segments.indexOf("diplomas");
  if (index !== -1 && index < segments.length - 1) {
    return segments[index + 1];
  }
  return null;
};

// Find exam id from path segments
export const findExamId = (segments: string[], diplomaId: string | null) => {
  if (!diplomaId) return null;
  const index = segments.indexOf(diplomaId);
  if (index !== -1 && index < segments.length - 1) {
    return segments[index + 1];
  }
  return null;
};
