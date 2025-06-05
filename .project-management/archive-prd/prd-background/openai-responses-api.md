# OpenAI Responses API Guide 

> **In a nutshell:**
> The **Responses API** accepts an array of chat‑style *messages* (`input`).  Text history is simply appended to this array, and images can be referenced by URL *or* embedded as a base64 data‑URI.  Below you’ll learn the exact message format, see code for both Python and JavaScript, and walk through an end‑to‑end example.

---

## 1 · Message & History Format Recap

| Key       | Required? | Typical values                      | Notes                                                  |
| --------- | --------- | ----------------------------------- | ------------------------------------------------------ |
| `role`    | ✔         | `"user"`, `"assistant"`, `"system"` | Same set you already know from Chat Completions.       |
| `content` | ✔         | *String* **or** list of parts       | Image parts use `{type:"input_image", image_url:"…"}`. |

*Uploading history* is nothing more than pushing each earlier turn into the `input` array in chronological order.

---

## 2 · Including Images

### 2.1 External URL (quickest)

```json
{
  "type": "input_image",
  "image_url": "https://example.com/photo.jpg"
}
```

OpenAI fetches the image for you.

### 2.2 In‑lined base64 (no public hosting required)

```json
{
  "type": "input_image",
  "image_url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
}
```

Here `image_url` is a **data URI**: the literal string `data:<mime>;base64,<bytes>`.

---

## 3 · Base64‑encoding Recipes

### 3.1 Browser JavaScript (client‑side)

```js
const fileInput = document.querySelector("input[type=file]");
fileInput.onchange = () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const dataUri = reader.result; // "data:image/png;base64,iVBORw0K..."
    // use dataUri in your API request
  };
  reader.readAsDataURL(file);      // converts to base64 data URI
};
```

### 3.2 Node / server JavaScript

```js
import { readFileSync } from "fs";
const imgBytes = readFileSync("photo.jpg");
const dataUri = `data:image/jpeg;base64,${imgBytes.toString("base64")}`;
```

### 3.3 Python

```python
import base64, mimetypes, pathlib

def to_data_uri(path: str) -> str:
    mime, _ = mimetypes.guess_type(path)
    with open(path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("ascii")
    return f"data:{mime or 'image/png'};base64,{encoded}"
```

---

## 4 · Full Python Example (text + history + base64 image)

```python
from openai import OpenAI
import base64, mimetypes

client = OpenAI()

def to_data_uri(path):
    mime, _ = mimetypes.guess_type(path)
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    return f"data:{mime or 'image/jpeg'};base64,{b64}"

history = [
    {"role": "system", "content": "You are a sports analyst."},
    {"role": "user",   "content": "What two teams are playing in this photo?"},
]

history.append({
    "role": "user",
    "content": [
        {
            "type": "input_image",
            "image_url": to_data_uri("lebron.jpg")
        }
    ]
})

resp = client.responses.create(
    model="gpt-4.1",
    input=history
)

print(resp.output_text)
```

Everything—history **and** inline image—travels inside the single `input` array.

---

## 5 · Good‑practice Checklist

* **Prefer URLs** for large or already‑hosted images; base64 inflates payloads \~33 %.
* Keep the whole conversation under the model’s context limit; truncate or summarise old turns.
* Verify `Content‑Type` in your data URI matches the actual file (e.g. `image/png`).
* In browsers, watch out for **CORS** if you fetch remote images before re‑encoding.
* For production, consider `stream=True` to reduce tail latency.

---

Happy shipping! 🎉
5 Real-time streaming

5.1 Python streaming loop
from openai import OpenAI
client = OpenAI()

stream = client.responses.create(
    model="gpt-4o",
    input=[{"role": "user", "content": "Write a haiku about winter mountains."}],
    stream=True,
)
tokens = []
for event in stream:                     # event is a dataclass
    if event.type == "text.delta":       # text fragment
        tokens.append(event.delta)
        print(event.delta, end="", flush=True)

full_text = "".join(tokens)
Each event comes with a type field (text.delta, tool.call, done, …).
The generator closes automatically when a done event is emitted.
Python’s iterator consumes SSE frames under the hood, keeping your code synchronous and back-pressure-friendly
community.openai.com
.

5.2 TypeScript streaming with for await
import OpenAI from "openai";
const client = new OpenAI();

const stream = await client.responses.create({
  model: "gpt-4o",
  input: [{ role: "user", content: "Generate a limerick about llamas." }],
  stream: true,
});

let final = "";
for await (const event of stream) {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
    final += event.delta;
  }
}
The Node SDK exposes the response body as an async iterator over parsed events, sparing you from manual SSE parsing
github.com
. For browsers, use fetch with ReadableStream and parse data: lines yourself if you cannot rely on the SDK (see cookbook pattern)
github.com
stackoverflow.com
.

6 Event anatomy

type	What you get	Typical use
text.delta	Single token / phrase	Real-time UI updates
text.completed	Final assembled text	Post-process / log
tool.call	Arguments for a tool	Trigger external function
done	Stream ended (checksum, usage stats)	Cleanup
Full JSON schemas are in the reference docs
platform.openai.com
.

7 Error handling & retries

Network timeouts – wrap the iterator in a try/except (AbortController in JS) and reconnect quietly; the thread history remains server-side
platform.openai.com
.
Rate limits / 429 – exponential back-off plus jitter; respect Retry-After header.
Context overflow – send shorter inputs or resume using the prior response_id instead of resending the entire chat.
8 Best-practice checklist for smooth UX

Flush early – write partial tokens to STDOUT / WebSocket so the user sees first text in < 300 ms.
Debounce re-renders on the client by 16–32 ms to avoid layout thrash.
Keep-alive pings every 20 s if you tunnel through Nginx or API-gateways that cut idle SSE.
Chunk aggregation – build tokens[] and join once at done to avoid string-concat O(n²).
Server-sent compression – enable gzip but disable chunked encoding at proxy layer.
These patterns mirror recommendations in community deep dives and guides
thenewstack.io
january.sh
.

9 Appendix: TypeScript helper typings

type ResponseStreamEvent =
  | { type: "text.delta"; delta: string }
  | { type: "text.completed"; text: string }
  | { type: "tool.call"; name: string; arguments: unknown }
  | { type: "done" };

declare module "openai" {
  interface Stream<T = ResponseStreamEvent> extends AsyncIterable<T> {}
}
Using these discriminated unions lets the compiler narrow each branch inside your for await loop for safer code.