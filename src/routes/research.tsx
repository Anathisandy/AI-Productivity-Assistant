import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { research } from "@/lib/ai.functions";
import { PageShell, ResultCard, AiDisclaimer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Aria" },
      { name: "description", content: "Get structured AI research briefings on any workplace topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const run = useServerFn(research);
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<"overview" | "deep-dive">("overview");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await run({ data: { topic, depth } });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to research");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell title="AI Research Assistant" description="Get a structured briefing on any topic. Aria flags uncertainty rather than fabricating facts.">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form onSubmit={onSubmit} className="rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic / question</Label>
              <Textarea id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} rows={5} required placeholder="e.g. Compare hybrid work policies at SaaS companies" />
            </div>
            <div>
              <Label>Depth</Label>
              <Select value={depth} onValueChange={(v) => setDepth(v as typeof depth)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Quick overview</SelectItem>
                  <SelectItem value="deep-dive">Deep dive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Research
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