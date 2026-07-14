# Security note

The Pi Server API key is intentionally absent from this project.

Store the replacement key only in a server-side environment variable, for example `PI_API_KEY`, on the future payment backend. Never expose it through `NEXT_PUBLIC_*`, browser JavaScript, source documentation, or a public repository.
