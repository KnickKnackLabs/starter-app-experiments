# starter-app-experiments

Experiment lab for [starter-app](https://github.com/KnickKnackLabs/starter-app). Each experiment is a branch that builds on starter-app, proving out patterns, integrations, and deployment strategies.

## How It Works

- `main` tracks upstream starter-app
- Each experiment lives on an `experiment/<name>` branch
- Experiments can derive from other experiments (branch off a branch)
- Completed experiments get tagged `archived/<name>`
- Multiple experiments can be combined into `project/<name>` branches via merge

## Quick Start

```sh
# Start a new experiment
mise run experiment:new static-cloudflare-site --description "Deploy as static site to Cloudflare Pages"

# List all experiments
mise run experiment:list

# Archive when done
mise run experiment:archive

# Combine experiments into a project
mise run experiment:combine my-project static-cloudflare-site auth-clerk
```

## Catalog

See [experiments/README.md](experiments/README.md) for the full catalog of experiments.

## Syncing with upstream

```sh
mise run experiment:sync   # Pull latest from starter-app into main
```

## Upstream

This repo is a fork of [KnickKnackLabs/starter-app](https://github.com/KnickKnackLabs/starter-app) — a monorepo with TanStack Start (web), Expo (mobile), Electron (desktop), and shared packages.
