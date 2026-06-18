import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { planTasks } from "@/lib/ai.functions";
import { PageShell, ResultCard, AiDisclaimer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Aria" },
      { name: "description", content: "Break goals into prioritized, scheduled tasks with AI." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const run = useServerFn(planTasks);
  const [goal, setGoal] = useState("");
  const [horizon, setHorizon] = useState("this week");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await run({ data: { goal, horizon, constraints: constraints || undefined } });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to plan tasks");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell title="AI Task Planner" description="Describe a goal and Aria will produce a prioritized plan.">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <form onSubmit={onSubmit} className="rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)]">
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal">Goal</Label>
              <Textarea id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} rows={4} required placeholder="e.g. Launch Q3 customer survey" />
            </div>
            <div>
              <Label htmlFor="horizon">Time horizon</Label>
              <Input id="horizon" value={horizon} onChange={(e) => setHorizon(e.target.value)} placeholder="this week, next 2 weeks, by Friday..." />
            </div>
            <div>
              <Label htmlFor="constraints">Constraints (optional)</Label>
              <Textarea id="constraints" value={constraints} onChange={(e) => setConstraints(e.target.value)} rows={3} placeholder="Team size, deadlines, dependencies..." />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate plan
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