# Agent Instructions

<!-- albee-agent-context -->
## Albee CLI — Agent Reference

This repo is synced to [albee.ai](https://albee.ai). Markdown files committed here appear as artifacts on the site automatically via a post-commit hook.

**Important**: Comments on artifacts live on albee.ai (Firestore), NOT in git. Always use the `albee` CLI to read and reply to comments.

### Auth

```bash
albee auth status    # Check connection
albee auth setup     # Configure API key
```

### Voice Captures

```bash
albee moments                          # List recent moments
albee moments --since 7d --format llm  # Last 7 days, AI-optimized output
albee moment <id>                      # Full detail for one moment
albee search "query"                   # Hybrid semantic+keyword search
albee search --semantic "concept"      # Meaning-based search
albee search --keyword "exact phrase"  # Exact text match
albee transcript <id>                  # Print transcript (pipe-friendly)
albee audio-url <id>                   # Signed audio download URL
albee stats                            # Library statistics
```

### Artifacts — CRUD

```bash
albee artifact list                              # List all artifacts
albee artifact list --repo myrepo --format json  # Filter by repo
albee artifact get <slug>                        # Get artifact metadata
albee artifact get <slug> --raw                  # Get raw markdown content
albee artifact create --title "Title" --file f.md  # Create new artifact
albee artifact update <slug> --title "New"       # Update fields
albee artifact update <slug> --file updated.md   # Replace content
albee artifact delete <slug>                     # Delete artifact
```

### Artifacts — Publishing & ACL

```bash
albee artifact publish <slug>                    # Publish (default route)
albee artifact publish <slug> --route blog       # Publish to specific route
albee artifact share <slug> --users "a@b.com"    # Share with specific users
albee artifact share <slug> --groups "@friends"  # Share with group
albee artifact unshare <slug>                    # Revert to draft
```

### Artifacts — Comments

```bash
albee artifact comments <slug>                                    # List comments
albee artifact comment <slug> --content "Your reply"              # Add comment
albee artifact comment <slug> --content "Re: ..." --parent-id <id>  # Reply
albee artifact comment <slug> --content "..." --quote "selected"  # Inline comment
albee artifact resolve <slug> <comment-id>                        # Resolve thread
albee artifact comment-delete <slug> <comment-id>                 # Delete comment
```

### Repo Sync

```bash
albee repo init                        # Set up auto-sync for this repo
albee artifact sync-commit file.md     # Manually sync specific files
```

### Key Concepts

- **Slug** = URL-safe identifier, visible in artifact URL (`albee.ai/a/{slug}`)
- **Comments are NOT in git** — they live on albee.ai. Use the CLI to read/reply.
- **`--format llm`** gives AI-optimized output (for captures/moments)
- **`--format json`** gives structured output (for artifacts)
- **Post-commit hook** syncs `.md` files automatically — no manual sync needed for committed files
<!-- /albee-agent-context -->
