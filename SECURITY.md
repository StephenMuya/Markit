# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in NotionFlow, please report it by emailing the repository owner or opening a private security advisory on GitHub.

## Security Best Practices

### 1. Database Passwords

**⚠️ NEVER commit database passwords to version control.**

- Always set `DB_PASSWORD` via environment variables
- Use strong, unique passwords for production databases
- The default password in `.env.example` is for example purposes only - change it immediately
- For local development with Docker Compose, override the default by setting `DB_PASSWORD` in your environment

### 2. API Keys

- Never hardcode API keys (like `GEMINI_API_KEY`) in your code
- Always use environment variables for sensitive credentials
- Add `.env` to `.gitignore` to prevent accidental commits (already configured)

### 3. Production Deployment

For production deployments:

1. **Use Secret Management**: Store credentials in your platform's secret manager (AWS Secrets Manager, Azure Key Vault, etc.)
2. **Rotate Credentials**: Regularly rotate database passwords and API keys
3. **Least Privilege**: Grant only necessary database permissions
4. **Enable SSL/TLS**: Use encrypted connections to PostgreSQL

### 4. Docker Compose

The `docker-compose.yml` file uses `${DB_PASSWORD:-changeme}` as a default. 

**For local development:**
```bash
# Create a .env file (already in .gitignore)
echo "DB_PASSWORD=your_local_dev_password" > .env

# Start services
docker-compose up
```

**For production:** Use orchestration platforms (Kubernetes, ECS) with proper secret management instead of docker-compose.

### 5. Code Review

- All passwords and secrets have been removed from the codebase
- The application now requires `DB_PASSWORD` to be set via environment variable
- Failing to set `DB_PASSWORD` will result in a clear error message

## Security Features

- ✅ No hardcoded passwords in source code
- ✅ All database queries use parameterized statements (SQL injection prevention)
- ✅ URL validation uses proper parsing (injection prevention)
- ✅ Environment variable validation for required secrets
- ✅ `.env` file in `.gitignore`

## Contact

For security concerns, please contact the repository maintainers.
