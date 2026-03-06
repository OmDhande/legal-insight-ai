import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { crime } = await req.json();
    if (!crime) {
      return new Response(JSON.stringify({ error: "Crime description is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert Indian legal assistant specializing in criminal law.

Your task is to analyze a crime description and determine the most relevant Indian law sections and possible punishment.

Instructions:
1. Carefully analyze the crime description.
2. Identify the type of crime (e.g., theft, fraud, assault, cybercrime, murder, etc.).
3. Consider the value of damage, intent, and method used in the crime.
4. Map the crime to the correct IPC or IT Act section.
5. Provide the punishment according to Indian law.
6. Determine severity level (Low, Medium, High, Critical).
7. Determine whether the crime is bailable or non-bailable.
8. Give a short legal explanation.

IMPORTANT RULES:
- Do not give the same answer for different crimes.
- Choose the law section strictly based on the crime description.
- If multiple sections apply, list them.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze the following crime and predict the punishment according to Indian law.\n\nCrime Description:\n${crime}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "crime_analysis",
              description: "Return structured crime analysis result",
              parameters: {
                type: "object",
                properties: {
                  crime_type: { type: "string", description: "Type of crime" },
                  law_sections: { type: "array", items: { type: "string" }, description: "Applicable law sections" },
                  punishment: { type: "string", description: "Punishment details" },
                  fine: { type: "string", description: "Fine amount" },
                  severity: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
                  bailable: { type: "boolean", description: "Whether the crime is bailable" },
                  explanation: { type: "string", description: "Legal explanation" },
                },
                required: ["crime_type", "law_sections", "punishment", "fine", "severity", "bailable", "explanation"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "crime_analysis" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI gateway error:", status, text);
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const result = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-crime error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
