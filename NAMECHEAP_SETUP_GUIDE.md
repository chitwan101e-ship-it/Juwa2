# Namecheap Domain Setup Guide for Juwa2Casino

## Domain Configuration Steps

### 1. DNS Configuration in Namecheap

#### Access DNS Settings:
1. Log in to your Namecheap account
2. Go to **"Domain List"** from the left sidebar
3. Find `juwa2casino.com` and click **"Manage"**
4. Navigate to **"Advanced DNS"** tab

#### Configure DNS Records:

**For GitHub Pages (if hosting there):**
- **A Record**: Point to GitHub Pages IPs
  - Type: `A Record`
  - Host: `@`
  - Value: `185.199.108.153`
  - TTL: Automatic
  
  Add 3 more A records:
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

- **CNAME Record**: For www subdomain
  - Type: `CNAME Record`
  - Host: `www`
  - Value: `your-username.github.io` (or your hosting provider)
  - TTL: Automatic

**For Other Hosting Providers:**
- Check your hosting provider's documentation for specific DNS records
- Usually requires A records or CNAME records pointing to their servers

### 2. SSL Certificate Setup

#### If using GitHub Pages:
- SSL is automatically enabled once DNS is configured correctly
- May take 24-48 hours to activate

#### If using other hosting:
- Follow your hosting provider's SSL setup instructions
- Most providers offer free SSL via Let's Encrypt

### 3. Email Configuration (Optional)

If you want email for your domain:
1. In Namecheap Advanced DNS, add **MX Records**
2. Or use Namecheap's email forwarding service
3. Or set up professional email through Namecheap Private Email

### 4. Domain Privacy (Recommended)

1. In Namecheap domain management
2. Enable **"WhoisGuard"** to protect your personal information
3. This is usually free for the first year

## Google Search Console Verification (Namecheap Method)

### Option A: DNS TXT Record (Recommended)

1. **In Google Search Console:**
   - Go to verification settings
   - Select **"Domain name provider"**
   - Copy the TXT record value

2. **In Namecheap:**
   - Go to Advanced DNS
   - Add new TXT record:
     - Host: `@`
     - Value: `google-site-verification=your-verification-code`
     - TTL: Automatic
   - Save changes

3. **Wait 5-10 minutes** for DNS propagation

4. **Verify in Google Search Console**

### Option B: HTML Meta Tag

1. **In Google Search Console:**
   - Select **"HTML tag"** method
   - Copy the meta tag

2. **Add to your site:**
   - I can add this to your `index.html` file
   - Deploy the updated file
   - Verify in Search Console

## Common Namecheap DNS Issues

### DNS Not Propagating?
- Wait 24-48 hours for full propagation
- Use DNS checker tools to verify: https://dnschecker.org
- Clear your browser cache

### Website Not Loading?
- Verify DNS records are correct
- Check if hosting is properly configured
- Ensure domain is not expired
- Check Namecheap domain status

### SSL Not Working?
- Wait 24-48 hours after DNS setup
- Ensure all DNS records are correct
- Check hosting provider's SSL status

## Important Notes

1. **DNS Propagation Time**: Changes can take 24-48 hours to fully propagate worldwide
2. **TTL Settings**: Keep TTL at "Automatic" for faster updates
3. **Backup Records**: Save your DNS records before making changes
4. **Support**: Namecheap has 24/7 live chat support if you need help

## Next Steps After DNS Setup

1. Verify domain in Google Search Console
2. Submit sitemap.xml
3. Set up Google Analytics
4. Monitor domain status in Namecheap
5. Test website accessibility from different locations


