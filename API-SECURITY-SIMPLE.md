# 🔒 PRACTICAL API SECURITY GUIDE
## For Frontend-Only Applications

### **The Reality Check**
With a React frontend connecting directly to Strapi, your API tokens **WILL BE VISIBLE** to users. This is the trade-off for simplicity. However, we can still implement meaningful security.

---

## **🎯 WHAT TO DO RIGHT NOW**

### **Step 1: Create Limited Permission Tokens**

1. **Go to your Strapi admin**: http://localhost:1337/admin
2. **Navigate to**: Settings → API Tokens  
3. **Delete your current tokens** (they're too powerful)
4. **Create 2 new tokens**:

**Token #1: Content Reader**
- Name: `Website Content Reader`
- Token Type: `Read-only`
- Duration: `Unlimited`
- Permissions: ✅ Only check the content you need (pages, documents, etc.)

**Token #2: Form Submitter**  
- Name: `Form Submissions Only`
- Token Type: `Custom`
- Duration: `Unlimited`
- Permissions: ✅ Only `Create` for your form collections (matai-whetu-applications, etc.)

### **Step 2: Update Your .env File**
Replace the placeholder tokens in your `.env` with the new limited tokens:

```env
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_new_content_reader_token_here
VITE_STRAPI_FORM_API_TOKEN=your_new_form_submission_token_here
```

### **Step 3: Configure Strapi Security**
In your Strapi instance:

1. **CORS Settings** (Settings → CORS):
   - Only allow your website domains
   - Development: `http://localhost:3000`, `http://localhost:5173`
   - Production: `https://yourdomain.com`

2. **Rate Limiting** (if available):
   - Enable built-in rate limiting
   - Set reasonable limits (e.g., 100 requests per minute per IP)

---

## **🛡️ SECURITY LAYERS YOU NOW HAVE**

### **Layer 1: Limited Token Permissions**
- Content token can only READ content
- Form token can only CREATE form submissions
- No delete, update, or admin access

### **Layer 2: Client-Side Rate Limiting**
- Prevents accidental spam
- Max 3 submissions per 5 minutes per form type
- User-friendly error messages

### **Layer 3: Environment-Based URLs**
- No hardcoded localhost URLs
- Easy to switch between dev/production
- Centralized configuration

---

## **🚨 WHAT THIS DOESN'T PROTECT AGAINST**

Be honest about the limitations:
- ❌ Someone can still see your API tokens in browser dev tools
- ❌ Determined users can bypass client-side rate limiting
- ❌ Direct API calls to Strapi are still possible

---

## **🚀 PRODUCTION DEPLOYMENT**

### **For Production (.env.production)**:
```env
VITE_STRAPI_API_URL=https://your-strapi-production-url.com
VITE_STRAPI_API_TOKEN=your_production_content_token
VITE_STRAPI_FORM_API_TOKEN=your_production_form_token
```

### **Strapi Production Security**:
1. **Enable HTTPS** on your Strapi instance
2. **Configure CORS** for your production domain only
3. **Enable rate limiting** in Strapi
4. **Regular token rotation** (change tokens every few months)
5. **Monitor usage** through Strapi logs

---

## **🔄 WHEN TO UPGRADE TO REAL SECURITY**

Consider a backend proxy when you need:
- Complete token security
- Server-side validation
- Advanced rate limiting
- User authentication
- Payment processing
- Sensitive data handling

---

## **✅ CHECKLIST**

- [ ] Create limited permission tokens in Strapi
- [ ] Update .env with new tokens  
- [ ] Configure CORS in Strapi
- [ ] Test form submissions work
- [ ] Test content loading works
- [ ] Plan token rotation schedule
- [ ] Document for team members

---

**Bottom Line**: This approach gives you practical security without major code changes. It's not bank-level security, but it's appropriate for a community website with public content and simple forms.
