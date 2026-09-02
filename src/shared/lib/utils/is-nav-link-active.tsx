/**
 * Checks if a navigation link is active based on the current pathname
 * @param href - The href of the navigation link
 * @param pathname - The current pathname
 * @returns boolean - True if the navigation link is active, false otherwise
 */
export const isNavLinkActive = (href: string, pathname: string) => {
  return pathname === href || pathname.startsWith(`${href}/`);
};
