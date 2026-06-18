import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Trash2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — Aria" },
      { name: "description", content: "Chat with Aria, your AI workplace assistant." },
    ],
  }),
  component: ChatPage,
});

const STORAGE_KEY = "aria.chat.messages.v1";

function loadInitialMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

function ChatPage() {
  const [initial] = useState<UIMessage[]>(() => loadInitialMessages());
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    id: "aria-main",
    messages: initial,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => console.error("[chat]", e),
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const isLoading = status === "submitted" || status === "streaming";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
  }

  function clearChat() {
    setMessages([]);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <PageShell
      title="AI Chatbot"
      description="Conversational copilot for ad-hoc workplace questions."
      actions={
        <Button variant="outline" size="sm" onClick={clearChat} disabled={messages.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear chat
        </Button>
      }
    >
      <div className="flex h-[calc(100vh-220px)] min-h-[480px] flex-col rounded-xl border bg-card shadow-[var(--shadow-soft)]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">How can Aria help?</h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Ask anything about emails, planning, meetings, or quick research. Try: "Draft a polite follow-up to a client who hasn't responded in a week."
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={
                        isUser
                          ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2 text-sm text-primary-foreground"
                          : "max-w-[85%] text-sm text-foreground"
                      }
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{text}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>{text || "..."}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {status === "submitted" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Aria is thinking…
                </div>
              )}
            </div>
          )}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2 border-t p-3">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void onSubmit(e as unknown as React.FormEvent);
              }
            }}
            placeholder="Message Aria…"
            rows={1}
            className="min-h-[44px] resize-none"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="h-11 w-11 shrink-0">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Responsible AI: Aria can make mistakes. Verify important information and avoid sharing confidential data.
      </p>
    </PageShell>
  );
}