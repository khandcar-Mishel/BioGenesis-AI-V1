# BioGen AI — RFdiffusion backend on Modal

Serverless-GPU port of [`backend/biogen_colab_backend_v5.py`](../../backend/biogen_colab_backend_v5.py).
Same pipeline (RFdiffusion → ProteinMPNN → AlphaFold2), same API contract the
frontend expects — but with a **stable URL**, **cached weights**, and **no Colab
babysitting**.

## Why this over Colab

| | Colab free | Modal |
|---|---|---|
| URL | ngrok, changes every restart | fixed `https://…modal.run` |
| Idle | disconnects after ~90 min | scales to zero, wakes on request |
| Daily limit | GPU cooldown after long runs | none |
| Weights | re-download ~5 GB every session | downloaded once to a Volume |
| Serving a web app | against Colab ToS | intended use |
| Cost | free | ~$30/mo free credit, then T4 ≈ $0.59/hr **only while a job runs** |

## One-time setup

```bash
pip install modal
modal setup                                     # log in / create account

# API key the frontend sends as the x-api-key header (v5 default value):
modal secret create biogen-secrets BIOGEN_API_KEY=biogen-key-2026

# Pull ~5 GB of weights into the Volume (run once, ~5–10 min):
modal run compute/modal/biogen_modal_app.py::download_weights

# Optional but recommended — verify torch/jax/RFdiffusion import on GPU:
modal run compute/modal/biogen_modal_app.py::selftest
```

## Deploy

```bash
modal deploy compute/modal/biogen_modal_app.py
```

Modal prints a URL, e.g. `https://<you>--biogen-rfdiffusion-fastapi-app.modal.run`.

In the BioGen app → **Settings**:
1. **Backend URL** = that URL (the app appends `/api/v1` itself)
2. **Authentication Token** = `biogen-key-2026`
3. **Test Connection** → **Save & Connect**

First call after idle cold-starts (~30–60 s: container boot + torch/jax import);
subsequent calls are instant until it scales down 15 min later.

## Iterating

- Change code → `modal deploy …` again (same URL).
- Faster GPU: set `gpu="L4"` (or `"A10G"`) in `biogen_modal_app.py`.
- Kill cold starts entirely: set `min_containers=1` (costs ~$14/day on T4 — only
  do this for a live demo, not day-to-day).
- Watch logs: `modal app logs biogen-rfdiffusion`

## Known limits (v1)

- **In-memory jobs, one container** (`max_containers=1`, like v5). If the browser
  tab that started a job closes and polling stops for > `scaledown_window`
  (15 min), Modal may scale the container down and lose that run. Keep the tab
  open until the job completes.
- **Versions**: `torch==2.4.1+cu124` is pinned. `jax[cuda12]` is installed
  unpinned, in the same `pip install` as ColabDesign, so jax/jaxlib/the CUDA
  plugin stay a coherent set (installing jax separately let ColabDesign's
  unpinned `jax` dependency upgrade jaxlib without the plugin -> mismatched
  pair -> segfault on `jax.devices()` — fixed by combining the two installs).
  If `selftest` instead reports a jax *API* error, ColabDesign v1.1.1 (2023)
  code hit a renamed API on a too-new jax; ceiling-pin jax in that one line
  (e.g. `"jax[cuda12]<0.5"`) and redeploy.
- v2 (durable jobs via `modal.Dict` + per-job `.spawn()` on separate GPUs) is
  sketched at the bottom of `biogen_modal_app.py`.
