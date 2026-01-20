To enable Apple Pay, you must:
1. Go to your Stripe Dashboard > Settings > Payment Methods > Apple Pay.
2. Click "Add new domain" and enter your domain (e.g., foxfollows.pages.dev).
3. Download the verification file (apple-developer-merchantid-domain-association).
4. Place that file in this directory (public/.well-known/).
5. Rename it to exactly `apple-developer-merchantid-domain-association` (no extension).
6. Deploy your site.
7. Click "Verify" in Stripe Dashboard.
