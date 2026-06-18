import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { generateEmail } from "@/lib/ai.functions";
import { PageShell, ResultCard, AiDisclaimer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Aria" },
      { name: "description", content: "Draft polished emails from a short brief with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState<"professional" | "friendly" | "concise" | "persuasive" | "apologetic">("professional");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await run({ data: { recipient, purpose, tone, context: context || undefined } });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell title="Smart Email Generator" description="Tell Aria who you're writing to and what it's about.">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form onSubmit={onSubmit} className="rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient</Label>
              <Input id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Hiring manager at Acme Corp" required />
            </div>
            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="What is this email about?" required rows={4} />
            </div>
            <div>
              <Label>Tone</Label>
              <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="context">Extra context (optional)</Label>
              <Textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} rows={3} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate email
            </Button>
          </div>
        </form>
        <div>
          <ResultCard value={output} onChange={setOutput} />
          <AiDisclaimer />
        </div>
      </div>
    </PageShell>
  );
}