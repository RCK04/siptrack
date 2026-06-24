# SipTrack

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

## Docker

Build and run the production container locally:

```bash
docker build -t siptrack .
docker run --rm -p 3000:3000 --env-file .env siptrack
```

The health check is available at `http://localhost:3000/api/health`.

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
