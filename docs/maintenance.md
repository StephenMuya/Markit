# Monthly Maintenance Checklist

- [ ] **API Keys Check**: Verify Notion and OpenAI keys are not expiring.
- [ ] **Fireflies Connection**: Ensure Fireflies.ai is still authorized in Make.com.
- [ ] **Scraper Validation**:
    - [ ] Run `scraper.py` manually and check console for errors.
    - [ ] Verify "The Real Deal" selectors still match the website structure.
    - [ ] Verify "The Promote" access (cookie/login status).
- [ ] **Database Health**:
    - [ ] Check "Automation Log" in Notion for any recurring red flags.
    - [ ] Archive old "Interactions" or "Equity" items if DB gets too large (>10k items).
- [ ] **Prompt Tuning**:
    - [ ] Review "Needs Review" items. If AI is consistently wrong, update `prompts.md` instructions.
