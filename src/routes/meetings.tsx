import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { summarizeMeeting } from "@/lib/ai.functions";
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

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Aria" },
      { name: "description", content: "Turn raw meeting notes into decisions and action items." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const run = useServerFn(summarizeMeeting);
  const [notes, setNotes] = useState("");
  const [style, setStyle] = useState<"bullets" | "executive" | "detailed">("bullets");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await run({ data: { notes, style } });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to summarize");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell title="Meeting Notes Summarizer" description="Paste raw notes or a transcript — Aria extracts decisions, owners, and risks.">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form onSubmit={onSubmit} className="rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="space-y-4">
            <div>
              <Label htmlFor="notes">Raw notes / transcript</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={14} required placeholder="Paste meeting notes here..." />
            </div>
            <div>
              <Label>Style</Label>
              <Select value={style} onValueChange={(v) => setStyle(v as typeof style)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bullets">Bulleted summary</SelectItem>
                  <SelectItem value="executive">Executive brief</SelectItem>
                  <SelectItem value="detailed">Detailed minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Summarize
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