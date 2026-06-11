export const ROUTES = {
  auth: ["/login", "/register", "/forgot-password", "/reset-password"],

  user: [
    /^\/diplomas$/,
    /^\/diplomas\/[^/]+$/,
    /^\/diplomas\/[^/]+\/[^/]+$/,
    /^\/account$/,
    /^\/account\/change-password$/,
  ],

  admin: [
    /^\/diplomas$/,
    /^\/diplomas\/[^/]+$/,
    /^\/diplomas\/[^/]+\/edit$/,
    /^\/diplomas\/create-new-diploma$/,

    /^\/exams$/,
    /^\/exams\/[^/]+$/,
    /^\/exams\/[^/]+\/edit$/,
    /^\/exams\/create-new-exam$/,

    /^\/exams\/[^/]+\/questions\/[^/]+$/,
    /^\/exams\/[^/]+\/questions\/[^/]+\/edit$/,

    /^\/exams\/create-new-question$/,

    /^\/account$/,
    /^\/account\/change-password$/,
  ],
};
