# Deployment Guide - Advanced Task Manager

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The app will be available at `http://localhost:3000`

### Using Docker CLI

```bash
# Build the image
docker build -t task-manager .

# Run the container
docker run -d -p 3000:80 --name task-manager task-manager

# Stop the container
docker stop task-manager
docker rm task-manager
```

## ☁️ Cloud Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your app will be deployed!

### Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. Invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=TaskFlow
```

## 📊 Performance Optimization

### Bundle Analysis

```bash
npm run build -- --mode analyze
```

### Lighthouse Score

Run Lighthouse in Chrome DevTools to check:
- Performance
- Accessibility
- Best Practices
- SEO

Target: 90+ in all categories

## 🔒 Security Checklist

- [x] HTTPS enabled
- [x] Security headers configured (nginx.conf)
- [x] Dependencies updated
- [x] No sensitive data in localStorage
- [x] Input sanitization

## 📈 Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- LogRocket for session replay
- Vercel Analytics

## 🚀 CI/CD Pipeline

See `.github/workflows/deploy.yml` for automated deployment setup.
