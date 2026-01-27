# Build the project
npm run build

# Upload to S3
aws s3 sync dist/sumitech s3://www.globalsumi.com --delete --cache-control "max-age=0, no-cache, no-store, must-revalidate"

# Invalidate CloudFront (Production)
aws cloudfront create-invalidation --distribution-id E17SOAD2D1FBZF --paths "/*"

# Invalidate CloudFront (Staging) - Optional
aws cloudfront create-invalidation --distribution-id E1LF3TZ971UMHG --paths "/*"

Write-Host "Deployment complete! Changes should appear in 5-10 seconds."