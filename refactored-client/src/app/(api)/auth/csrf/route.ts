/** Web compatible method to create a hash, using SHA256 */
async function createHash(message: string) {
  const data = new TextEncoder().encode(message)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toString()
}

/** Web compatible method to create a random string of a given length */
function randomString(size: number) {
  const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2)
  const r = (a: string, i: number): string => a + i2hex(i)
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  return Array.from(bytes).reduce(r, "")
}

/**
 * Ensure CSRF Token cookie is set for any subsequent requests.
 * Used as part of the strategy for mitigation for CSRF tokens.
 *
 * Creates a cookie like 'next-auth.csrf-token' with the value 'token|hash',
 * where 'token' is the CSRF token and 'hash' is a hash made of the token and
 * the secret, and the two values are joined by a pipe '|'. By storing the
 * value and the hash of the value (with the secret used as a salt) we can
 * verify the cookie was set by the server and not by a malicious attacker.
 *
 * For more details, see the following OWASP links:
 * https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
 * https://owasp.org/www-chapter-london/assets/slides/David_Johansson-Double_Defeat_of_Double-Submit_Cookie.pdf
 */
export async function createCSRFToken({ options, cookieValue, isPost, bodyValue, }) {
    if (cookieValue) {
        const [csrfToken, csrfTokenHash] = cookieValue.split("|");
        const expectedCsrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
        if (csrfTokenHash === expectedCsrfTokenHash) {
            // If hash matches then we trust the CSRF token value
            // If this is a POST request and the CSRF Token in the POST request matches
            // the cookie we have already verified is the one we have set, then the token is verified!
            const csrfTokenVerified = isPost && csrfToken === bodyValue;
            return { csrfTokenVerified, csrfToken };
        }
    }
    // New CSRF token
    const csrfToken = randomString(32);
    const csrfTokenHash = await createHash(`${csrfToken}${options.secret}`);
    const cookie = `${csrfToken}|${csrfTokenHash}`;
    return { cookie, csrfToken };
}
