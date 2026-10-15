/**
 * Prefix a root-relative path with the site's base path.
 *
 * On GitHub Pages' free address the site lives under
 * /LVXE-Photography-website-builder/; on a custom domain (or locally) the
 * base is "/" and paths are returned unchanged. Every internal href, film
 * source and asset path written by hand goes through this.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const link = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? `${base}${path}` : path);
