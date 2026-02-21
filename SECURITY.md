# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in NotionFlow, please report it by emailing the repository owner or opening a private security advisory on GitHub.

## Security Best Practices

### 1. Centralized Secrets Management

**All secrets and credentials are managed through the `.env` file.**

- **Location**: Project root (`.env`)
- **Template**: `.env.example` contains all available configuration options
- **Protection**: `.env` is in `.gitignore` to prevent accidental commits

**Setup:**
```bash
cp .env.example .env
nano .env  # Edit with your actual values
```

**NEVER commit the `.env` file to version control!**

### 2. Database Passwords

**⚠️ Database passwords MUST be set via environment variables.**

- Always set `DB_PASSWORD` in your `.env` file
- Use strong, unique passwords (minimum 16 characters, mixed case, numbers, symbols)
- The placeholder in `.env.example` is for documentation only - change it immediately
- For local development with Docker Compose, the `.env` file is automatically loaded
- Application will fail to start if `DB_PASSWORD` is not set (security by design)

### 3. API Keys

**All API keys are managed through the `.env` file:**

- `GEMINI_API_KEY` - Required for AI-powered extraction
- Never hardcode API keys in source code
- Always use environment variables
- Rotate API keys regularly

### 4. Configuration Files

**Java Backend (`application.properties`):**
- Contains NO hardcoded secrets
- All sensitive values reference environment variables from `.env`
- Example: `spring.datasource.password=${DB_PASSWORD}`

**Python Scraper:**
- Reads all credentials from environment variables
- Uses `python-dotenv` to load `.env` file
- Validates required credentials at startup

### 5. Production Deployment

For production deployments:

1. **Use Secret Management Services**: 
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Cloud Secret Manager
   - HashiCorp Vault

2. **Never use `.env` files in production**: Set environment variables through your platform's secret management system

3. **Rotate Credentials**: Regularly rotate all passwords and API keys

4. **Least Privilege**: Grant only necessary database permissions

5. **Enable SSL/TLS**: Use encrypted connections to PostgreSQL

6. **Audit Logs**: Enable and monitor access logs

### 6. Docker Compose

The `docker-compose.yml` file uses environment variable substitution:

```yaml
POSTGRES_PASSWORD: ${DB_PASSWORD:-changeme}
```

**For local development:**
```bash
# The .env file is automatically loaded by docker-compose
cp .env.example .env
nano .env  # Set DB_PASSWORD and other values

# Start services
docker-compose up
```

**For production:** Use orchestration platforms (Kubernetes, ECS) with proper secret management instead of docker-compose.

### 7. Environment Variable Validation

The application validates required environment variables at startup:

**Python Scraper:**
```python
if not db_password:
    raise ValueError(
        "DB_PASSWORD environment variable must be set. "
        "Never use hardcoded passwords in your code."
    )
```

**Java Backend:**
```properties
spring.datasource.password=${DB_PASSWORD}
# No default value - application fails to start if not set
```

### 8. Code Review Checklist

Before deploying:

- ✅ All secrets in `.env` file (not hardcoded)
- ✅ `.env` file in `.gitignore`
- ✅ `.env.example` has placeholder values only
- ✅ No passwords in git history
- ✅ Strong passwords used (16+ characters)
- ✅ API keys rotated if exposed
- ✅ Production uses secret management service

## Security Features

- ✅ Centralized secrets management in `.env` file
- ✅ No hardcoded passwords in source code
- ✅ All database queries use parameterized statements (SQL injection prevention)
- ✅ URL validation uses proper parsing (injection prevention)
- ✅ Environment variable validation for required secrets
- ✅ `.env` file in `.gitignore`
- ✅ Professional `.env.example` template with documentation
- ✅ Application fails fast if credentials not provided

## Contact

For security concerns, please contact the repository maintainers.

