import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, DEFAULT_MODEL } from "./ai-gateway.server";

function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const gateway = createLovableAiGatewayProvider(key);
  return gateway(DEFAULT_MODEL);
}

async function run(system: string, prompt: string) {
  const { text } = await generateText({ model: getModel(), system, prompt });
  return { text };
}

const EmailInput = z.object({
  recipient: z.string().max(200),
  purpose: z.string().min(1).max(2000),
  tone: z.enum(["professional", "friendly", "concise", "persuasive", "apologetic"]).default("professional"),
  context: z.string().max(2000).optional(),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) =>
    run(
      "You are an expert business email writer. Produce a well-structured email with a clear subject line on the first line as 'Subject: ...', then a blank line, then the body. Keep it on-topic and professional.",
      `Recipient: ${data.recipient}\nTone: ${data.tone}\nPurpose: ${data.purpose}${data.context ? `\nExtra context: ${data.context}` : ""}`,
    ),
  );

const SummaryInput = z.object({
  notes: z.string().min(10).max(15000),
  style: z.enum(["bullets", "executive", "detailed"]).default("bullets"),
});

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SummaryInput.parse(d))
  .handler(async ({ data }) =>
    run(
      "You are a meeting notes summarizer. Output markdown with sections: ## Summary, ## Key Decisions, ## Action Items (with owner + due date if mentioned), ## Risks / Open Questions. Be faithful to the input — do not invent facts.",
      `Style: ${data.style}\n\nRaw notes:\n${data.notes}`,
    ),
  );

const TaskInput = z.object({
  goal: z.string().min(3).max(2000),
  horizon: z.string().max(100).default("this week"),
  constraints: z.string().max(1000).optional(),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TaskInput.parse(d))
  .handler(async ({ data }) =>
    run(
      "You are an AI task planner. Break the goal into a prioritized plan in markdown. Use sections: ## Objective, ## Milestones, ## Task Breakdown (as a numbered list with estimated effort and priority H/M/L), ## Suggested Schedule. Be concrete and realistic.",
      `Goal: ${data.goal}\nHorizon: ${data.horizon}${data.constraints ? `\nConstraints: ${data.constraints}` : ""}`,
    ),
  );

const ResearchInput = z.object({
  topic: z.string().min(3).max(2000),
  depth: z.enum(["overview", "deep-dive"]).default("overview"),
});

export const research = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data }) =>
    run(
      "You are an AI research assistant. Produce a structured markdown briefing with: ## TL;DR, ## Background, ## Key Points (bulleted), ## Considerations & Trade-offs, ## Suggested Next Steps. Flag uncertainty clearly. Do not fabricate citations.",
      `Topic: ${data.topic}\nDepth: ${data.depth}`,
    ),
  );